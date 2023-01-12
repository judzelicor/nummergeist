import React, {useState, useEffect, PureComponent} from "react";
import { useSelector, useDispatch } from "react-redux";

class GenericToggle extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <>
                <label className={`toggle-99876 ${checked ? "--checked" : ""}`}>
                    <div className="toggle-98807">
                        <div className="toggle-93072--trackType">
                            <div className="toggle-98807-iconType check">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 405.272 405.272">
                                    <path d="M393.401 124.425 179.603 338.208c-15.832 15.835-41.514 15.835-57.361 0L11.878 227.836c-15.838-15.835-15.838-41.52 0-57.358 15.841-15.841 41.521-15.841 57.355-.006l81.698 81.699L336.037 67.064c15.841-15.841 41.523-15.829 57.358 0 15.835 15.838 15.835 41.514.006 57.361z"/>
                                </svg>
                            </div>
                            <div className="toggle-98807-iconType cross">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 348.333 348.334">
                                    <path d="M336.559 68.611 231.016 174.165l105.543 105.549c15.699 15.705 15.699 41.145 0 56.85-7.844 7.844-18.128 11.769-28.407 11.769-10.296 0-20.581-3.919-28.419-11.769L174.167 231.003 68.609 336.563c-7.843 7.844-18.128 11.769-28.416 11.769-10.285 0-20.563-3.919-28.413-11.769-15.699-15.698-15.699-41.139 0-56.85l105.54-105.549L11.774 68.611c-15.699-15.699-15.699-41.145 0-56.844 15.696-15.687 41.127-15.687 56.829 0l105.563 105.554L279.721 11.767c15.705-15.687 41.139-15.687 56.832 0 15.705 15.699 15.705 41.145.006 56.844z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="toggle-98807-thumbType"></div>
                        <input onChange={handleChange} checked={checked} className="toggle-98807--inputType" type="checkbox" />
                    </div>
                    <span className="toggle-98807--labelType">{label}</span>
                </label>
            </>
        )
    }
}

class OperationToggle extends GenericToggle {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { operation, operationsRoster } = this.props;

        if (operationsRoster.indexOf(operation) >= 0) {
            this.setState({ checked: true });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { operationsRoster, operation, dispatch } = this.props;
        let _operationsRoster = [...operationsRoster];

        if (prevState.checked !== this.state.checked) {
            if (_operationsRoster.indexOf(operation) === -1) {
                _operationsRoster = [..._operationsRoster, operation]

            } else if (!this.state.checked && _operationsRoster.indexOf(operation) >= 0) {
                const operationIndex = _operationsRoster.indexOf(operation);
                _operationsRoster.splice(operationIndex, 1);
            }

            dispatch({ type: "SET_GAME_ROUND_PREFERENCES@OPERATIONS", payload: _operationsRoster })
        }
    }

    handleChange() {
        const { operationsRoster } = this.props;
        const { checked } = this.state;
        // There has to be at least one operation toggled
        if (operationsRoster.length === 1 && checked) {
            return
        }

        this.setState({ checked: !checked })
    }

    render() {
        const { label } = this.props;
        const { checked } = this.state;

        return (
            <>
                <label className={`toggle-99876 ${checked ? "--checked" : ""}`}>
                    <div className="toggle-98807">
                        <div className="toggle-93072--trackType">
                            <div className="toggle-98807-iconType check">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 405.272 405.272">
                                    <path d="M393.401 124.425 179.603 338.208c-15.832 15.835-41.514 15.835-57.361 0L11.878 227.836c-15.838-15.835-15.838-41.52 0-57.358 15.841-15.841 41.521-15.841 57.355-.006l81.698 81.699L336.037 67.064c15.841-15.841 41.523-15.829 57.358 0 15.835 15.838 15.835 41.514.006 57.361z"/>
                                </svg>
                            </div>
                            <div className="toggle-98807-iconType cross">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 348.333 348.334">
                                    <path d="M336.559 68.611 231.016 174.165l105.543 105.549c15.699 15.705 15.699 41.145 0 56.85-7.844 7.844-18.128 11.769-28.407 11.769-10.296 0-20.581-3.919-28.419-11.769L174.167 231.003 68.609 336.563c-7.843 7.844-18.128 11.769-28.416 11.769-10.285 0-20.563-3.919-28.413-11.769-15.699-15.698-15.699-41.139 0-56.85l105.54-105.549L11.774 68.611c-15.699-15.699-15.699-41.145 0-56.844 15.696-15.687 41.127-15.687 56.829 0l105.563 105.554L279.721 11.767c15.705-15.687 41.139-15.687 56.832 0 15.705 15.699 15.705 41.145.006 56.844z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="toggle-98807-thumbType"></div>
                        <input onChange={this.handleChange} checked={checked} className="toggle-98807--inputType" type="checkbox" />
                    </div>
                    <span className="toggle-98807--labelType">{label}</span>
                </label>
            </>
        )
    }
}

