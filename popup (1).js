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

function constructOptions(languages) {
    for (let [key, value] of Object.entries(languages)) {
        let button = document.createElement('OPTION');
        button.setAttribute("value", value);
        button.textContent = key;
        dropdown.appendChild(button);
    }
}

dropdown.addEventListener('change', (e) => {
    chrome.storage.sync.set({language: e.target.value}, function() {
        console.log('language is ' + e.target.value);
      })
});

constructOptions(languageList);
page.appendChild(dropdown)


var slider = document.getElementById("amtSlider")
var output = document.getElementById("output");
slider.oninput = function(){
    output.innerHTML = this.value;
}


var toggle = document.getElementById("toggle")
chrome.storage.sync.get("active", function(result) {
    if(result.active === "true"){
        toggle.setAttribute("checked", "checked")
    };
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
  })