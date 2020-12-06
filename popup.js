'use strict';

let page = document.getElementById('Menu')
const languageList = {
    "Afrikaans": "af",
    "Albanian": "sq",
    "Amharic": "am",
    "Spanish": "es"
}
let dropdown = document.createElement("SELECT");
dropdown.setAttribute("name", "languages")

function constructOptions(languages, chosenLang) {
    for (let [key, value] of Object.entries(languages)) {
        let button = document.createElement('OPTION');
        button.setAttribute("value", value);
        button.textContent = key;
        if(value === chosenLang) {
            button.setAttribute('selected', 'selected')
        }
        dropdown.appendChild(button);
    }
}

dropdown.addEventListener('change', (e) => {
    chrome.storage.sync.set({language: e.target.value}, function() {
        console.log('language is ' + e.target.value);
      })
});
chrome.storage.sync.get('language', function(data){
    constructOptions(languageList, data.language);
    page.appendChild(dropdown)
})



var slider = document.getElementById("amtSlider")
var output = document.getElementById("output");
slider.oninput = function(){
    output.innerHTML = this.value;
}