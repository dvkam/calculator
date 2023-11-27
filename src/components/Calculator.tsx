import React from "react";

export interface IProps {}
export interface IState {
  a: number | null;
  b: number | null;
  result: number | null;
  writeTo: "a" | "b";
  operator: "+" | "-" | "/" | "*" | null;
  addCommaTo: "a" | "b" | null;
}

class Calc extends React.Component<IProps, IState> {
  state: IState = {
    a: null,
    b: null,
    result: null,
    writeTo: "a",
    addCommaTo: null,
    operator: null,
  };
  constructor(props: IProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value: number | null) {
    const { writeTo } = this.state;
    const currentValue = this.state[writeTo];
    if (currentValue !== null && value !== null) {
      this.setState({
        ...this.state,
        [writeTo]: currentValue * 10 + value,
      });
    } else this.setState({ ...this.state, [writeTo]: value });
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>, field: keyof IState) {
    const value = parseInt(event.target.value);
    this.setState({ ...this.state, [field]: isNaN(value) ? null : value });
  }

  setOperator(operator: string | null) {
    if (
      this.state.a !== null &&
      (operator === "+" ||
        operator === "-" ||
        operator === "*" ||
        operator === "/" ||
        operator === null)
    )
      this.setState({ ...this.state, operator, writeTo: "b" });
  }

  render() {
    return (
      <div className="">
        <h1 className="">Rechner</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            placeholder="First input"
            value={this.state.a || ""}
            onChange={(e) => this.handleInputChange(e, 'a')}
          />
          <input
            placeholder="Second input"
            value={this.state.b || ""}
            onChange={(e) => this.handleInputChange(e, 'b')}
          />
          <div>
            <div>{this.state.operator}</div>
          </div>
          <div>
            {["+", "-", "/", "*"].map((ops) => {
              return (
                <button
                  key={ops}
                  onClick={() => {
                    this.setOperator(ops);
                  }}
                >
                  {ops}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => {
              const { a, b, operator } = this.state;
              if (a !== null && b !== null)
                switch (operator) {
                  case "+":
                    this.setState({ ...this.state, result: a + b });
                    break;
                  case "-":
                    this.setState({ ...this.state, result: a - b });
                    break;
                  case "*":
                    this.setState({ ...this.state, result: a * b });
                    break;
                  case "/":
                    this.setState({ ...this.state, result: a / b });
                    break;
                  default:
                    break;
                }
            }}
          >
            =
          </button>
          <div>
            <div>
              <div>
                <button
                  onClick={() => {
                    const newState = { ...this.state };
                    newState.a = null;
                    newState.b = null;
                    newState.result = null;
                    this.setState(newState);
                  }}
                >
                  C
                </button>
                <button>
                  ,
                </button>
                <button>
                  0
                </button>
              </div>
            </div>
            <div>
              <div>
                {[9, 8, 7, 6, 5, 4, 3, 2, 1].map((input) => {
                  return (
                    <button
                      key={input}
                      onClick={() => {
                        this.onChange(input);
                      }}
                      >
                      {input}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <input
              readOnly
              placeholder="Result"
              value={this.state.result || ""}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Calc;
