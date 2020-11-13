import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./menu.style.scss";

export const Menu = () => {
    const [numCards, setNumCards] = useState(16);

    const increment = () => {
        if(numCards < 64) setNumCards(numCards + 1);
    }

    const decrement = () => {
        if(numCards > 1) setNumCards(numCards - 1)
    }

    const handleChange = e => {
        let {value} = e.target;
        if(value < 0) setNumCards(0);
        else if(value >= 64) setNumCards(64);
        else setNumCards(value);
    }

    return (
        <div className='menu'>
            <div className='top-bar'>
                <span className='title'>
                    Joker
                </span>
                <Link className='settings' to='/settings'>
                    <span className='settings__icon' />
                </Link>
            </div>

            <h1 className='start-game'>
                <Link className='link' to="/game">Start Game</Link>
                <div className='num-cards'>
                    Number of Cards
                    <span className='operator decrement' onClick={decrement}>
                        -
                    </span>
                    <input className='value' onChange={handleChange} value={numCards}/>
                    <span className='operator increment' onClick={increment}>
                        +
                    </span>
                </div>
            </h1>

        </div>
    )
}