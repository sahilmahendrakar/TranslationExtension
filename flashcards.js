let page = document.getElementById('cards');
var chosenLang = 'es';
const languageList = {
    "Afrikaans": "af",
    "Albanian": "sq",
    "Amharic": "am",
    "Spanish": "es"
}

let dropdown = document.createElement("SELECT");
dropdown.setAttribute("name", "languages");
dropdown.classList.add("dropdown-menu");

function constructOptions(languages) {
    for (let [key, value] of Object.entries(languages)) {
        let button = document.createElement('OPTION');
        button.setAttribute("value", value);
        button.textContent = key;
        if(value === chosenLang) {
            button.setAttribute("selected", "selected")
        }
        dropdown.appendChild(button);
    }
}






const kWords = [
    { original: 'hello', translated: 'hola', language: 'en' },
    { original: 'a', translated: 'naranja', language: 'en' },
    { original: 'b', translated: 'naranja', language: 'rs' },
    { original: 'c', translated: 'naranja', language: 'en' },
    { original: 'd', translated: 'naranja', language: 'rs' },
    { original: 'e', translated: 'naranja', language: 'en' },
    { original: 'f', translated: 'naranja', language: 'rs' },
    { original: 'g', translated: 'naranja', language: 'en' },
    { original: 'h', translated: 'naranja', language: 'rs' },
    { original: 'i', translated: 'naranja', language: 'en' }
];



function constructCards(kWords) {
    let grid = document.createElement("div");
    grid.classList.add("grid-container")

    // let container = document.createElement("div");
    // container.classList.add("center-container");

    // container.appendChild(grid);
    console.log("Constructing cards");
    console.log("chosen lang: " + chosenLang);
    for (let item of kWords) {
        if (item.language === chosenLang) {
            let flipcard = document.createElement("div");
            flipcard.classList.add("flip-card");

            let flipcardInner = document.createElement("div");
            flipcardInner.classList.add("flip-card-inner");

            let flipcardFront = document.createElement("div");
            flipcardFront.classList.add("flip-card-front", "card-text", "card");

            let flipcardBack = document.createElement("div");
            flipcardBack.classList.add("flip-card-back", "card-text", "card");

            let frontContent = document.createTextNode(item.translated);
            let backContent = document.createTextNode(item.original);

            flipcardFront.appendChild(frontContent);
            flipcardInner.appendChild(flipcardFront);
            flipcardBack.appendChild(backContent);
            flipcardInner.appendChild(flipcardBack);

            flipcard.appendChild(flipcardInner);

            //     <div class="flip-card">
            //     <div class="flip-card-inner">
            //       <div class="flip-card-front">
            //         <h1>English</h1>
            //       </div>
            //       <div class="flip-card-back">
            //         <h1>Espanol</h1>
            //       </div>
            //     </div>
            //   </div>

            grid.appendChild(flipcard)
            page.appendChild(grid);
        }
    }
}

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

chrome.storage.sync.get('language', function(result) {
    chosenLang = result.language;
    constructOptions(languageList);
    page.appendChild(dropdown)
})

chrome.storage.sync.get('vocabList', function(result) {
    console.log(result.vocabList);
    dropdown.addEventListener('change', (e) => {
        // chrome.storage.sync.set({ language: e.target.value }, function () {
        //     console.log('language is ' + e.target.value);
            chosenLang = e.target.value;
            removeElementsByClass("grid-container");
            constructCards(result.vocabList);
        // })
    });

    constructCards(result.vocabList)
})

// constructCards(kWords);