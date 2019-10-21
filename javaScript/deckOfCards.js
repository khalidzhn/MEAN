class Deck {
    constructor() {
        this.deck = [];
        this.reset();
        }
    reset() {
        this.deck = [];
        const suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
        const stringValues = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];
        
        //Populate a deck of 52 cards
        for (const suit of suits ) {
            for (const value of stringValues) {
                this.deck.push(`${value} of ${suit}`);
            }
        }
        return this;
    }
    
    //shuffle
    shuffle() {
        let shuffleIt = this.deck.length, newOrder, shuffling;
        while (shuffleIt) {
            shuffling = Math.floor(Math.random() * shuffleIt--);
            newOrder = this.deck[shuffleIt];
            this.deck[shuffleIt] = this.deck[shuffling];
            this.deck[shuffling] = newOrder;
        }
        return this;
    }
    
    //make sure same card can't be dealt again
    deal() {
        return this.deck.pop();
    }
    
    //New length of deck after cards are dealt
    cardCount() {
        return this.deck.length;
    }
}
