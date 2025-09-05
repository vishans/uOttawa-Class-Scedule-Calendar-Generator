import ical from 'ical-generator';
import {
    parseClass,
    parseAllClassNames, 

    Class, 
    Component
} from './helper.js';

var filename = 'calendar.ics'

let state = {
    title: null,
    isListView: null,
};

function isRightPage(){
    return state.isListView && (state.title == "My Class Schedule" || state.title == "Votre horaire cours") ;
}

document.addEventListener("DOMContentLoaded", async () => {
    // get the current active tab's URL
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    if (tab && tab.url) {
      let currentUrl = tab.url;
      console.log("current URL:", currentUrl);
  
      // check if a substring is in the URL
      if (currentUrl.includes("uocampus.uottawa.ca")) {
        let response = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: ()=>{
                const pageTitleHeader = document.querySelector("#pagetitleheader .titletext");
                const iframe = document.getElementById("ptifrmtgtframe"); // Select the iframe

                let isListView = null;
                if(iframe){
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

                    if (iframeDoc) {
                        isListView = iframeDoc.querySelector('input[type="radio"]').checked;
                    }
                }

                return {title: pageTitleHeader.outerText, isListView}

            }
        });

        state.title = response[0].result.title;
        state.isListView = response[0].result.isListView;
        console.log(state.title);

        if(isRightPage()){
            const overlay = document.getElementById('overlay');
            overlay.style.display = 'none';
        }
      } else {
        console.log("The URL does not contain uottawa's url.");
      }
    } else {
      console.log("Unable to retrieve the current tab's URL.");
    }
});

document.addEventListener('DOMContentLoaded', async () => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    let response = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: getSemeseterInfo 
    });

    if(!isRightPage()) return;
    if(response[0].result === undefined) return;

    const infos = response[0].result[1].split('|').slice(0,2);

    let downloadLink = infos[0].trim().split(' ').join('-');

    console.log(downloadLink);
    
    filename = downloadLink + '.ics';

    const textbox = document.getElementById('file-name');
    textbox.value = filename;

});

document.getElementById("scrape-btn").addEventListener("click", async () => {
    console.log("Inside scrape");
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    let response = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: scrapeDataFromPage
    });

    const semester = response[0].result.meta[1];
    console.log(response[0].result.meta)
    console.log(response[0].result.data)
    const text = response[0].result.data.join("") + "#"; // add a # at the end make it easier to grab the last block

    let regex = /(Class Nbr|Nº cours)[\s\S]*?(?=Class Nbr|Nº cours|#)/gm;
    //TODO: French support    
    console.log(text)

    const blocks = text.match(regex);

    console.log(`The value of blocks is ${blocks}`);

    const title_regex = /[A-Z]{3}.*-.*/gm;
    const titles = text.match(title_regex);

    let index = 0;

    const includeCourseName = document.getElementById('include-course').checked;
    const includeSectionNo = document.getElementById('include-section').checked;
    const includeComponent = document.getElementById('include-component').checked;

   const cals = new Map();

    cals.set("default", 
             ical({ domain: 'uoCal', name: 'Test Calendar', timezone: false }));

    // TODO: 
    // Option to add full address of classroom or not
    // Option to show full building name, Montpetit instead of MNT for e.g
    
    // Make extension only work on uozone
    // Make it work only when display option is in list view

    // include French support
    // include flexible custom mode with $var replacable variable

    const times = [];
    const classes = [];

    const classNames = parseAllClassNames(text);
    let classIndex = 0;
    for(let block of blocks){
    console.log('####!!!!')
    // console.log(block);
    const components = parseClass(block);
    const cls = new Class(classNames[classIndex++]);
    cls.setComponents(components);
    console.log('class component =')
    console.table(cls.components);

    console.table(cls);
    classes.push(cls);
    console.log('####!!!!')

    }

    console.table(classes);

    // a class consists of one or more components
    // a component could be a lecture, tutorial, lab...
    for(let cls of classes){
        for(let component of cls.components){
            let eventName = cls.getSubjectCode() + ' ' + cls.getCourseCode();
            let section = "";
            let component_ = "";
            let fullCourseName = "";

            if(component.daysNTimes == "N/A" || component.room == "N/A" ||
               component.daysNTimes == "S/O" || component.room == "S/O"
            ){
                continue;
            }

            if(includeSectionNo){
                section = component.section;
            }

            if(includeComponent){
                component_ = (includeSectionNo ? "-": "") +component.component;
            }

            if(includeCourseName){
                // include full course name
                fullCourseName = `- ${cls.getCourseName()} `;

            }

            eventName +=  ` ${fullCourseName}(${section}${component_})`;

            cals.get("default").createEvent({
                start: component.getStart(),
                end: component.getEnd(),
                summary: eventName, //cls.getCourseName(), //+ component.component,       
                description: component.instructor, 
                location:  component.room, 
                repeating: {
                    freq: 'WEEKLY',         
                    interval: 1,            
                    until: Component.toDateObject(component.getEndDate(), component.getLanguage())
                }
            });

        }

    }


    const calString = cals.get("default").toString();
    let calStringLines = calString.split('\n');
    console.log(calString);

    
    console.log(calStringLines);
    const blob = new Blob([calString], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);

    // Create an anchor element and trigger a download
    const link = document.createElement('a');
    link.href = url;
    
    const textbox = document.getElementById('file-name');
    link.download = textbox.value;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the object URL
    URL.revokeObjectURL(url);
});

function scrapeDataFromPage() {
    const data = [];
    let meta;
    const iframe = document.getElementById("ptifrmtgtframe"); // Select the iframe

    if (iframe) {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        if (iframeDoc) {
            iframeDoc.querySelectorAll(".PSGROUPBOXWBO").forEach(el => {
                data.push(el.innerText.trim());
            });

            const metaElements = iframeDoc.querySelectorAll("span.PABOLDTEXT");
            meta = Array.from(metaElements).map(el => el.textContent);
            
            

            console.log("Scraped data from iframe:", data);
        } else {
            console.log("Iframe document is not accessible.");
        }
    } else {
        console.log("Iframe not found.");
    }

    return {meta,data};
}

function getSemeseterInfo() {
   
    let meta;
    const iframe = document.getElementById("ptifrmtgtframe"); // Select the iframe

    if (iframe) {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        if (iframeDoc) {

            const metaElements = iframeDoc.querySelectorAll("span.PABOLDTEXT");
            meta = Array.from(metaElements).map(el => el.textContent);
            
            

            console.log("Scraped data from iframe:", meta);
        } else {
            console.log("Iframe document is not accessible.");
        }
    } else {
        console.log("Iframe not found.");
    }

   
    return meta;
}
