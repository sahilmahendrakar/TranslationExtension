let page = document.getElementById('card');
  const kWords = [{orig: 'hello', trans: 'hola'},{orig: 'orange', trans:'naranja'}];
  function constructCards(kWords) {
    for (let item of kWords) {

        let flipcard = document.createElement("div");
        flipcard.classList.add("flip-card");

        let flipcardInner = document.createElement("div");
        flipcardInner.classList.add("flip-card-inner");

        let flipcardFront = document.createElement("div");
        flipcardFront.classList.add("flip-card-front");

        let flipcardBack = document.createElement("div");
        flipcardBack.classList.add("flip-card-back");

        let frontContent = document.createTextNode(item.trans);
        let backContent = document.createTextNode(item.orig);

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

      document.body.appendChild(flipcard);
    }
  }
  constructCards(kWords);