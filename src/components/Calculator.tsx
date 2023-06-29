import React from "react";
import { Grid } from "@nodeme/grid-react";
import {
  ITheme,
  IDefinitions,
  IProps as IPropsWithClasses,
  withClasses,
} from "@nodeme/jss-react";

import { Form, Number } from "@nodeme/forms-react";
import Button from "@nodeme/forms-react/lib/Components/Button";

const styles = (theme: ITheme) => (definition: IDefinitions) => ({
  headline: {
    color: theme.palette.get("primary"),
  },
  op: {
    padding: "16px",
  },
});

export interface IProps {}
export interface IState {
  a: number | null;
  b: number | null;
  result: number | null;
  writeTo: "a" | "b";
  operator: "+" | "-" | "/" | "*" | null;
  addCommaTo: "a" | "b" | null;
}

class Calc extends React.Component<IPropsWithClasses<IProps>, IState> {
  state: IState = {
    a: null,
    b: null,
    result: null,
    writeTo: "a",
    addCommaTo: null,
    operator: null,
  };
  constructor(props: IPropsWithClasses<IProps>) {
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
    const { classes } = this.props;
    return (
      <div>
        <h1 className={classes.headline}>Rechner</h1>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          spacing={16}
        >
          <Number
            item
            inline
            label="First Number"
            xs={2}
            value={this.state.a || undefined}
            onChange={(value) => {
              this.setState({ ...this.state, a: value || null });
            }}
          />
          <Number
            item
            inline
            label="Second Number"
            xs={4}
            value={this.state.b || undefined}
            onChange={(value) => {
              this.setState({ ...this.state, b: value || null });
            }}
          />
          <Grid item xs="50">
            <div className={classes.op}>{this.state.operator}</div>
          </Grid>
          <Grid spacing={16}>
            {["+", "-", "/", "*"].map((ops) => {
              return (
                <Button
                  item
                  xs="50px"
                  primary
                  onClick={() => {
                    this.setOperator(ops);
                  }}
                >
                  {ops}
                </Button>
              );
            })}
          </Grid>
          <Button
            item
            xs="50px"
            primary
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
          </Button>
          <Grid spacing={16} vertical root={{ top: 0, bottom: 0 }}>
            <Grid item xs={"50px"}>
              <Grid
                spacing={16}
                root={{ top: 0, left: 0, right: 0, bottom: 0 }}
                vertical
              >
                <Button
                  onClick={(event) => {
                    const newState = { ...this.state };
                    newState.a = null;
                    newState.b = null;
                    newState.result = null;
                    this.setState(newState);
                  }}
                  item
                  xs="50px"
                  danger
                >
                  C
                </Button>
                <Button item xs="50px" primary>
                  ,
                </Button>
                <Button item xs="50px" primary>
                  0
                </Button>
              </Grid>
            </Grid>
            <Grid item xs="198px">
              <Grid
                spacing={16}
                vertical
                root={{ top: 0, bottom: 0, left: 0, right: 0 }}
              >
                {[9, 8, 7, 6, 5, 4, 3, 2, 1].map((number) => {
                  return (
                    <Button
                      onClick={(event) => {
                        this.onChange(number);
                      }}
                      item
                      xs="50px"
                      success
                    >
                      {number}
                    </Button>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
          <Grid spacing={16} justify="flex-end">
            <Number
              item
              inline
              label="Ergebnis"
              xs={5}
              value={this.state.result || undefined}
            />
          </Grid>
        </Form>
      </div>
    );
  }
}

export default withClasses(styles, Calc);
