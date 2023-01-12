import {
    useState,
    useEffect
} from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";

function useBufferTimer() {
    const dispatch = useDispatch()
    const gameTimerBufferEndTime = new Date().getTime() + 3100;
    const bufferTimerIsEnabled = useSelector(state => state.gameState.gameRoundPreferences.miscellaneousOptions.readyGameTimer);

    const [bufferTime, setBufferTime] = useState(
        gameTimerBufferEndTime - new Date().getTime()
    )

    useEffect(() => {
        let interval;

        if (bufferTimerIsEnabled) {
            interval = setInterval(() => {
                setBufferTime(gameTimerBufferEndTime - new Date().getTime());
            }, 1000)
        }

        return () => clearInterval(interval)
    }, [])

    return formatTime(bufferTime);
}

function formatTime(time) {
    return Math.ceil(new Date(time).getTime() / 1000);
}

export default useBufferTimer;