let page = document.getElementById('buttonDiv')
const languages = {
    "Afrikaans": "af",
    "Albanian": "sq",
    "Amharic": "am",
}
function constructOptions(kButtonColors) {
    for (let item of languages) {
      let button = document.createElement('INPUT');
      button.style.backgroundColor = item;
      button.addEventListener('click', function() {
        chrome.storage.sync.set({color: item}, function() {
          console.log('color is ' + item);
        })
      });
      page.appendChild(button);
    }
  }