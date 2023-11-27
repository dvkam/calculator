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
      <>
      <h1 className="text-center text-4xl mt-5">Calculator</h1>
      <div className="flex justify-center items-center m-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className="border m-2 text-xl"
            placeholder="First input"
            value={this.state.a || ""}
            onChange={(e) => this.handleInputChange(e, 'a')}
          />
          <input
            className="border m-2 text-xl"
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
                  className="border w-6 m-2 bg-green-700 hover:bg-green-500 text-black text-xl active:bg-yellow-600 focus:bg-yellow-300"
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
            className="border w-6 m-2 text-xl bg-sky-500 hover:bg-sky-300 text-black active:bg-yellow-600 focus:bg-yellow-300"
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
                  className="border w-6 m-2 bg-red-700 hover:bg-red-500 text-xl text-black active:bg-yellow-600 focus:bg-yellow-300"
                  onClick={() => {
                    const newState = { ...this.state };
                    newState.a = null;
                    newState.b = null;
                    newState.writeTo = "a";
                    newState.result = null;
                    this.setState(newState);
                  }}
                >
                  C
                </button>
              </div>
            </div>
            <div>
              <div>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((input) => {
                  return (
                    <button
                    className="border w-6 m-2 bg-sky-500 hover:bg-sky-300 text-2xl text-black active:bg-yellow-600 focus:bg-yellow-300"
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
              className="border m-2 text-2xl"
              readOnly
              placeholder="Result"
              value={this.state.result || ""}
            />
          </div>
        </form>
      </div>
      </>
    );
  }
}

export default Calc;
