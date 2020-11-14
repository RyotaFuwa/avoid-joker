import React, {useState} from 'react';
import {connect} from "react-redux";
import "./settings.style.scss";
import {BackToMenu} from "../../components/back-to-menu/back-to-menu.component";
import {SettingList} from "../../components/setting-list/setting-list.component";
import {setCheatingSystem} from "../../redux/redux/joker-game/joker-game.action";

const CHEATING_SYSTEMS = [
    ["default",  "No Cheating. Joker will be placed at random."],
    ["joker won't be around", "It's guaranteed that Joker will not be next to the last card including diagonal neighbours."]
]

const Settings = ({cheatingSystem, setCheatingSystem}) => {
    const [admin, setAdmin] = useState("");
    return (
    <div className='settings'>
        <BackToMenu />

        <div className='admin-code'>
            <input
                id='admin-code-input'
                className='admin-code--input'
                placeholder="admin"
                value={admin}
                onChange={e => setAdmin(e.target.value)}
            />
        </div>
        {admin === "admin" &&
            <div className='cheating-system'>
                <div className='title'>
                    Cheating System
                </div>

                {CHEATING_SYSTEMS.map(([name, description]) => (
                    <SettingList
                        key={name}
                        name={name}
                        description={description}
                        selected={cheatingSystem === name}
                        onClick={() => setCheatingSystem(name)}
                    />
                ))}
            </div>
        }
    </div>
    )
}

const mapStateToProps = state => ({
    cheatingSystem: state.jokerGame.cheatingSystem
})

const mapDispatchToProps = dispatch => ({
    setCheatingSystem: cheatingSystem => dispatch(setCheatingSystem(cheatingSystem)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
