import React, {
    useState,
    useEffect, useRef
} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    ArithmeticQuestion
} from "../../../helpers";
import {GameTimer} from "../../GameTimer/index.js";
import { Toggles } from "../../Toggle"
import { GenericCheckbox } from "../../Checkbox";
import {DurationButton} from "../../DurationButton";
import { Game } from "../../../game";
import BufferTimer from "../../BufferTimer/BufferTimer.jsx";
import * as buffer from "buffer";

function SpeedRun() {
    const roundDurationInSeconds = useSelector(state => state.gameState.gameRoundPreferences.durationInSeconds)
    const dispatch = useDispatch();
    const endTime = roundDurationInSeconds * 1000;
    const [arithmeticQuestions, setArithmeticQuestions] = useState([]);
    const gameIsRunning = useSelector(state => state.gameState.gameIsRunning)
    const [userInput, setUserInput] = useState("");
    const [inputIsCorrect, setInputIsCorrect] = useState(false);
    const gameTimerIsRunning = useSelector(state => state.gameState.gameTimerIsRunning)
    const bufferTimerIsRunning = useSelector(state => state.gameState.gameTimerBufferIsRunning);
    const bufferTimerIsEnabled = useSelector(state => state.gameState.gameRoundPreferences.miscellaneousOptions.readyGameTimer);
    const availablePlaceValue = useSelector(state => state.gameState.gameRoundPreferences.digitCountRoster);
    const operationsRoster = useSelector(state => state.gameState.gameRoundPreferences.operationsRoster);
    const roundOptions = useSelector(state => state.gameState.gameRoundPreferences.miscellaneousOptions);
    const inputRef = useRef();

    const startGame = () => {
        if (!bufferTimerIsEnabled) {
            dispatch({type: "START_GAME_TIMER"});
        }

        else {
            dispatch({type: "START_GAME_BUFFER_TIMER"})
        }

        dispatch({type: "CHOOSE_GAME_MODE", payload: "speedRun"});
        dispatch({type: "START_GAME"});
    }

    const generateSubsequentArithmeticQuestion = () => {
        const equation = Game.generateEquation(2, operationsRoster, availablePlaceValue, roundOptions);
        Game.appendNewEquationToHistory(equation)
        setUserInput("")
        setInputIsCorrect(false)
        setArithmeticQuestions(Game.getEquationsHistory());
        dispatch({type: "RECORD_SCORE", payload: Game.getEquationsHistory().slice(0, Game.getEquationsHistory().length - 1)})
    }

    useEffect(() => {
        if (arithmeticQuestions.length === 0 && gameIsRunning) {
            const equation = Game.generateEquation(2, operationsRoster, availablePlaceValue, roundOptions);
            Game.appendNewEquationToHistory(equation)
            setUserInput("")
            setInputIsCorrect(false)
            setArithmeticQuestions(Game.getEquationsHistory());
        } else {
            setArithmeticQuestions([])
        }

    }, [gameIsRunning])

    useEffect(() => {
        window.addEventListener("keydown", (event) => {
            if (event.code === "Space") {
                inputRef.current.focus();
            }
        })

    }, [])

    useEffect(() => {
        if (inputRef.current && gameTimerIsRunning) {
            inputRef.current.focus();
        }
    }, [inputRef.current])

    return (
        <>
            {
                gameIsRunning ?
                <div>
                    {
                        arithmeticQuestions.slice(0, 1).map(arithmeticQuestion => {
                            return (
                                <div className={"gameEntity-90081--gameBoardType"} onClick={() => {
                                    inputRef.current.focus();
                                }}
                                >
                                    {
                                        bufferTimerIsRunning && bufferTimerIsEnabled &&
                                        <BufferTimer />
                                    }
                                    {
                                        <div className="gameEntity-74762-stageType">
                                            <GameTimer endTime={endTime} />
                                            <div className={`gameEntity-77789--wrapperType ${inputIsCorrect && "correct"}`}>
                                                { arithmeticQuestion.displayEquation() }
                                                <div>
                                                    <input
                                                        id="solutionInput"
                                                        ref={inputRef}
                                                        className={`gameEntity-35812--inputType ${inputIsCorrect && "correct"}`}
                                                        title={"text"}
                                                        disabled={!gameTimerIsRunning}
                                                        value={userInput}
                                                        maxLength={5}
                                                        autoFocus
                                                        onChange={(event) => {
                                                            if (gameIsRunning) {
                                                                setUserInput(event.target.value)
                                                            }

                                                            if (event.target.value === arithmeticQuestion.getSolution().toString()) {
                                                                setInputIsCorrect(true)
                                                                setTimeout(() => {
                                                                    generateSubsequentArithmeticQuestion()
                                                                }, 72)
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
                </div> :
                <div className="gameRoom-43671--groupWrapperType">
                    <h1 className="gameRoom-89201--headerType">Speed Run</h1>
                    <p className="gameRoom-34356--descriptionType">
                    The <b>Speed Run</b> game mode requires you to complete as much arithmetic equations as possible within the time limit.
                    You can choose amongst 30 seconds, 60 seconds, and 120 seconds for the time limit. You are not allowed to skip questions
                    and your input is immediately evaluated as you are typing. Refreshing the page will restart the game but you will lose your
                    progress for that round.
                    </p>
                    <div className="gameRoom-88971--groupWrapperType">
                        <h2 className="gameRoom-06789--headerType">Round Preferences</h2>
                        <p className="gameRoom-89711--descriptionType">
                            Customize your game to fit your session goals. The default will be a 30-second speed run of
                            additions with single digit numbers.
                        </p>
                        <div className="gameRoom-79991--groupWrapperType">
                            <h2 className="gameRoom-78651--headerType">Duration</h2>
                            <ul className="gameRoom-02919--listType">
                                {/*<li>*/}
                                {/*    <DurationButton*/}
                                {/*        durationIndicator={30}*/}
                                {/*    />*/}
                                {/*</li>*/}
                                {/*<li>*/}
                                {/*    <DurationButton*/}
                                {/*        durationIndicator={60}*/}
                                {/*    />*/}
                                {/*</li>*/}
                                {/*<li>*/}
                                {/*    <DurationButton*/}
                                {/*        durationIndicator={120}*/}
                                {/*    />*/}
                                {/*</li>*/}
                                <li>
                                    <Toggles.DurationButton
                                        seconds={30}
                                    />
                                </li>
                                <li>
                                    <Toggles.DurationButton
                                        seconds={60}
                                    />
                                </li>
                                <li>
                                    <Toggles.DurationButton
                                        seconds={120}
                                    />
                                </li>
                            </ul>
                        </div>
                        <div className="gameRoom-79991--groupWrapperType">
                            <h2 className="gameRoom-78651--headerType">Digit Count</h2>
                            <ul className="gameRoom-65410--listType">
                                <li>
                                    <Toggles.CheckBox
                                        label={"ones"}
                                        placeValue={"ones"}
                                    />
                                </li>
                                <li>
                                    <Toggles.CheckBox
                                        label={"tens"}
                                        placeValue={"tens"}
                                    />
                                </li>
                                <li>
                                    <Toggles.CheckBox
                                        label={"hundreds"}
                                        placeValue={"hundreds"}
                                    />
                                </li>
                                <li>
                                    <Toggles.CheckBox
                                        label={"thousands"}
                                        placeValue={"thousands"}
                                    />
                                </li>
                                {/*<li>*/}
                                {/*    <GenericCheckbox*/}
                                {/*        label={"ones"}*/}
                                {/*        gameStateID={1}*/}
                                {/*    />*/}
                                {/*</li>*/}
                                {/*<li>*/}
                                {/*    <GenericCheckbox*/}
                                {/*        label={"tens"}*/}
                                {/*        gameStateID={2}*/}
                                {/*    />*/}

                                {/*</li>*/}
                                {/*<li>*/}
                                {/*    <GenericCheckbox*/}
                                {/*        label={"hundreds"}*/}
                                {/*        gameStateID={3}*/}
                                {/*    />*/}
                                {/*</li>*/}
                            </ul>
                        </div>
                        <div className="gameRoom-79991--groupWrapperType">
                            <h2 className="gameRoom-78651--headerType">Operations</h2>
                            <ul className="gameRoom-65410--listType">
                                <li>
                                    <Toggles.OperationToggle
                                        label={"addition"}
                                        operation={"addition"}
                                    />
                                </li>
                                <li>
                                    <Toggles.OperationToggle
                                        label={"subtraction"}
                                        operation={"subtraction"}
                                    />

                                </li>
                                <li>
                                    <Toggles.OperationToggle
                                        label={"multiplication"}
                                        operation={"multiplication"}
                                    />

                                </li>
                                <li>
                                    <Toggles.OperationToggle
                                        label={"division"}
                                        operation={"division"}
                                    />
                                </li>
                            </ul>
                        </div>
                        <div className="gameRoom-79991--groupWrapperType">
                            <h2 className="gameRoom-78651--headerType">Miscellaneous</h2>
                            <ul className="gameRoom-65410--listType">
                                <li>
                                    <Toggles.MiscellaneousToggle
                                        label={"Negative Numbers"}
                                        action={"SET_GAME_ROUND_PREFERENCES@NEGATIVE_NUMBERS"}
                                        option={"negativeNumbers"}
                                    />
                                </li>
                                <li>
                                    <Toggles.MiscellaneousToggle
                                        label={"Buffer Timer"}
                                        action={"SET_GAME_ROUND_PREFERENCES@READY_GAME_TIMER"}
                                        option={"readyGameTimer"}
                                    />
                                </li>
                            </ul>
                        </div>
                        <button className="gameRoom-89201--buttonType" onClick={startGame}>Begin</button>
                    </div>
                </div>
            }
        </>
    )
}

export default SpeedRun;