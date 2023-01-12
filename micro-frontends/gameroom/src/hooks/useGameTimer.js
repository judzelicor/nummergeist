import {
    useEffect,
    useState
} from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";

function useGameTimer(endTime) {
    const gameTimerEndTime = new Date().getTime() + endTime;
    const gameTimerIsRunning = useSelector(state => state.gameState.gameTimerIsRunning);
    const dispatch = useDispatch();
    const [time, setTime] = useState(
        gameTimerEndTime - new Date().getTime()
    )

    useEffect(() => {
        let interval;

        if (gameTimerIsRunning) {
            interval = setInterval(() => {
                setTime(gameTimerEndTime - new Date().getTime());
            }, 1000)
        }

        return () => clearInterval(interval)
    }, [gameTimerIsRunning])

    useEffect(() => {
        if (formatTime(time) <= 0) {
            dispatch({type: "STOP_GAME_TIMER"})
        }
    }, [time])

    return formatTime(time);
}

function formatTime(time) {
    return Math.ceil(new Date(time).getTime() / 1000);
}

export default useGameTimer;