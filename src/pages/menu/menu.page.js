import React, {useState} from "react";
import {Link} from "react-router-dom";

export const Menu = () => {
    const [numCards, setNumCards] = useState(16);

    return (
        <div className='menu'>
            <div className='setting'>settings</div>

            <h1 className='title'>Joker</h1>
            <Link to="/game">Start Game</Link>
        </div>
    )
}