function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function bionicReading(text) {
    text = text.replace(/â€™s/g, "'s") // Replace â€™s with 's
        .replace(/â€œ/g, '"') // Replace â€œ with "
        .replace(/Ânâ€™tâ€/g, "n't") // Replace Ânâ€™tâ€ with n't
        .replace(/â€™/g, "'"); // Replace â€™ with '
    return text.split(" ").map(w => `<b>${w.split("").slice(0, Math.ceil(w.length / 2)).join("")}</b>${w.split("").slice(Math.ceil(w.length / 2), w.length).join("")}`).join(" ");
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "getAndProcessText") {
        var text = getSelectionText();
        var processedText = bionicReading(text);
        chrome.runtime.sendMessage({ processedText: processedText });
    }
});
