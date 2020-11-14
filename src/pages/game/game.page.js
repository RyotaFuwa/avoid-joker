import React, {useState} from "react";
import {connect} from "react-redux";
import "./game.style.scss";
import {Card} from "../../components/card/card.component";
import {Link} from "react-router-dom";
import {BackToMenu} from "../../components/back-to-menu/back-to-menu.component";

const CARD_NUMBER = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const CARD_TYPES = ['heart', 'diamond', 'club', 'spade'];

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: this.getCards(props.numCards),
            gameOver: false,
        }
    }

    getCards = numCards => {
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

    flipCard = idx => {
        if (idx >= this.state.cards.length) return;

        this.setState(state => {
            state.cards[idx].flipped = true;
            return {cards: [...state.cards]};
        }, () => {
            if (this.state.cards[idx].isJoker) setTimeout(this.endGame, 2000);
        });
    }

    endGame = () => {
        this.setState(state => {
            state.cards.forEach(card => card.flipped = true);
            return {gameOver: true, cards: [...state.cards]};
        });
    }

    render() {
        return (
            <div className='game' style={{'backgroundColor': this.state.gameOver ? 'black' : null}}>
                <BackToMenu/>
                <div className='cards'>
                    {this.state.cards.map(card => (
                        <Card key={card.idx} {...card} onClick={() => this.flipCard(card.idx)}/>
                    ))}
                </div>

                <div className='game__popup' style={{'display': this.state.gameOver ? null : "none"}}>
                    <div className='game__popup--background'/>
                    <div className='game__popup--box'>
                        <div> Game Over</div>
                        <Link className='back' to='/'>Back</Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    numCards: state.jokerGame.numCards,
    cheatingSystem: state.jokerGame.cheatingSystem,
})


export default connect(mapStateToProps)(Game);