'use strict';

let page = document.getElementById('Menu')
const languageList = {
    "Amharic": "am",
    "Arabic": "ar",
    "Basque": "eu",
    "Bengali": "bn",
    "Bulgarian": "bg",
    "Catalan": "ca",
    "Cherokee": "chr",
    "Croatian": "hr",
    "Czech": "cs",
    "Danish": "da",
    "Dutch": "nl",
    "Estonian": "et",
    "Filipino": "fil",
    "Finnish": "fi",
    "French": "fr",
    "German": "de",
    "Greek": "el",
    "Gujarati": "gu",
    "Hebrew": "iw",
    "Hindi": "hi",
    "Hungarian": "hu",
    "Icelandic": "is",
    "Indonesian": "id",
    "Italian": "it",
    "Japanese": "ja",
    "Kannada": "kn",
    "Korean": "ko",
    "Latvian": "lv",
    "Lithuanian": "lt",
    "Malay": "ms",
    "Malayalam": "ml",
    "Marathi": "mr",
    "Norwegian": "no",
    "Polish": "pl",
    "Portuguese (Portugal)": "pt-PT",
    "Romanian": "ro",
    "Russian": "ru",
    "Serbian": "sr",
    "Chinese (PRC)": "zh-CN",
    "Slovak": "sk",
    "Slovenian": "sl",
    "Spanish": "es",
    "Swahili": "sw",
    "Swedish": "sv",
    "Tamil": "ta",
    "Telugu": "te",
    "Thai": "th",
    "Chinese (Taiwan)": "zh-TW",
    "Turkish": "tr",
    "Urdu": "ur",
    "Ukrainian": "uk",
    "Vietnamese": "vi",
    "Welsh": "cy",
}

let img = document.getElementById("logoImage");
img.src = chrome.extension.getURL("images/coral_logo.png");

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
      chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
        var code = 'window.location.reload();';
        chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});
    });
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