function operationToggleHooks(Component) {
    return (props) => {
        const operationsRoster = useSelector(state => state.gameState.gameRoundPreferences.operationsRoster);
        const dispatch = useDispatch();

        return <Component {...props} dispatch={dispatch} operationsRoster={operationsRoster} />
    }
}

class MiscellaneousOptionsToggle extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            active: this.props.miscellaneousOptions[this.props.option]
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    handleChange() {
        const {action, dispatch} = this.props;
        const { active } = this.state;
        dispatch({ type: action, payload: !active })
        this.setState({active: !active})

    }

    render() {
        const { label, option, miscellaneousOptions } = this.props;
        const { active } = this.state;
        return (
            <>
                <label className={`toggle-99876 ${miscellaneousOptions[option] ? "--checked" : ""}`}>
                    <div className="toggle-98807">
                        <div className="toggle-93072--trackType">
                            <div className="toggle-98807-iconType check">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 405.272 405.272">
                                    <path d="M393.401 124.425 179.603 338.208c-15.832 15.835-41.514 15.835-57.361 0L11.878 227.836c-15.838-15.835-15.838-41.52 0-57.358 15.841-15.841 41.521-15.841 57.355-.006l81.698 81.699L336.037 67.064c15.841-15.841 41.523-15.829 57.358 0 15.835 15.838 15.835 41.514.006 57.361z"/>
                                </svg>
                            </div>
                            <div className="toggle-98807-iconType cross">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 348.333 348.334">
                                    <path d="M336.559 68.611 231.016 174.165l105.543 105.549c15.699 15.705 15.699 41.145 0 56.85-7.844 7.844-18.128 11.769-28.407 11.769-10.296 0-20.581-3.919-28.419-11.769L174.167 231.003 68.609 336.563c-7.843 7.844-18.128 11.769-28.416 11.769-10.285 0-20.563-3.919-28.413-11.769-15.699-15.698-15.699-41.139 0-56.85l105.54-105.549L11.774 68.611c-15.699-15.699-15.699-41.145 0-56.844 15.696-15.687 41.127-15.687 56.829 0l105.563 105.554L279.721 11.767c15.705-15.687 41.139-15.687 56.832 0 15.705 15.699 15.705 41.145.006 56.844z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="toggle-98807-thumbType"></div>
                        <input onChange={this.handleChange} checked={miscellaneousOptions[option]} className="toggle-98807--inputType" type="checkbox" />
                    </div>
                    <span className="toggle-98807--labelType">{label}</span>
                </label>
            </>
        )
    }
}

function miscellaneousToggleHooks(Component) {
    return (props) => {
        const miscellaneousOptions = useSelector(state => state.gameState.gameRoundPreferences.miscellaneousOptions);
        const dispatch = useDispatch();

        return <Component {...props} dispatch={dispatch} miscellaneousOptions={miscellaneousOptions} />
    }
}

