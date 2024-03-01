import { Reducer } from "react";

export function delaySeconds(s: number) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

export function reducerLogger<S, A>(reducer: Reducer<S, A>): Reducer<S, A> {
  return (state: S, action: A): S => {
    if (import.meta.env.MODE === "production") {
      return reducer(state, action);
    } else {
      /* eslint-disable no-console */
      console.log(
        "%cPrevious State:",
        "color: #9E9E9E; font-weight: 700;",
        state,
      );
      console.log("%cAction:", "color: #00A7F7; font-weight: 700;", action);
      const nextState = reducer(state, action);
      console.log(
        "%cNext State:",
        "color: #47B04B; font-weight: 700;",
        nextState,
      );
      /* eslint-enable no-console */
      return nextState;
    }
  };
}
