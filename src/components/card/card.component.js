import React from "react";
import "./card.style.scss";

const Spade = () => (
    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-suit-spade-fill"
                         fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M5.602 14.153C6.272 13.136 7.348 11.28 8 9c.652 2.28 1.727 4.136 2.398 5.153.231.35-.02.847-.438.847H6.04c-.419 0-.67-.497-.438-.847z"/>
        <path d="M4.5 12.5A3.5 3.5 0 0 0 8 9a3.5 3.5 0 1 0 7 0c0-3-4-4-7-9-3 5-7 6-7 9a3.5 3.5 0 0 0 3.5 3.5z"/>
    </svg>
)

const Diamond = () => (
    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-suit-diamond-fill" fill="currentColor"
         xmlns="http://www.w3.org/2000/svg">
        <path
            d="M2.45 7.4L7.2 1.067a1 1 0 0 1 1.6 0L13.55 7.4a1 1 0 0 1 0 1.2L8.8 14.933a1 1 0 0 1-1.6 0L2.45 8.6a1 1 0 0 1 0-1.2z"/>
    </svg>
)

const Heart = () => (
    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-heart-fill" fill="currentColor"
         xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
    </svg>
)

const Club = () => (
    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-suit-club-fill" fill="currentColor"
         xmlns="http://www.w3.org/2000/svg">
        <path d="M11.5 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
        <path d="M8 9a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zm7 0a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
        <path
            d="M5.602 14.153c.5-.758 1.224-1.98 1.83-3.498.187-.467.949-.467 1.136 0a19.816 19.816 0 0 0 1.83 3.498c.231.35-.02.847-.438.847H6.04c-.419 0-.67-.497-.438-.847z"/>
        <path d="M7 7h2v4H7V7z"/>
    </svg>
)

const getNumAndType = (num, type, inv=false) => {
    switch(type) {
        case "heart":
            return (
                <div className="num-type red">
                    {num} <span className='icon'><Heart /></span>
                </div>
            );
        case "diamond":
            return (
                <div className="num-type red">
                    {num} <span className='icon'><Diamond /></span>
                </div>
            );
        case "club":
            return (
                <div className="num-type black">
                    {num} <span className='icon'><Club /></span>
                </div>
            );
        case "spade":
            return (
                <div className="num-type black">
                    {num} <span className='icon'><Spade /></span>
                </div>
            );
        default:
            return;
    }
}


export const Card = ({isJoker, flipped, onClick, num, type}) => {

    // const audioRef = React.createRef();
    const handleClick = e => {
        onClick(e);
        // audioRef.current.play();
    }

    return (
        <div className='card' onClick={handleClick}>
            {/*<audio ref={audioRef} src='../../data/card_flip.mp3'/>*/}
            <div
                className='card__side front'
                style={{"transform": flipped ? "rotateY(180deg)" : null}}
            />
            <div
                className={`card__side back ${isJoker && "joker"}`}
                style={{"transform": flipped ? "rotateY(0)" : "rotateY(-180deg)"}}
            >
                {!isJoker && flipped &&
                    <div className='top'>{getNumAndType(num, type)}</div>
                }

                {!isJoker && flipped &&
                    <div className='bottom'>{getNumAndType(num, type, true)}</div>
                }
            </div>
        </div>
    )
}