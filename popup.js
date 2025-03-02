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
                    dateNTime: getClassDT(cls),
                    location: getClassLocation(cls),
                    instructor: getClassInstructor(cls),
                    startEnd: getClassStartEnd(cls)

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
           
        }
    }else{
        // console.log(block);
        const obj = {
            componentType: getCompontType(block),
            component: block,
            section: getSection(block),
            classNumber: getClassNumber(block),
            classes: getClasses(block)
        }

        components.push(obj);
        getCompontType(block)[0];
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
    // Returns a string like 'Lecture', 'Tutorial', etc..
    const regex = /\d{4}\s*([A-Z]\d{2})\s*[A-Z]\w*/gm;
    const match = regex.exec(block);

    return match[1];

}

function getClassNumber(block){
    // Returns a string like 'Lecture', 'Tutorial', etc..
    const regex = /(\d{4})\s*[A-Z]\d{2}\s*[A-Z]\w*/gm;
    const match = regex.exec(block);

    return match[1];

}

function getClasses(block){
    const regex = /(?:[A-Z]\w.*\-.*)\s*(?:.*)\s*(?:.*)\s*(?:\d{2}\/\d{2}\/\d{4}\s*\-\s*\d{2}\/\d{2}\/\d{4})/gm;
    const match = block.match(regex);

    return match;
}

function getClassDT(cls){
    // console.log(cls)
    const regex = /([A-Z]\w.*\-.*)\s*(?:.*)\s*(?:.*)\s*(?:\d{2}\/\d{2}\/\d{4}\s*\-\s*\d{2}\/\d{2}\/\d{4})/gm;

    const match = regex.exec(cls);

    return match[1];
}

function getClassLocation(cls){
    const regex = /(?:[A-Z]\w.*\-.*)\s*(.*)\s*(?:.*)\s*(?:\d{2}\/\d{2}\/\d{4}\s*\-\s*\d{2}\/\d{2}\/\d{4})/gm;
    const match = regex.exec(cls);

    return match[1];
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