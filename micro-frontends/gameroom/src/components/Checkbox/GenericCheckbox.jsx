import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

function GenericCheckbox({label, gameStateID}) {
    const [checked, setChecked] = useState(false);
    const availablePlaceValue = useSelector(state => state.gameState.gameRoundPreferences.availablePlaceValue)
    const dispatch = useDispatch();

    const handleChange = (event) => {
        if (availablePlaceValue.length === 1 && checked) {
            return
        }

        setChecked(!checked)
    }

    useEffect(() => {
        let _availablePlaceValue = [...availablePlaceValue]

        if (checked) {
            if (_availablePlaceValue.indexOf(gameStateID) === -1) {
                _availablePlaceValue.push(gameStateID)

            }

        } else {
            const gameStateIDIndex = _availablePlaceValue.indexOf(gameStateID)

            if (gameStateIDIndex + 1) {
                _availablePlaceValue.splice(gameStateIDIndex, 1)
            }
        }
        dispatch({type: "SET_GAME_ROUND_PREFERENCES@PLACE_VALUE", payload: _availablePlaceValue})

    }, [checked])

    useEffect(() => {
        if (availablePlaceValue.indexOf(gameStateID) >= 0) {
            setChecked(true)
        }

    }, [])

    return (
        <>
            <label className={`checkbox-77814 ${checked ? "--checked" : ""}`}>
                <div className="checkbox-77814--wrapperType">
                    <div className="checkbox-77814--planeType">
                        <div className="checkbox-77814--iconType">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 405.272 405.272">
                                <path d="M393.401 124.425 179.603 338.208c-15.832 15.835-41.514 15.835-57.361 0L11.878 227.836c-15.838-15.835-15.838-41.52 0-57.358 15.841-15.841 41.521-15.841 57.355-.006l81.698 81.699L336.037 67.064c15.841-15.841 41.523-15.829 57.358 0 15.835 15.838 15.835 41.514.006 57.361z"/>
                            </svg>
                        </div>
                    </div>
                    <input className="checkbox-77814--inputType" checked={checked} type="checkbox" onChange={handleChange} />
                </div>
                <span className="checkbox-77814-labelType">{label}</span>
            </label>
        </>
    )
}

export default GenericCheckbox;