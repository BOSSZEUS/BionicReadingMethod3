document.getElementById('save').addEventListener('click', function () {
    var boldColor = document.getElementById('boldColor').value;
    var bgColor = document.getElementById('bgColor').value;
    chrome.storage.sync.set({ boldColor: boldColor, bgColor: bgColor }, function () {
        console.log('Bold color is ' + boldColor);
        console.log('Background color is ' + bgColor);
    });
});
