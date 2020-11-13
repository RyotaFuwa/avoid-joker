import React, {useState} from "react";
import "./game.style.scss";
import {Card} from "../../components/card/card.component";
import {Link} from "react-router-dom";

const CARD_NUMBER = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const CARD_TYPES = ['heart', 'diamond', 'club', 'spade'];

const getCards = numCards => {
    const seen = CARD_NUMBER.map(() => [false, false, false, false]);
    const cards = [];
    const jokerIdx = Math.floor(Math.random() * numCards);
    for(let i = 0; i < numCards; i++) {
        let numIdx = Math.floor(Math.random() * 13);
        let typeIdx = Math.floor(Math.random() * 4);
        console.log(numIdx);

        // while(seen[numIdx][typeIdx]) {
        //     numIdx = (numIdx + 1) % 13;
        //     typeIdx = (typeIdx + 1) % 4;
        // }

        seen[numIdx][typeIdx] = true;
        cards.push(
            {
                idx: i,
                flipped: false,
                isJoker: i === jokerIdx,
                num: CARD_NUMBER[numIdx],
                type: CARD_TYPES[typeIdx],
            }
        )
    }
    return cards;
}

export const Game = () => {
    let numCards = 16;
    const [cards, setCards] = useState(getCards(numCards))
    const [open, setOpen] = useState(false);
    const [PForNextJoker, setPForNextJoker] = useState(1 / numCards);
    const [PForNotSeen, setPForNotSeen] = useState(1);

    const flipAllCards = () => {
        cards.forEach(card => card.flipped = true);
        setCards([...cards])
    }

    const flipCard = idx => {
        if(idx >= cards.length) return;
        const card = cards[idx];
        card.flipped = true;
        setCards([...cards]);
        setPForNextJoker(1 / cards.filter(card => !card.flipped).length)
        setPForNotSeen(PForNotSeen * (1 - PForNextJoker));

        if(card.isJoker) {
            setTimeout(() => setOpen(true), 1000);
            setTimeout(flipAllCards, 2000);
        }
    }

    return (
        <div className='game'>
            <div className='game__stats' >
                <div style={{'display': open ? "none" : null}}>
                    P(Next is Joker) = {Math.round(PForNextJoker * 100)} %
                </div>
                <div style={{'display': open ? "none": null}}>
                    P(Joker hasn't seen) = {Math.round(PForNotSeen * 100)} %
                </div>
            </div>
            <div className='cards'>
            {cards.map(card => (
                <Card key={card.idx} {...card} onClick={() => flipCard(card.idx)} />
            ))}
            </div>
            <div className='game__popup' style={{'display': open ? null : "none"}}>
                <div> You Lost. </div>
                <Link className='back' to='/'>Back</Link>
            </div>
        </div>
    )
}