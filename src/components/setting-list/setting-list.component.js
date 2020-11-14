import React from "react";
import "./setting-list.style.scss";


export const SettingList = ({name, children, selected, onClick}) => (
    <div className='setting-list'>
        <h6 className='name'>
            {name}
        </h6>
        <p className='description'>
            {children}
        </p>
    </div>
)