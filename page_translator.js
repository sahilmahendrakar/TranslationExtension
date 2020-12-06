// window.onload = function() {
//     var text = document.body.innerText;
//     console.log(text)
// }

//innerText gets only the 'human readable' elements (innertext would be much nicer to pass to nlp function, but we have to pass back textContent otherwise we might mess up the styling of the website)
//textContent returns all text

//maybe pass innerText to nlp function, then if function gives back both the new phrase and the old phrase, use replace to replace the old with new

window.onload = async function() {
    for(var textNode of textNodesUnder(document.body)){
        var rawText = textNode.nodeValue;
        console.log(rawText);
        console.log(textNode.parentElement)
        var translateDict = await translateNouns(rawText, "es", 50);
        console.log(translateDict);
        var translation = [];
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
                    var splitText = translation[i].split(item.original);
                    if(splitText.length > 1) {
                        translation.splice(i, 1);

                        for(let j = 0; j < splitText.length; j++) {
                            var translated = {
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
                if(typeof translation[i] === 'string' || translation[i] instanceof String) {
                    let text = document.createTextNode(translation[i]);
                    textNode.parentNode.appendChild(text);
                } else if(typeof translation[i] !== 'undefined'){
                    let span = document.createElement('SPAN');
                    //console.log(part.original);
                    let text = document.createTextNode(translation[i].translated);
                    span.appendChild(text);
                    span.id = "kyleisgod"
                    
                    let tooltip = document.createElement('SPAN');
                    tooltip.className = "tooltiptext"
                    tooltip.textContent = translation[i].original
                    
                    
                    let addButton = document.createElement('BUTTON');
                    addButton.textContent = "+";
                    tooltip.appendChild(addButton);
                    
                    span.appendChild(tooltip)
                    textNode.parentNode.appendChild(span);
                }
            }
        }
    }
}
function textNodesUnder(el){
    var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
    while(n=walk.nextNode()) a.push(n);
    return a;
}

function ellenFunc(sentence) {
    var dict = {}
    dict["the"] = "bob";
    dict["example"] = "ejemple";
    return dict;
}