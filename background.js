chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        "id": "bionicReading",
        "title": "Apply Bionic Reading",
        "contexts": ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "bionicReading") {
        chrome.tabs.sendMessage(tab.id, { message: "get_selected_text" }, function (response) {
            var newTabHtml = `<html><head><style>body{background-color: #000;color:white;text-align:center;padding-top:25px;}div{display:inline-block;height:11in;width:9in;overflow:auto;background-color:pink;color:white;scrollbar-base-color:gold;font-family:arial;padding:15px;}</style></head><body><div>${response.data}</div></body></html>`;
            var newTabUrl = 'data:text/html,' + encodeURIComponent(newTabHtml);
            chrome.tabs.create({ url: newTabUrl });
        });
    }
});
