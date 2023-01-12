import {
    useGameTimer
} from "../../hooks";
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";

function GameTimer({endTime}) {
    const seconds = useGameTimer(endTime);
    const dispatch = useDispatch();
    const gameIsRunning = useSelector(state => state.gameState.gameIsRunning);
    const gameTimerIsRunning = useSelector(state => state.gameState.gameTimerIsRunning);
    const gameBufferTimeIsEnabled = useSelector(state => state.gameState.gameRoundPreferences.miscellaneousOptions.readyGameTimer);
    const gameIsFinished = useSelector(state => state.gameState.gameFinished);

    useEffect(() => {
        if (seconds <= 0) {
            dispatch({type: "GAME_FINISHED"})
        }

        if (!gameTimerIsRunning && gameIsFinished) {
            setTimeout(() => {
                dispatch({type: "STOP_GAME"});
                dispatch({type: "TOGGLE_GAME_OVER_MODAL"});
            }, 1500)
        }
    }, [seconds, gameTimerIsRunning])

    if (seconds > 0) {
        return (
            <>
                <div className="gameEntity-19880--wrapperType">
                    <p className="gameEntity-33781--textType">Time:</p>
                    <span className="gameEntity-87261--textType">{seconds} {seconds === 1 ? "second" : "seconds"} remaining</span>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="gameEntity-19880--wrapperType">
                    <p className="gameEntity-67681--textType">Time's Up!</p>
                </div>
            </>
        )
    }
}

export default GameTimer;