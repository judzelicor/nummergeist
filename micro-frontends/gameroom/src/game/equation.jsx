export class Equation {
    /*
    * @expression: An array containing the terms and operations that constitute the equation to be initialized.
    * */
    constructor(expression) {
        this._expression = expression;
        this._firstTerm = expression[0]
        this._secondTerm = expression[2]
        this._operation = expression[1]
        this._solution = eval(this._expression.join(""))

    }

    getSolution() {
        return this._solution;
    }

    displayEquation() {
        return (
            <>
                <div className="gameEntity-equationType">
                    <p className="gameEntity-termType">{ this._firstTerm }</p>
                    <p className="gameEntity-operationType">{ this._operation }</p>
                    <p className="gameEntity-termType">{ this._secondTerm }</p>
                </div>
            </>
        )
    }
}