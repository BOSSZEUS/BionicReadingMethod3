chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        "id": "bionicReading",
        "title": "Apply Bionic Reading",
        "contexts": ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "bionicReading") {
        chrome.tabs.sendMessage(tab.id, { message: "getAndProcessText" });
    }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.processedText) {
        chrome.storage.sync.get(['boldColor', 'bgColor'], function (data) {
            var boldColor = data.boldColor || 'black';
            var bgColor = data.bgColor || '#000';
            var newTabHtml = `
<html>
<head>
    <style>
    :root {
        --bold-color: black;
        --bg-color: white;
        --text-size: 16px;
        --non-bold-color: darkgray;
    }
    body {
        background-color: var(--bg-color);
        color: var(--non-bold-color);
        text-align: center;
        padding-top: 25px;
    }
    #textBox {
        display: inline-block;
        height: 11in;
        width: 9in;
        overflow: auto;
        background-color: var(--bg-color);
        color: var(--non-bold-color);
        scrollbar-base-color: gold;
        font-family: arial;
        padding: 1in;
        box-sizing: border-box;
        text-align: left;
        font-size: var(--text-size);
    }
    b {
        color: var(--bold-color);
    }
    #settings {
        position: absolute;
        right: 0;
        top: 0;
        padding: 20px;
    }
    </style>
</head>
<body>
    <div id="settings">
        <label for="boldColor">Bold color:</label>
        <input type="color" id="boldColor" value="black">
        <label for="nonBoldColor">Non-bold color:</label>
        <input type="color" id="nonBoldColor" value="darkgray">
        <label for="bgColor">Background color:</label>
        <input type="color" id="bgColor" value="white">
        <label for="textSize">Text size:</label>
        <input type="number" id="textSize" min="1" value="16">
        <button id="applySettings">Apply Settings</button>
    </div>
    <div id="textBox">${message.processedText}</div>
    <script>
    document.getElementById('applySettings').addEventListener('click', function() {
        var boldColor = document.getElementById('boldColor').value;
        var nonBoldColor = document.getElementById('nonBoldColor').value;
        var bgColor = document.getElementById('bgColor').value;
        var textSize = document.getElementById('textSize').value;
        document.documentElement.style.setProperty('--bold-color', boldColor);
        document.documentElement.style.setProperty('--non-bold-color', nonBoldColor);
        document.documentElement.style.setProperty('--bg-color', bgColor);
        document.documentElement.style.setProperty('--text-size', textSize + 'px');
    });
    </script>
</body>
</html>`;


            var newTabUrl = 'data:text/html;charset=UTF-8,' + encodeURIComponent(newTabHtml);
            chrome.tabs.create({ url: newTabUrl });
        });
    }
});

