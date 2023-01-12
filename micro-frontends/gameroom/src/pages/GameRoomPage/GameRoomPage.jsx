import React from "react";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

class GameRoomPage extends React.PureComponent {
    render() {
        const {
            gameIsRunning,
            gameMode,
            gameModePreferences
        } = this.props;

        return (
            <>
                <Outlet />
            </>
        )
    }
}

function allowHooks(Component) {
    return (props) => {
        const gameIsRunning = useSelector(state => state.gameState.gameIsRunning);
        const gameMode = useSelector(state => state.gameState.gameMode);
        const gameModePreferences = useSelector(state => state.gameState.gameModePreferences);

        return <Component gameIsRunning={gameIsRunning} gameMode={gameMode} gameModePreferences={gameModePreferences} {...props} />
    }
}

export default allowHooks(GameRoomPage);