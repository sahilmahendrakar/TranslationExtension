// window.onload = function() {
//     var text = document.body.innerText;
//     console.log(text)
// }

//innerText gets only the 'human readable' elements (innertext would be much nicer to pass to nlp function, but we have to pass back textContent otherwise we might mess up the styling of the website)
//textContent returns all text

//maybe pass innerText to nlp function, then if function gives back both the new phrase and the old phrase, use replace to replace the old with new

const translate = async function(language, difficulty){
    for(var textNode of textNodesUnder(document.body)){
        let rawText = textNode.nodeValue;
        console.log(rawText);
        console.log(textNode.parentElement)
        let translateDict = await translateNouns(rawText, language, difficulty);
        console.log(translateDict);
        let translation = [];
        translation.push(rawText)
        // var split = rawText.split(" ");
        // textNode.nodeValue = spliut[0]
        // for(let i = 1; i < split.length; i++) {
        //     var text = document.createTextNode(split[i]);
        //     textNode.parentNode.appendChild(text);
        // }
        if(translateDict.length > 0) {
            for(let item of translateDict) {
                for(let i = 0; i < translation.length; i++){
                    if(!(typeof translation[i] === 'string' || translation[i] instanceof String)) {
                        continue;
                    }
                    console.log(item)
                    let splitText = translation[i].split(item.original);
                    if(splitText.length > 1) {
                        translation.splice(i, 1);

                        for(let j = 0; j < splitText.length; j++) {
                            let translated = {
                                original: item.original,
                                translated: item.translated,
                            };
                            if(j > 0){
                                translation.splice(i++, 0, translated);
                            }
                            translation.splice(i++, 0, splitText[j]);
                        }
                    }
                }
            }
            textNode.nodeValue=translation[0];
            for(let i = 1; i < translation.length; i++) {
                let phrase = translation[i]
                if(typeof phrase === 'string' || phrase instanceof String) {
                    let text = document.createTextNode(translation[i]);
                    textNode.parentNode.appendChild(text);
                } else if(typeof phrase !== 'undefined'){
                    let span = document.createElement('SPAN');
                    //console.log(part.original);
                    let text = document.createTextNode(phrase.translated);
                    span.appendChild(text);
                    span.id = "kyleisgod"
                    
                    let tooltip = document.createElement('SPAN');
                    tooltip.className = "tooltiptext"
                    tooltip.textContent = phrase.original
                    
                    
                    let addButton = document.createElement('BUTTON');
                    addButton.textContent = "+";
                    
                    // addButton.onclick = function() {
                    //     console.log(translation[i].original);
                    //     addWordToFlashcards(translation[i].original, translation[i].translated, language);
                    // }

                    addButton.addEventListener("click", (event) => {
                        addWordToFlashcards(phrase.original, phrase.translated, language);
                     });

                    tooltip.appendChild(addButton);
                    
                    span.appendChild(tooltip)
                    textNode.parentNode.appendChild(span);
                }
            }
        }
    }
}

window.onload = async function() {
    chrome.storage.sync.get("language", function(data) {
        console.log(data.language);
        chrome.storage.sync.get("difficulty", function(result) {
            translate(data.language, result.difficulty)
        })    // All your code is contained here, or executes later that this
    });
}
function textNodesUnder(el){
    var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
    while(n=walk.nextNode()) a.push(n);
    return a;
}

var addWordToFlashcards = function(original, translated, language) {
    chrome.storage.sync.get({vocabList: []}, function(result) {
        var vocabList = result.vocabList;
        vocabList.push({
            original: original,
            translated: translated,
            language: language
        })

        chrome.storage.sync.set({vocabList: vocabList}, function(){
            console.log("updated vocabList");
            console.log(vocabList);
        })
    })
}