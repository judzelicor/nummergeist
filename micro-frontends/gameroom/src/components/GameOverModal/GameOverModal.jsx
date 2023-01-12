import {useEffect, createRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import { Game } from "../../game";

function GameOverModal() {
    const showGameOverModal = useSelector(state => state.gameState.showGameOverModal);
    const arithmeticQuestionsAnswered = useSelector(state => state.gameState.arithmeticQuestionsAnswered);
    const gameBufferTimerIsEnabled = useSelector(state => state.gameState.gameRoundPreferences.miscellaneousOptions.readyGameTimer);
    const roundDurationInSeconds = useSelector(state => state.gameState.gameRoundPreferences.durationInSeconds)
    const dispatch = useDispatch();
    const confettiRef = createRef();

    useEffect(() => {
        if (showGameOverModal) {
            const duration = 5 * 1000;
            const end = Date.now() + duration;

            const customConfetti = confetti.create(confettiRef.current, {
                resize: true,
                useWorker: true,
            })

            const defaults = {
                spread: 360,
                ticks: 50,
                gravity: 0,
                decay: 0.94,
                startVelocity: 30,
                shapes: ['star'],
                colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
            };

            const shoot = () => {
                customConfetti({
                    ...defaults,
                    particleCount: 40,
                    scalar: 1.2,
                    shapes: ['star']
                });

                customConfetti({
                    ...defaults,
                    particleCount: 10,
                    scalar: 0.75,
                    shapes: ['circle']
                });
            }

            setTimeout(shoot, 0);
            setTimeout(shoot, 100);
            setTimeout(shoot, 200);
            setTimeout(shoot, 500);
            setTimeout(shoot, 800);
        }
    }, [showGameOverModal]);

    if (showGameOverModal) {
        return (
            <>
                <div className="gameOverModal-76552--containerType">
                    <div className="gameOverModal-99081--containerType">
                        <div className="gameOverModal-77891--iconWrapperType">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34">
                                <path d="M32 3h-5V1.9c0-.5-.5-.9-1-.9H8c-.5 0-1 .4-1 .9 0 .4-.1.7-.1 1.1H2c-.6 0-1 .5-1 1v1.2c0 5.4 3.9 9.9 9.2 10.7.6 1 1.3 1.9 2 2.8h9.6c.8-.9 1.5-1.8 2-2.8C29.1 15 33 10.5 33 5.2V4c0-.5-.5-1-1-1zM3 5.2V5h3.9c.1 3 .7 5.8 2 8.5C5.4 12.3 3 9 3 5.2zm18 4.6-1.4 1.4.3 2c.1.3-.1.6-.3.8-.1.1-.3.2-.5.2-.1 0-.3 0-.4-.1l-1.7-.9-1.7.9c-.3.2-.6.1-.9-.1s-.4-.5-.3-.8l.3-2L13 9.8c-.2-.2-.3-.6-.2-.9s.4-.5.7-.6l1.9-.3.9-1.8c.1-.3.4-.5.8-.5.3 0 .6.2.8.5l.9 1.8 1.9.3c.3.1.6.3.7.6-.1.3-.2.7-.4.9zm10-4.6c0 3.8-2.4 7.1-5.9 8.3 1.2-2.6 1.8-5.4 1.9-8.5h4zM20.9 20.6h-7.8c0 1.6-.8 3.2-2.3 4.8-.3.3-.1.9.4.9H23c.5 0 .7-.6.4-.9-1.7-1.7-2.5-3.3-2.5-4.8zm3.2 7.8H9.9c-.5 0-.9.4-.9.9V32c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-2.8c0-.4-.4-.8-.9-.8z"/>
                            </svg>
                        </div>
                        <p className="gameOverModal-90817--textType">Well Done!</p>
                        <p className="gameOverModal-10901--textType">Within { roundDurationInSeconds } seconds, you completed</p>
                        <p className="gameOverModal-16773--textType">
                            {arithmeticQuestionsAnswered.length}
                        </p>
                        <p className="gameOverModal-98871--textType"> arithmetic {arithmeticQuestionsAnswered.length > 1 ? "questions" : "question"}.</p>
                        <button
                            className="gameOverModal-71724--buttonType restartGameButton"
                            onClick={() => {
                                Game.restartGame()
                                if (gameBufferTimerIsEnabled) {
                                    dispatch({type: "START_GAME_BUFFER_TIMER"})
                                }
                                dispatch({type: "RESTART_GAME"})
                            }}
                        >Restart</button>
                        <button
                            className="gameOverModal-71724--buttonType"
                            onClick={() => {
                                Game.restartGame()
                                dispatch({type: "RESET_GAME_STATE"})
                            }}
                        >Back to Lobby</button>
                    </div>
                </div>
                <canvas ref={confettiRef} id={"confetti"}></canvas>
                <div className="gameEntity-12367--backdropType"></div>
            </>
        )
    } else {
        return <></>
    }
}

export default GameOverModal;