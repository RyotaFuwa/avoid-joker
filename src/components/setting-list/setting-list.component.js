import React from "react";
import "./setting-list.style.scss";


export const SettingList = ({name, description, onClick, selected}) => (
    <div className='setting-list' onClick={onClick} style={{backgroundColor: selected && "lightblue"}}>
        <h6 className='name'>
            {name}
        </h6>
        <p className='description'>
            {description}
        </p>
    </div>
)