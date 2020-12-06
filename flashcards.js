let page = document.getElementById('cards');
var chosenLang = 'en';
const languageList = {
    "Choose a language!": "xx",
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

let dropdownBox = document.createElement("DIV");
dropdownBox.classList.add("custom-select");

let dropdown = document.createElement("SELECT");
dropdown.setAttribute("name", "languages");
dropdownBox.appendChild(dropdown);

// for (let [key, value] of Object.entries(languageList)) {
//     let button = document.createElement('OPTION');
//     button.setAttribute("value", value);
//     button.textContent = key;
//     if(value === chosenLang) {
//         button.setAttribute('selected', 'selected')
//     }
//     dropdown.appendChild(button);
// }

function constructOptions(vocabList) {


    // selElmnt = languages.getElementsByTagName("SELECT")[0];
    ll = dropdown.length;

    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = dropdown.options[dropdown.selectedIndex].innerHTML;
    dropdownBox.appendChild(a);

    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");

    for (j = 1; j < ll; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        console.log(dropdown.options[j]);
        c.innerHTML = dropdown.options[j].innerHTML;
        c.addEventListener("click", function (e) {
            /* When an item is clicked, update the original select box,
            and the selected item: */
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            // console.log(this.parentNode);
            // console.log(languageList[h.innerHTML]);
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");

                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();

            // THIS IS THE IMPORTANT PART LOOK HERE SAHIL!!!! 
            chosenLang = languageList[h.innerHTML];
            removeElementsByClass("grid-container");
            constructCards(vocabList);

        });
        b.appendChild(c);
    }
    dropdownBox.appendChild(b);

    a.addEventListener("click", function (e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });

    // dropdown.addEventListener('change', (e) => {
    //     console.log("yooo");
    //     // chrome.storage.sync.set({ language: e.target.value }, function () {
    //     //     console.log('language is ' + e.target.value);
    //     chosenLang = e.target.value;
    //     removeElementsByClass("grid-container");
    //     constructCards(kWords);
    //     // })
    // });
}

function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

const kWords = [
    { original: 'hello', translated: 'hola', language: 'en' },
    { original: 'averylong wordyouknwhowtheyreasf', translated: 'English', language: 'en' },
    { original: 'b', translated: 'Russian', language: 'rs' },
    { original: 'c', translated: 'English', language: 'en' },
    { original: 'd', translated: 'Russian', language: 'rs' },
    { original: 'e', translated: 'English', language: 'en' },
    { original: 'f', translated: 'Russian', language: 'rs' },
    { original: 'g', translated: 'English', language: 'en' },
    { original: 'h', translated: 'Russian', language: 'rs' },
    { original: 'i', translated: 'English', language: 'en' }
];
function constructCards(vocabList) {
    console.log("yoo");
    let grid = document.createElement("div");
    grid.classList.add("grid-container")

    for (let item of vocabList) {
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

function removeElementsByClass(className) {
    var elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

chrome.storage.sync.get('vocabList', function(result) {
    let vocabList = result.vocabList
    let langCodes = []
    
    for(let item of vocabList) {
        langCodes.push(item.language);
    }

    for (let [key, value] of Object.entries(languageList)) {
        if(!(langCodes.includes(value) ||value ==='xx')) {
            continue;
        }
        let button = document.createElement('OPTION');
        button.setAttribute("value", value);
        button.textContent = key;
        if(value === chosenLang) {
            button.setAttribute('selected', 'selected')
        }
        dropdown.appendChild(button);
    }
    

    console.log(result.vocabList);
    
    constructOptions(result.vocabList);
    page.appendChild(dropdownBox);
})

// constructCards(kWords);