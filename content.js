function bionicReading(text) {
    return text.split(" ").map(w => `<b>${w.split("").slice(0, Math.ceil(w.length / 2)).join("")}</b>${w.split("").slice(Math.ceil(w.length / 2), w.length).join("")}`).join(" ");
}

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "get_selected_text") {
            sendResponse({ data: bionicReading(getSelectionText()) });
        }
    }
);

