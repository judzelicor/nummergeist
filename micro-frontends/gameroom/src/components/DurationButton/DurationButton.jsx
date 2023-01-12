import { useSelector, useDispatch } from "react-redux";

function DurationButton({durationIndicator}) {
    const roundDurationInSeconds = useSelector(state => state.gameState.gameRoundPreferences.durationInSeconds);
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch({type: "SET_GAME_ROUND_PREFERENCES@DURATION", payload: durationIndicator});
    }

    return (
        <>
            <button
                className={`gameRoom-11719-buttonType ${durationIndicator === roundDurationInSeconds ? "--active" : ""}`}
                onClick={handleClick}
            >
                <div className="gameRoom-99807--wrapperType">
                    <div className="gameRoom-18879--iconType">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 559.98 559.98">
                            <path d="M279.99 0C125.601 0 0 125.601 0 279.99c0 154.39 125.601 279.99 279.99 279.99 154.39 0 279.99-125.601 279.99-279.99S434.38 0 279.99 0zm0 498.78c-120.644 0-218.79-98.146-218.79-218.79 0-120.638 98.146-218.79 218.79-218.79s218.79 98.152 218.79 218.79c0 120.644-98.146 218.79-218.79 218.79z"/>
                            <path d="M304.226 280.326v-117.35c0-13.103-10.618-23.721-23.716-23.721-13.102 0-23.721 10.618-23.721 23.721v124.928c0 .373.092.723.11 1.096-.312 6.45 1.91 12.999 6.836 17.926l88.343 88.336c9.266 9.266 24.284 9.266 33.543 0 9.26-9.266 9.266-24.284 0-33.544l-81.395-81.392z"/>
                        </svg>
                    </div>
                    <p>{durationIndicator} seconds</p>
                </div>
            </button>
        </>
    )
}

export default DurationButton;