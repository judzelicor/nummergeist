const DEFAULT_STATE = {
    gameIsRunning: false,
    showGameOverModal: false,
    arithmeticQuestionsAnswered: [],
    gameMode: "",
    gameTimerIsRunning: false,
    gameTimerBufferIsRunning: false,
    gameRoundPreferences: {
        durationInSeconds: 30,
        digitCountRoster: ["ones"],
        operationsRoster: ["addition"],
        miscellaneousOptions: {
            readyGameTimer: false,
            negativeNumbers: false
        }
    },
    gameFinished: false
}

export default function gameStateReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case "START_GAME":
            return {
                ...state,
                gameIsRunning: true,
            }

        case "START_GAME_TIMER":
            return {
                ...state,
                gameTimerIsRunning: true
            }

        case "GAME_FINISHED":
            return {
                ...state,
                gameFinished: true
            }

        case "START_GAME_BUFFER_TIMER":
            return {
                ...state,
                gameTimerBufferIsRunning: true
            }

        case "STOP_GAME_BUFFER_TIMER":
            return {
                ...state,
                gameTimerBufferIsRunning: false
            }

        case "STOP_GAME_TIMER":
            return {
                ...state,
                gameTimerIsRunning: false
            }

        case "STOP_GAME":
            return {
                ...state,
                gameIsRunning: false,
            }

        case "RESTART_GAME":
            return {
                ...state,
                gameIsRunning: true,
                gameTimerIsRunning: false,
                showGameOverModal: false,
                arithmeticQuestionsAnswered: [],
                gameFinished: false,
            }

        case "RESET_GAME_STATE":
            return {
                ...state,
                gameIsRunning: false,
                showGameOverModal: false,
                arithmeticQuestionsAnswered: [],
                gameTimerIsRunning: false,
                gameFinished: false
            }

        case "TOGGLE_GAME_OVER_MODAL":
            return {
                ...state,
                showGameOverModal: !state.showGameOverModal
            }

        case "CHOOSE_GAME_MODE":
            return {
                ...state,
                gameMode: action.payload
            }

        case "RECORD_SCORE":
            return {
                ...state,
                arithmeticQuestionsAnswered: action.payload
            }

        case "SET_GAME_ROUND_PREFERENCES@PLACE_VALUE":
            return {
                ...state,
                gameRoundPreferences: {
                    ...state.gameRoundPreferences,
                    digitCountRoster: action.payload
                }
            }

        case "SET_GAME_ROUND_PREFERENCES@OPERATIONS":
            return {
                ...state,
                gameRoundPreferences: {
                    ...state.gameRoundPreferences,
                    operationsRoster: [...action.payload]
                }
            }

        case "SET_GAME_ROUND_PREFERENCES@DURATION":
            return {
                ...state,
                gameRoundPreferences: {
                    ...state.gameRoundPreferences,
                    durationInSeconds: action.payload
                }
            }

        case "SET_GAME_ROUND_PREFERENCES@NEGATIVE_NUMBERS":
            return {
                ...state,
                gameRoundPreferences: {
                    ...state.gameRoundPreferences,
                    miscellaneousOptions: {
                        ...state.gameRoundPreferences.miscellaneousOptions,
                        negativeNumbers: action.payload
                    }
                }
            }

        case "SET_GAME_ROUND_PREFERENCES@READY_GAME_TIMER":
            return {
                ...state,
                gameRoundPreferences: {
                    ...state.gameRoundPreferences,
                    miscellaneousOptions: {
                        ...state.gameRoundPreferences.miscellaneousOptions,
                        readyGameTimer: action.payload
                    }
                }
            }

        default:
            return state
    }
}