// The content page will be in charge of adding elements into the HTML page.
chrome.runtime.onMessage.addListener(gotMessage);


function gotMessage(message, sender, sendResponse) {
    let png = chrome.extension.getURL("emoji.png");
    let re = new RegExp('(?<=<video.*src=").*?(?=")');
    var parser = new DOMParser;
    let videoMatch = document.documentElement.innerHTML.match(re);
    if (videoMatch) {
        var dom = parser.parseFromString(videoMatch[0], 'text/html');
        var decodedString = dom.body.textContent;

        document.body.insertAdjacentHTML("beforebegin", "<p><b> <center>&#128721; Click to Download, if that doesn't work, then right click and save as &#128721;</center></b></p>");
        document.body.insertAdjacentHTML("beforebegin", "<p> <center><img src=" + png + " alt=\"emoji\" width=\"40\" height=\"40\"></center></p>");
        document.body.insertAdjacentHTML("beforebegin", "<a href=\"" + decodedString + "\" download=\"" + decodedString + "\"><center>&#128279 Click to Download &#128279</center></a>");
    }
}