class Memoria {
    constructor() {
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
        this.elements = [
            { element: "RedBull", source: "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg" },
            { element: "McLaren", source: "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg" },
            { element: "Alpine", source: "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg" },
            { element: "AstonMartin", source: "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg" },
            { element: "Ferrari", source: "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg" },
            { element: "Mercedes", source: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg" },
            { element: "RedBull", source: "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg" },
            { element: "McLaren", source: "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg" },
            { element: "Alpine", source: "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg" },
            { element: "AstonMartin", source: "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg" },
            { element: "Ferrari", source: "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg" },
            { element: "Mercedes", source: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg" }
        ];
    }

    shuffleElements() {
        for (let i = this.elements.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.elements[i], this.elements[j]] = [this.elements[j], this.elements[i]];
        }
    }

    unflipCards() {
        this.lockBoard = true;
        this.firstCard.setAttribute('data-state', 'flip');
        this.secondCard.setAttribute('data-state', 'flip');
        setTimeout(() => {
            this.firstCard.removeAttribute('data-state');
            this.secondCard.removeAttribute('data-state');
            this.resetBoard();
        }, 1500);
    }

    resetBoard() {
        this.firstCard = null;
        this.secondCart = null;
        this.hasFlippedCard = false;
        this.lockBoard = false;
    }

    checkForMatch() {
        (this.firstCard.getAttribute('data-element')==this.secondCard.getAttribute('data-element')) ? this.disableCards() : this.unflipCards();
    }

    disableCards() {
        this.firstCard.setAttribute('data-state', 'revealed');
        this.secondCard.setAttribute('data-state', 'revealed');

        this.resetBoard();
    }

    createElements() {
        let section = document.querySelector('section');

        for (let i = 0; i < this.elements.length; i++) {
            let article = document.createElement('article');
            article.setAttribute('data-element', this.elements[i].element);

            let header = document.createElement('h3');
            header.textContent = 'Tarjeta de memoria';

            let img = document.createElement('img');
            img.src = this.elements[i].source;
            img.alt = this.elements[i].element;

            article.appendChild(header);
            article.appendChild(img);

            section.appendChild(article);
        }
    }

    addEventListeners() {
        let section = document.querySelector("section");
        let cards = section.querySelectorAll("article");

        cards.forEach(card => {
            card.addEventListener("click", this.flipCard.bind(this, card));
        });
    }

    flipCard(card) {
        if(card.getAttribute('data-state')=='revealed'){return;}
        else if(this.lockBoard){return;}
        else if(card == this.firstCard){return;}

        card.setAttribute('data-state', 'flip');
    
        if(!this.hasFlippedCard){
            this.firstCard=card;
            this.hasFlippedCard=true;
        }
        else{
            this.secondCard=card;
            this.checkForMatch();
        }

    }
}
mem = new Memoria();
mem.shuffleElements();
mem.createElements();
mem.addEventListeners();