class CheckBox extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { placeValue, placeValueRoster } = this.props;
        if (placeValueRoster.indexOf(placeValue) >= 0) {
            this.setState({ active: true })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.active !== this.state.active) {
            const { placeValueRoster, placeValue, dispatch} = this.props;
            const { active } = this.state;
            let _placeValueRoster = [...placeValueRoster];

            if (placeValueRoster.indexOf(placeValue) === -1) {
                _placeValueRoster = [..._placeValueRoster, placeValue]
            }

            else if (placeValueRoster.indexOf(placeValue) >= 0 && !active) {
                const index = placeValueRoster.indexOf(placeValue);

                _placeValueRoster.splice(index, 1);
            }

            dispatch({ type: "SET_GAME_ROUND_PREFERENCES@PLACE_VALUE", payload: _placeValueRoster})
        }
    }

    handleChange() {
        const { active } = this.state;
        const {placeValueRoster} = this.props;

        if (placeValueRoster.length === 1 && active) {
            return
        }

        this.setState({active: !active})

    }

    render() {
        const { label } = this.props;
        const { active } = this.state;
        return (
            <>
                <label className={`checkbox-77814 ${active ? "--checked" : ""}`}>
                    <div className="checkbox-77814--wrapperType">
                        <div className="checkbox-77814--planeType">
                            <div className="checkbox-77814--iconType">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 405.272 405.272">
                                    <path d="M393.401 124.425 179.603 338.208c-15.832 15.835-41.514 15.835-57.361 0L11.878 227.836c-15.838-15.835-15.838-41.52 0-57.358 15.841-15.841 41.521-15.841 57.355-.006l81.698 81.699L336.037 67.064c15.841-15.841 41.523-15.829 57.358 0 15.835 15.838 15.835 41.514.006 57.361z"/>
                                </svg>
                            </div>
                        </div>
                        <input className="checkbox-77814--inputType" checked={active} type="checkbox" onChange={this.handleChange} />
                    </div>
                    <span className="checkbox-77814-labelType">{label}</span>
                </label>
            </>
        )
    }
}

function checkboxToggleHooks(Component) {
    return (props) => {
        const placeValueRoster = useSelector(state => state.gameState.gameRoundPreferences.digitCountRoster);
        const dispatch = useDispatch();

        return <Component {...props} placeValueRoster={placeValueRoster} dispatch={dispatch} />
    }
}

class DurationButton extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const { dispatch, seconds } = this.props;

        dispatch({type: "SET_GAME_ROUND_PREFERENCES@DURATION", payload: seconds})
    }

    render() {
        const { seconds, roundDurationInSeconds } = this.props;

        return (
            <>
                <button
                    className={`gameRoom-11719-buttonType ${seconds === roundDurationInSeconds ? "--active" : ""}`}
                    onClick={this.handleClick}
                >
                    <div className="gameRoom-99807--wrapperType">
                        <div className="gameRoom-18879--iconType">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 559.98 559.98">
                                <path d="M279.99 0C125.601 0 0 125.601 0 279.99c0 154.39 125.601 279.99 279.99 279.99 154.39 0 279.99-125.601 279.99-279.99S434.38 0 279.99 0zm0 498.78c-120.644 0-218.79-98.146-218.79-218.79 0-120.638 98.146-218.79 218.79-218.79s218.79 98.152 218.79 218.79c0 120.644-98.146 218.79-218.79 218.79z"/>
                                <path d="M304.226 280.326v-117.35c0-13.103-10.618-23.721-23.716-23.721-13.102 0-23.721 10.618-23.721 23.721v124.928c0 .373.092.723.11 1.096-.312 6.45 1.91 12.999 6.836 17.926l88.343 88.336c9.266 9.266 24.284 9.266 33.543 0 9.26-9.266 9.266-24.284 0-33.544l-81.395-81.392z"/>
                            </svg>
                        </div>
                        <p>{seconds} seconds</p>
                    </div>
                </button>
            </>
        )
    }
}

function durationButtonHooks(Component) {
    return (props) => {
        const roundDurationInSeconds = useSelector(state => state.gameState.gameRoundPreferences.durationInSeconds);
        const dispatch = useDispatch();

        return <Component {...props} dispatch={dispatch} roundDurationInSeconds={roundDurationInSeconds} />
    }
}

export const Toggles = {
    OperationToggle: operationToggleHooks(OperationToggle),
    MiscellaneousToggle: miscellaneousToggleHooks(MiscellaneousOptionsToggle),
    CheckBox: checkboxToggleHooks(CheckBox),
    DurationButton: durationButtonHooks(DurationButton)
}