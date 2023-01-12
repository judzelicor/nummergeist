export function generateRandomInteger(digitCount) {
    const placeValue = ["singles", "doubles", "triples"][digitCount - 1]

    const digitCountMap = {
        singles: {
            min: 1,
            max: 9
        },
        doubles: {
            min: 10,
            max: 99
        },
        triples: {
            min: 100,
            max: 999
        }
    }

    return Math.floor(Math.random() * (digitCountMap[placeValue].max - digitCountMap[placeValue].min) + digitCountMap[placeValue].min)
}

export class ArithmeticQuestion {
    constructor(alphaTerm, betaTerm, operation, category) {
        this._alphaTerm = generateRandomInteger(alphaTerm);
        this._betaTerm = generateRandomInteger(betaTerm);
        this._operation = operation - 1;
        this._category = category;
        this.operationsMap = ["+", "-", "*", "/"]
    }

    evaluate() {
        return `${eval(`${this._alphaTerm} ${this.operationsMap[this._operation]} ${this._betaTerm}`)}`
    }

    displayEquation() {
        return (
            <>
                <div className="gameObject-76512--wrapperType">
                    <p className="gameEntity-76512--textType">{this._alphaTerm}</p>
                    <p className="gameEntity-76512--textType" data-operation={`${this.operationsMap.slice(this._operation, 1)}`}>{this.operationsMap[this._operation]}</p>
                    <p className="gameEntity-76512--textType">{this._betaTerm}</p>
                    <p className="gameEntity-76512--textType equalSign">=</p>
                </div>
            </>
        )
    }
}

