// popup.js
document.getElementById('save').addEventListener('click', function () {
    var color = document.getElementById('color').value;
    chrome.storage.sync.set({ boldColor: color }, function () {
        console.log('Color is ' + color);
    });
});
