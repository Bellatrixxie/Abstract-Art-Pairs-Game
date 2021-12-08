document.addEventListener('DOMContentLoaded', () => {

    const cardArray = [
      {name: 'painting-1',
      img: 'https://res.cloudinary.com/bellatrixxie/image/upload/v1632353599/Memory%20Game%20Images/painting-1_beplh3.jpg'
      },
      {name: 'painting-1',
      img: 'https://res.cloudinary.com/bellatrixxie/image/upload/v1632353599/Memory%20Game%20Images/painting-1_beplh3.jpg'
      },
      {name: 'painting-2',
      img: 'https://res.cloudinary.com/bellatrixxie/image/upload/v1632353598/Memory%20Game%20Images/painting-2_nlj3uc.jpg'
      },
      {name: 'painting-2',
      img: 'https://res.cloudinary.com/bellatrixxie/image/upload/v1632353598/Memory%20Game%20Images/painting-2_nlj3uc.jpg'
      },
      {name: 'painting-3',
      img: 'https://res.cloudinary.com/bellatrixxie/image/upload/v1632353599/Memory%20Game%20Images/painting-3_kuie6n.jpg'
      },
      {name: 'painting-3',
      img: 'https://res.cloudinary.com/bellatrixxie/image/upload/v1632353599/Memory%20Game%20Images/painting-3_kuie6n.jpg'
      },
      {name: 'painting-4',
      img: 'https://res.cloudinary.com/bellatrixxie/image/upload/v1632353599/Memory%20Game%20Images/painting-4_hklqcd.jpg'
      },
      {name: 'painting-4',
      img: 'https://res.cloudinary.com/bellatrixxie/image/upload/v1632353599/Memory%20Game%20Images/painting-4_hklqcd.jpg'
      },
      {name: 'painting-5',
      img: 'https://res.cloudinary.com/bellatrixxie/image/upload/v1632353599/Memory%20Game%20Images/painting-5_oix7wd.jpg'
      },
      {name: 'painting-5',
      img: 'https://res.cloudinary.com/bellatrixxie/image/upload/v1632353599/Memory%20Game%20Images/painting-5_oix7wd.jpg'
      },
      {name: 'painting-6',
      img: 'https://res.cloudinary.com/bellatrixxie/image/upload/v1632353599/Memory%20Game%20Images/painting-6_a9kpw6.jpg'
      },
      {name: 'painting-6',
      img: 'https://res.cloudinary.com/bellatrixxie/image/upload/v1632353599/Memory%20Game%20Images/painting-6_a9kpw6.jpg'
      }
    ]
    
    cardArray.sort(() => 0.5 - Math.random())
    
    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    let chosenCards = [];
    let chosenCardsId = [];
    let cardsWon = [];
    
    function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
        let card = document.createElement('img');
        card.setAttribute('src', 'https://res.cloudinary.com/bellatrixxie/image/upload/v1632353598/Memory%20Game%20Images/card-back_ytkg8z.jpg');
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
      }
    }
    
    function checkForMatch() {
      let cards = document.querySelectorAll('img');
      const optionOneId = chosenCardsId[0];
      const optionTwoId = chosenCardsId[1];
      if (chosenCards[0] === chosenCards[1]) {
      //  alert('You found a match!')
        cards[optionOneId].setAttribute('src', 'https://res.cloudinary.com/bellatrixxie/image/upload/v1632356549/Memory%20Game%20Images/black_ajsdju.jpg');
        cards[optionTwoId].setAttribute('src', 'https://res.cloudinary.com/bellatrixxie/image/upload/v1632356549/Memory%20Game%20Images/black_ajsdju.jpg');
        cardsWon.push(chosenCards);
      } else {
        cards[optionOneId].setAttribute('src', 'https://res.cloudinary.com/bellatrixxie/image/upload/v1632353598/Memory%20Game%20Images/card-back_ytkg8z.jpg');
        cards[optionTwoId].setAttribute('src', 'https://res.cloudinary.com/bellatrixxie/image/upload/v1632353598/Memory%20Game%20Images/card-back_ytkg8z.jpg');
     //   alert('Sorry, try again')
        // I added the Event Listener back in after removing it in flipCard function.
        cards[optionOneId].addEventListener('click', flipCard);
        cards[optionTwoId].addEventListener('click', flipCard);
      }
      chosenCards = [];
      chosenCardsId = [];
      resultDisplay.textContent = cardsWon.length;
      if (cardsWon.length === cardArray.length/2) {
        resultDisplay.textContent = 'Congratulations! You found them all!';
      }
    }
    
    function flipCard() {
      let cardId = this.getAttribute('data-id');
      chosenCards.push(cardArray[cardId].name);
      chosenCardsId.push(cardId);
      this.setAttribute('src', cardArray[cardId].img);
      
      // Found out I needed to remove the Event Listener so each card can't be double-clicked and self-matched.
      this.removeEventListener('click', flipCard);
      
     // The following conditional is my fix to make sure only 2 cards can be clicked at a time.
      if (chosenCards.length > 2) {
        chosenCards = [chosenCards[0], chosenCards[1]];
        chosenCardsId = [chosenCardsId[0], chosenCardsId[1]];
        if (chosenCardsId.includes(cardId)) {
        } else {
          this.setAttribute('src', 'https://res.cloudinary.com/bellatrixxie/image/upload/v1632353598/Memory%20Game%20Images/card-back_ytkg8z.jpg');
          this.addEventListener('click', flipCard);
        }
      }
      if (chosenCards.length === 2) {
        setTimeout(checkForMatch, 500);
      }
    }
      
    createBoard();
      
    });
    