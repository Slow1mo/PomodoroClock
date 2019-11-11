import React, { Component } from 'react';

export default class Controllers extends Component {


    render() {
        return (
            <div id = "container">
                <div id="session-controller">
                    <h1 id="session-label">Session Length</h1>
                    <button className="btn btn-primary" id="session-decrement" onClick={this.props.decrementWork}>-</button>
                    <h2 id="session-length">{`${Math.floor(this.props.work / 60)}`}</h2>
                    <button className="btn btn-primary" id="session-increment" onClick={this.props.incrementWork}>+</button>
                </div>

                <div id="break-controller">
                    <h1 id="break-label">Break Length</h1>
                    <button className="btn btn-primary" id="break-decrement" onClick={this.props.decrementBreak}>-</button>
                    <h2 id="break-length">{`${Math.floor(this.props.break / 60)}`}</h2>
                    <button className="btn btn-primary" id="break-increment" onClick={this.props.incrementBreak}>+</button>
                </div>
                
                <div>
                    <button className="btn btn-primary" id="start_stop" onClick={this.props.handleTimer}>{this.props.isRunning? "Stop" : "Start" }</button>
                    <button className="btn btn-primary" id="reset" onClick={this.props.resetTimer}>Reset</button>
                </div>
            </div>
        )
    }
}