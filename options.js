let body = document.body
let page = document.getElementById('buttonDiv')
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

let clear = document.createElement("BUTTON")
clear.textContent = "Clear Flashcards"
clear.onclick = () => {
    chrome.storage.sync.set({vocabList: []}, () => {
        console.log("Cleared flashcards")
    })
}
body.appendChild(clear)

constructOptions(languageList);
page.appendChild(dropdown)