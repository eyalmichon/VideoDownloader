// The content page will be in charge of adding elements into the HTML page.
chrome.runtime.onMessage.addListener(gotMessage);

/////////////////////////////////// For enabling the the contect menu on sites that disable it.//////////////////////////////
function enableContextMenu(aggressive = true) {
    void (document.ondragstart = null);
    void (document.onselectstart = null);
    void (document.onclick = null);
    void (document.onmousedown = null);
    void (document.onmouseup = null);
    void (document.body.oncontextmenu = null);
    enableRightClickLight(document);
    if (aggressive) {
        enableRightClick(document);
        removeContextMenuOnAll("body");
        removeContextMenuOnAll("img");
        removeContextMenuOnAll("td");
    }
}
function removeContextMenuOnAll(tagName) {
    var elements = document.getElementsByTagName(tagName);
    for (var i = 0; i < elements.length; i++) {
        enableRightClick(elements[i]);
    }
}
function enableRightClickLight(el) {
    el || (el = document);
    el.addEventListener("contextmenu", bringBackDefault, true);
}
function enableRightClick(el) {
    el || (el = document); el.addEventListener("contextmenu", bringBackDefault, true);
    el.addEventListener("dragstart", bringBackDefault, true);
    el.addEventListener("selectstart", bringBackDefault, true);
    el.addEventListener("click", bringBackDefault, true);
    el.addEventListener("mousedown", bringBackDefault, true);
    el.addEventListener("mouseup", bringBackDefault, true);
}
function bringBackDefault(event) {
    event.returnValue = true;
    (typeof event.stopPropagation === 'function') && event.stopPropagation();
    (typeof event.cancelBubble === 'function') && event.cancelBubble();
}
/////////////////////////////////// For enabling the the contect menu on sites that disable it.//////////////////////////////


function gotMessage(message, sender, sendResponse) {
    enableContextMenu();
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