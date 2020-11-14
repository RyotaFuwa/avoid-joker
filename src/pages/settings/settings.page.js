import React, {useState} from 'react';
import "./settings.style.scss";
import {BackToMenu} from "../../components/back-to-menu/back-to-menu.component";
import {SettingList} from "../../components/setting-list/setting-list.component";

export const Settings = () => {
    const [admin, setAdmin] = useState("");
    return (
    <div className='settings'>
        <BackToMenu />

        <div className='admin-code'>
            <input
                id='admin-code-input'
                className='admin-code--input'
                placeholder="Admin Code"
                value={admin}
                onChange={e => setAdmin(e.target.value)}
            />
            <label
                htmlFor='admin-code-input'
                className='admin-code--label'
            >
                Admin Code
            </label>
        </div>
        {admin === "admin" &&
            <div className='cheating-system'>
                <div className='title'>
                    Cheating System
                </div>

                <SettingList name='Default'>
                    No Cheating. Joker will be placed at random.
                </SettingList>

                <SettingList name="Joker Won't Be Around">
                    It's guaranteed that Joker will not be next to the last card including
                    diagonal neighbours.
                </SettingList>
            </div>
        }
    </div>
    )
}
