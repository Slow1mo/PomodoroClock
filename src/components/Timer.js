import React, { Component } from "react";
export default class Timer extends Component {
  calculateTime = clock => {
    if (clock < 600) {
      return `0${Math.floor(clock / 60)}:${
        clock % 60 > 9 ? "" + (clock % 60) : "0" + (clock % 60)
      }`;
    } else {
      return `${Math.floor(clock / 60)}:${
        clock % 60 > 9 ? "" + (clock % 60) : "0" + (clock % 60)
      }`;
    }
  };

  render() {
    return (
      <>
        <div className="timer" id="timer-label">
          <h1>{this.props.cycle}</h1>
          <h2 className="count-down" id="time-left">
            {this.calculateTime(this.props.clock)}
          </h2>
        </div>
      </>
    );
  }
}
