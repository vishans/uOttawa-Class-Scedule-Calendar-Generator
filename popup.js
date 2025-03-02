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

    console.log(blocks);
    console.log(titles);
});

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