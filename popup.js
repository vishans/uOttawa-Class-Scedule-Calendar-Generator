document.getElementById("scrape-btn").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    let response = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: scrapeDataFromPage
    });

    const text = response[0].result.join("") + "#"; // add a # at the end make it easier to grab the last block
    // console.log(response[0].result.join("")); // Correct way to access the result

    const regex = /Class Nbr[\s\S]*?(?=Class Nbr|#)/gm;
    const blocks = text.match(regex);

    const title_regex = /[A-Z]{3}.*-.*/gm;
    const titles = text.match(title_regex);

    // console.log(blocks);
    let index = 0;

    for(block of blocks){
        console.log(titles[index++], '---------');
        // console.log(block)
        // console.log(isolateComponents(block).length)
        const components = isolateComponents(block);
        if(components){
            for(c of components){
               for(c_ of c.classes){
                console.log(c_)
               }
            }
        }
    }
    // console.log(titles);
});

function isolateComponents(block){
    const regex = /^\d{4}[\s\S]*?(?=^\d{4}|#)/gm;
    block += "#"
    // console.log(block)
    const match = block.match(regex);
    const components = [];

    if(match){

        for(component of match){
            //console.log(component);

            const classes = getClasses(component);
            const classesList = [];

            for(cls of classes){
                const obj = {
                    dateNTime: parseScheduleLine(getClassDT(cls)),
                    location: parseLocation(getClassLocation(cls)),
                    instructor: getClassInstructor(cls),
                    startEndDate: parseDateRange(getClassStartEnd(cls))

                }

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
            console.log(obj.classes[0].dateNTime);
            console.log(obj.classes[0].startEndDate);
            console.log(obj.classes[0].location);
           
        }
    }

    return components;

}

function getCompontType(block){
    // Returns a string like 'Lecture', 'Tutorial', etc..
    const regex = /\d{4}\s*[A-Z]\d{2}\s*([A-Z]\w*)/gm;
    const match = regex.exec(block);

    return match[1];

}

function getSection(block){
    // Returns a string like A00 or like B01 etc .. 
    const regex = /\d{4}\s*([A-Z]\d{2})\s*[A-Z]\w*/gm;
    const match = regex.exec(block);

    return match[1];

}

function getClassNumber(block){
    // Returns a string like 2042 
    const regex = /(\d{4})\s*[A-Z]\d{2}\s*[A-Z]\w*/gm;
    const match = regex.exec(block);

    return match[1];

}

// ---- whole classes from block
//      lectures, tutorials, lab etc..
function getClasses(block){
    // Returns a list of class blocks 
    // Each block contains info like Date and Time, Room. Instructor, Start and End date
    const regex = /(?:[A-Z]\w.*\-.*)\s*(?:.*)\s*(?:.*)\s*(?:\d{2}\/\d{2}\/\d{4}\s*\-\s*\d{2}\/\d{2}\/\d{4})/gm;
    const match = block.match(regex);

    return match;
}
// ----


// ---- to extract info from each class 
//      like extract info from lecture or lab

// The getClassX functions are meant to be used on class blocks
// to extract specific info
function getClassDT(cls){
    
    const regex = /([A-Z]\w.*\-.*)\s*(?:.*)\s*(?:.*)\s*(?:\d{2}\/\d{2}\/\d{4}\s*\-\s*\d{2}\/\d{2}\/\d{4})/gm;

    const match = regex.exec(cls);

    return match[1];
}

function parseScheduleLine(schedule) {
  //capture the day, start time, and end time
  // example schedule We 8:30AM - 9:50AM
  const regex = /^(\w{2})\s+(\d{1,2}:\d{2}[AP]M)\s*-\s*(\d{1,2}:\d{2}[AP]M)$/;
  const match = schedule.match(regex);
  if (!match) {
    return null; 
  }
  const [, day, startTime, endTime] = match;
  return { day, startTime, endTime };
}

function parseDateRange(rangeStr) {
  // capture two dates separated by a hyphen.
  // Assumes dates are in MM/DD/YYYY format.
  const regex = /^\s*(\d{2}\/\d{2}\/\d{4})\s*-\s*(\d{2}\/\d{2}\/\d{4})\s*$/;
  const match = rangeStr.match(regex);
  if (!match) {
    return null;
  }
  
  const [, startStr, endStr] = match;
  
  // helper function to convert a date string in MM/DD/YYYY to a Date object
  function parseDate(dateStr) {
    const [month, day, year] = dateStr.split('/').map(Number);
    // Note: Date months are 0-indexed (0 = January, 11 = December)
    return new Date(year, month - 1, day);
  }
  
  const startDate = parseDate(startStr);
  const endDate = parseDate(endStr);
  
  return {
    start: startDate,
    end: endDate
  };
}

function getClassLocation(cls){
    const regex = /(?:[A-Z]\w.*\-.*)\s*(.*)\s*(?:.*)\s*(?:\d{2}\/\d{2}\/\d{4}\s*\-\s*\d{2}\/\d{2}\/\d{4})/gm;
    const match = regex.exec(cls);

    return match[1];
}

function parseLocation(str) {
  const regex = /^(.*?)\s*\((.*?)\)\s*(.*)$/;
  const match = str.match(regex);
  if (!match) return null;
  
  const [ , address, building, room ] = match;
  
  return {
    address: address.trim(),
    building: building.trim(),
    room: room.trim()
  };
}

function getClassInstructor(cls){
    const regex = /(?:[A-Z]\w.*\-.*)\s*(?:.*)\s*(.*)\s*(?:\d{2}\/\d{2}\/\d{4}\s*\-\s*\d{2}\/\d{2}\/\d{4})/gm;
    const match = regex.exec(cls);

    return match[1];
}

function getClassStartEnd(cls){
    const regex = /(?:[A-Z]\w.*\-.*)\s*(?:.*)\s*(?:.*)\s*(\d{2}\/\d{2}\/\d{4}\s*\-\s*\d{2}\/\d{2}\/\d{4})/gm;
    const match = regex.exec(cls);

    return match[1];
}

// ---- 

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
