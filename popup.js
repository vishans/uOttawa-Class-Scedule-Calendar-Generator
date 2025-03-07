import ical from 'ical-generator';
import {
    getCompontType,
    getSection,
    getClassNumber,
    getClasses,
    parseClassName,
    applyTimeToDate,
    getActualStartDate,
    getActualEndDate,
    getClassDT,
    parseScheduleLine,
    parseDateRange,
    getClassLocation,
    parseLocation,
    getClassInstructor,
    getClassStartEnd
  } from './helper.js';

document.getElementById("scrape-btn").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    let response = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: scrapeDataFromPage
    });

    const text = response[0].result.join("") + "#"; // add a # at the end make it easier to grab the last block

    const regex = /Class Nbr[\s\S]*?(?=Class Nbr|#)/gm;
    const blocks = text.match(regex);

    const title_regex = /[A-Z]{3}.*-.*/gm;
    const titles = text.match(title_regex);

    let index = 0;

    const cal = ical({ domain: 'uoCal', name: 'Test Calendar' });

    for(let block of blocks){
        const title = parseClassName(titles[index++]);
        console.log(title, '---------');

        const components = isolateComponents(block);
        if(components){
            for(let c of components){
               for(let c_ of c.classes){
                console.log(c_)
                cal.createEvent({
                    start: c_.actualStartDate,
                    end: c_.actualEndDate,
                    summary: title.code,      
                    description:`Taught by ${c_.instructor}` , 
                    location: c_.location.building, 
                    repeating: {
                      freq: 'WEEKLY',         
                      interval: 1,            
                      until: c_.startEndDate.end
                    }
                  });

               }
            }
        }
    }
    console.log(cal.toString());

    // Create a Blob from the ICS content
    const blob = new Blob([cal.toString()], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    
    // Create an anchor element and trigger a download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calendar.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the object URL
    URL.revokeObjectURL(url);
});

function isolateComponents(block){
    const regex = /^\d{4}[\s\S]*?(?=^\d{4}|#)/gm;
    block += "#"
    // console.log(block)
    const match = block.match(regex);
    const components = [];

    if(match){

        for(let component of match){
            
            const classes = getClasses(component);
            const classesList = [];
            
            // console.log(classes);
            for(let cls of classes){
                const obj = {
                    dayNTime: parseScheduleLine(getClassDT(cls)),
                    location: parseLocation(getClassLocation(cls)),
                    instructor: getClassInstructor(cls),
                    startEndDate: parseDateRange(getClassStartEnd(cls))

                }

                // console.log(obj.startEndDate)
                obj['actualStartDate'] = getActualStartDate(structuredClone(obj).startEndDate.start, obj.dayNTime);
                obj['actualEndDate'] = getActualEndDate(structuredClone(obj).startEndDate.start, obj.dayNTime);
                classesList.push(obj);
            }
            
            const obj = {
                componentType: getCompontType(component),
                component,
                section: getSection(component),
                classNumber: getClassNumber(component),
                classes: classesList 
            }
            components.push(obj);
            // console.log(obj.classes[0].dateNTime);
            // console.log(obj.classes[0].startEndDate);
            // console.log(obj.classes[0].location);
           
        }
    }

    return components;

}

function scrapeDataFromPage() {
    const data = [];
    const iframe = document.getElementById("ptifrmtgtframe"); // Select the iframe

    if (iframe) {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        if (iframeDoc) {
            iframeDoc.querySelectorAll(".PSGROUPBOXWBO").forEach(el => {
                data.push(el.innerText.trim());
            });

            console.log("Scraped data from iframe:", data);
        } else {
            console.log("Iframe document is not accessible.");
        }
    } else {
        console.log("Iframe not found.");
    }

    return data;
}
