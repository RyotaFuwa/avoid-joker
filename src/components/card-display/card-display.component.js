import React from 'react';
import {Card} from "../card/card.component";
import "./card-display.style.scss";
import Game from "../../pages/game/game.page";

class CardDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
        }
    }

    componentDidMount() {
        const cards = Game.getCards(20);
        cards.forEach(card => {
            if(Math.random() < 0.5 && !card.isJoker) card.flipped = true;
        })
        this.setState(
            {cards: cards}
        )
    }

    render() {
        const {cards} = this.state;
        return (
            <div className='card-display'>
                <div className='card-display--slider'>
                    {cards.map(card => (
                        <Card
                            key={card.idx}
                            onClick={() => this.setState(state => {
                                const c = state.cards[card.idx];
                                c.flipped = true;
                                return {cards: [...cards]}
                            })}
                            {...card}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default CardDisplay;
