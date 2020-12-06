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

chrome.storage.sync.get("difficulty", function(data){
    slider.value = data.difficulty
    output.innerHTML = data.difficulty
})

slider.onchange = function() {
    chrome.storage.sync.set({difficulty: this.value}, function(){
        console.log("difficulty set to: " + this.value);
    })
    chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
        var code = 'window.location.reload();';
        chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});
    });
}

var toggle = document.getElementById("toggle")
chrome.storage.sync.get("active", function(result) {
    if(result.active === "true"){
        toggle.setAttribute("checked", "checked")
    }
  }) 
// toggle.onChange = function(){
//     if (toggle.checked===true){
//         chrome.storage.sync.set({active:"false"}, function(){})
//         console.log("now false")
//     }else{
//         chrome.storage.sync.set({active:"true"}, function(){})
//     }
// }
toggle.addEventListener('change', (event) => {
    if (event.target.checked) {
        chrome.storage.sync.set({active:"true"}, function(){})
    } else {
        chrome.storage.sync.set({active:"false"}, function(){})
    }
    chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
        var code = 'window.location.reload();';
        chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});
    });
  })