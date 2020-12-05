// window.onload = function() {
//     var text = document.body.innerText;
//     console.log(text)
// }

//innerText gets only the 'human readable' elements (innertext would be much nicer to pass to nlp function, but we have to pass back textContent otherwise we might mess up the styling of the website)
//textContent returns all text

//maybe pass innerText to nlp function, then if function gives back both the new phrase and the old phrase, use replace to replace the old with new

window.onload = function() {
    document.body.querySelectorAll('ul').forEach(function(element) {
        console.log(element.innerText);
        var rawText = element.innerText;
        var uwu = rawText.replaceAll("l", "w").replaceAll("r", "w");
        element.innerText = uwu;
    })
}