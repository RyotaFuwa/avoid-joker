import React from "react";
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
            cards: [],
            lock: false,
            gameOver: false,
        };
    }

    componentDidMount() {
        switch(this.props.cheatingSystem) {
            case "joker won't be around":
                this.setState(state => ({
                    cards: Game.getCards(this.props.numCards),
                    gameOver: false,
                    prevIdx: 0,
                }));
                break;
            default:
                this.setState({
                    cards: Game.getCards(this.props.numCards),
                    gameOver: false,
                })
                break;
        }
    }

    static getCards = numCards => {
        const seen = CARD_NUMBER.map(() => [false, false, false, false]);
        const cards = [];
        const jokerIdx = Math.floor(Math.random() * numCards);
        for(let i = 0; i < numCards; i++) {
            let numIdx = Math.floor(Math.random() * 13);
            let typeIdx = Math.floor(Math.random() * 4);

            while(seen[numIdx][typeIdx]) {
                numIdx = (numIdx + 1) % 13;
                typeIdx = (typeIdx + 1) % 4;
            }

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

    default(idx) {
        this.setState(state => {
            state.cards[idx].flipped = true;
            return {cards: [...state.cards]};
        }, () => {
            if (this.state.cards[idx].isJoker) this.endGame();
        });
    }

    jokerWontBeAround(idx) {
        const {prevIdx, cards} = this.state;
        if(!cards[idx].isJoker) {
            this.setState(state => {
                state.cards[idx].flipped = true;
                return {cards: [...state.cards], prevIdx: idx};
            }, () => {
                if (this.state.cards[idx].isJoker) this.endGame();
            });
            return;
        }

        const neighbors = new Set();
        const row = Math.floor(prevIdx / 4);
        const col = prevIdx % 4;
        for(let i = -1; i <= 1; ++i) {
            for(let j = -1; j <= 1; ++j) {
                neighbors.add((row + i) * 4 + col + j);
            }
        }


        if(neighbors.has(idx)) { //then swap joker with a card not flipped yet.
            for(let i = 0; i < cards.length; i++) {
                if(!cards[i].flipped && i !== idx) {
                    cards[i].isJoker = true;
                    cards[idx].isJoker = false;
                    break;
                }
            }
        }

        this.setState(state => {
            state.cards[idx].flipped = true;
            return {cards: [...state.cards], prevIdx: idx};
        }, () => {
            if (this.state.cards[idx].isJoker) this.endGame();
        });
    }

    flipCard = idx => {
        if (idx >= this.state.cards.length) return;

        switch(this.props.cheatingSystem) {
            case "joker won't be around":
                this.jokerWontBeAround(idx);
                return;
            default:
                this.default(idx);
                return;
        }
    }

    endGame = () => {
        // lock the screen, flip all cards, and then game over. There is a delay for each step.
        const flipAll = callback => {
            this.setState(state => {
                state.cards.forEach(card => card.flipped = true);
                return {cards: [...state.cards]}},
                () => setTimeout(callback, 2000));
        }

        this.setState(({lock: true}),
            () => setTimeout(() => flipAll(() => this.setState({gameOver: true})),
                1500));

    }

    render() {
        return (
            <div className='game' style={{'backgroundColor': this.state.lock ? 'black' : null}}>
                <BackToMenu />
                <div className='cards'>
                    {this.state.cards.map(card => (
                        <Card key={card.idx} {...card} onClick={() => this.flipCard(card.idx)}/>
                    ))}
                </div>

                <div
                    className='game__lock'
                    style={{
                        'display': this.state.lock ? null : "none",
                    }}
                />
                <div
                    className='game__popup'
                    style={{
                        'opacity': this.state.gameOver ? "100%" : "0%",
                        'zIndex': this.state.gameOver ? "2" : null,
                    }}
                >
                    <div className='game__popup--background'/>
                    <div className='game__popup--box'>
                        <div className='game-over'>Game Over</div>
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