// window.onload = function() {
//     var text = document.body.innerText;
//     console.log(text)
// }

//innerText gets only the 'human readable' elements (innertext would be much nicer to pass to nlp function, but we have to pass back textContent otherwise we might mess up the styling of the website)
//textContent returns all text

//maybe pass innerText to nlp function, then if function gives back both the new phrase and the old phrase, use replace to replace the old with new

//first iteration uwu
// window.onload = function() {
//     document.body.querySelectorAll('*').forEach(function(element) {
//         if(element.nodeType === Node.TEXT_NODE){
//             console.log(element.innerText);
//             var rawText = element.innerText;
//             var uwu = rawText.replaceAll("l", "w").replaceAll("r", "w");
//             element.innerText = uwu;
//         }
//     })
// }

//UwU 2.0
window.onload = function() {
    textNodesUnder(document.body).forEach(function(textNode){
        var rawText = textNode.nodeValue;
        //console.log(rawText);
        var translateDict = ellenFunc(rawText);
        var translation = [];
        translation.push(rawText)
        // var split = rawText.split(" ");
        // textNode.nodeValue = spliut[0]
        // for(let i = 1; i < split.length; i++) {
        //     var text = document.createTextNode(split[i]);
        //     textNode.parentNode.appendChild(text);
        // }
        if(Object.keys(translateDict).length > 0) {
            for(let key in translateDict) {
                for(let i = 0; i < translation.length; i++){
                    if(!(typeof translation[i] === 'string' || translation[i] instanceof String)) {
                        continue;
                    }
                    var splitText = translation[i].split(key);
                    if(splitText.length > 1) {
                        translation.splice(i, 1);

                        for(let j = 0; j < splitText.length; j++) {
                            var translated = {
                                original: key,
                                translated: translateDict[key],
                            };
                            console.log(j)
                            console.log(translation)
                            if(j > 0){
                                translation.splice(i++, 0, translated);
                            }
                            translation.splice(i++, 0, splitText[j]);
                            console.log(translation);
                        }
                    }
                }
            }
            console.log(translation)
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
                    textNode.parentNode.appendChild(text);
                }
            }
        }
    })
}
function textNodesUnder(el){
    var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
    while(n=walk.nextNode()) a.push(n);
    return a;
}

function ellenFunc(sentence) {
    var dict = {}
    dict["the"] = "bob";
    return dict;
}