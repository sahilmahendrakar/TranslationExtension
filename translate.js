

const translateNouns = async (text,targetLang,percentModify) => {
  var dict = [];

  var syntaxed = await getSyntax(text)//.tokens; // gets the array of tokens
  syntaxed = syntaxed.tokens;

  console.log(syntaxed);

  for (var i = 0; i < syntaxed.length; i++) {
    var token = syntaxed[i];
    var pos = token.partOfSpeech.tag;
    if ((pos === "NOUN" || pos === "ADV" || pos === "ADJ" || pos === "NUM") && Math.random() * 100 < percentModify) {
      var translated = await translateWord(token.text.content,targetLang);
      translated = translated.data.translations[0].translatedText;
      dict.push({
        original: token.text.content,
        translated: translated
      })
    }
  }

  return dict;
}

const getSyntax = (text) => {
  console.log("ni hao");

  var textJson = {
    type: "PLAIN_TEXT",
    language: "en-us",
    content: text,
  };

  var nlCallOptions = {
    method: "POST",
    // headers: {
    //   //   "Content-Type": "application/json",
    //   Authorization: "Basic " + TRANSLATE_API_KEY,
    // },
    body: JSON.stringify({ 
      document: textJson, 
      encodingType: "UTF8"
    }),
  };

  console.log(textJson);

  return fetch(
    `https://language.googleapis.com/v1/documents:analyzeSyntax?key=${TRANSLATE_API_KEY}`,
    nlCallOptions
  )
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
};

const translateWord = (text, targetLang) => {
  return fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${TRANSLATE_API_KEY}&target=${targetLang}&q=${text}`
  )
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
};
