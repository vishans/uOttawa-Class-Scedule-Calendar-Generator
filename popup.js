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
