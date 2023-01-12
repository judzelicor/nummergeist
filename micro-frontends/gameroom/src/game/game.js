import { Equation } from "./equation";

class Game {
    constructor() {
        this._solutionsHistory = [];
        this._equationsHistory = [];
        this._score = 0;
        this._entropyConstant = 7;
    }

    getScore() {
        return this._score;
    }

    incrementScore() {
        this._score += 1;
    }

    setNewSolution(solution) {
        if (this._solutionsHistory.length < this._entropyConstant) {
            this._solutionsHistory.push(solution);
        } else {
            this._solutionsHistory.shift();
            this._solutionsHistory.push(solution);
        }
    }

    getSolutionsHistory() {
        return this._solutionsHistory;
    }

    appendNewEquationToHistory(expression) {
        const equation = new Equation(expression)
        let _equationHistory = this._equationsHistory;
        _equationHistory = [equation, ..._equationHistory];
        this._equationsHistory = _equationHistory;
    }

    getEquationsHistory() {
        return this._equationsHistory;
    }

    generateEquation(numberOfTerms, operationsRoster, digitCountOptions, roundOptions) {
        /*
        * @numberOfTerms: An number to signify the amount of terms in the equation and by extension, the number of integers to generate.
        * @operationsRoster: An array containing the operations that will appear in the equation. It's length must at least be one.
        * @digitCount: An array containing the digit count for each term.
        * */
        let solution;
        let equation;
        let keepGeneratingNewExpression = true;

        while (keepGeneratingNewExpression) {
            equation = this.generateExpression(numberOfTerms, operationsRoster, digitCountOptions, roundOptions);
            solution = eval(equation.join(""));

            if (!(game.getSolutionsHistory().includes(solution))) {
                keepGeneratingNewExpression = false;
            }
        }

        this.setNewSolution(solution);
        return equation;
    }

    generateExpression(numberOfTerms, operationsRoster, digitCountOptions, roundOptions) {
        let expression = [];
        let solution;

        console.log(digitCountOptions)
        for (let stepCount = 0; stepCount < numberOfTerms; stepCount++) {
            const digitCount = this.chooseDigitCount(digitCountOptions);
            const integer = this.generateInteger(digitCount);
            expression.push(integer);

            if (stepCount % 2 === 0) {
                const operation = this.chooseOperation(operationsRoster);
                expression.push(operation);

            }

        }

        solution = eval(expression.join(""));

        if (solution < 0 && !roundOptions.negativeNumbers) {
            expression[0] = expression[2];
            expression[2] = solution * -1;
        }

        return expression;
    }

    generateInteger(digitCount) {
        const digitCountMap = {
            ones: {
                min: 0,
                max: 9
            },
            tens: {
                min: 10,
                max: 99
            },
            hundreds: {
                min: 100,
                max: 999
            }

        }

        const min = Math.ceil(digitCountMap[digitCount].min);
        const max = Math.floor(digitCountMap[digitCount].max);
        const integer = Math.floor(Math.random() * (max - min + 1) + min);

        return integer;
    }

    chooseOperation(operationsRoster) {
        const operationsMap = {
            addition: "+",
            subtraction: "-",
            multiplication: "*",
            division: "/"
        }

        const min = 0;
        const max = operationsRoster.length - 1;
        const index = Math.floor(Math.random() * (max-min + 1) + min);
        return operationsMap[operationsRoster[index]];
    }

    chooseDigitCount(digitCountOptions) {
        // Temporary
        const min = 0;
        const max = digitCountOptions.length - 1;
        const index = Math.floor(Math.random() * (max-min + 1) + min);
        return digitCountOptions[index];
    }

    restartGame() {
        this._solutionsHistory = [];
        this._equationsHistory = [];
        this._score = 0;
    }
}

const game = new Game();

export default game;