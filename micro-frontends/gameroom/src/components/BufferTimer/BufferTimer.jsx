import {
    useEffect
} from "react";
import { useBufferTimer } from "../../hooks";
import {
    useSelector,
    useDispatch
} from "react-redux";

function BufferTimer() {
    const seconds = useBufferTimer();
    const dispatch = useDispatch();
    const bufferTimerIsRunning = useSelector(state => state.gameState.gameTimerBufferIsRunning);

    useEffect(() => {
        if (seconds <= 0) {
            dispatch({ type: "START_GAME_TIMER" });

            setTimeout(() => {
                dispatch({type: "STOP_GAME_BUFFER_TIMER"});
            }, 750)

        }

    }, [seconds])

    if (bufferTimerIsRunning) {
        return (
            <>
                <div className="gameEntity-bufferTimerType">
                    <div>
                        <p className="gameEntity-81190-textType">Speed Math questions bombardment commencing in...</p>
                        <p className="gameEntity-65422-textType">{seconds - 1 === 0 || seconds - 1 === -1 ? "Start!" : seconds - 1}</p>
                    </div>
                </div>
            </>
        )
    }

}

export default BufferTimer;