import React from "react";
import "./App.css";
import Timer from "./components/Timer";
import Controllers from "./components/Controllers";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRunning: false,
      isPaused: false,
      breakRunning: false,
      startPause: "Start",
      work: 1500,
      breakClock: 300,
      workLeft: 1500,
      breakLeft: 300,
      cycle: 'Session'
    };
  }

  incrementWork = () => {
    // increment work by 1 and update this.state.work based on work
    if (!this.state.isRunning && this.state.work < 3600) {
      this.setState({
        work: this.state.work + 60,
        workLeft: this.state.work + 60
      });
    }
  };

  decrementWork = () => {
    // decrease work by 1 and update this.state.work based on work
    if (this.state.work > 60 && !this.state.isRunning) {
      this.setState({
        work: this.state.work - 60,
        workLeft: this.state.workLeft - 60
      });
    }
  };

  incrementBreak = () => {
    // increment breakClock by 1 and update this.state.breakClock based on work
    if (!this.state.isRunning && this.state.breakClock < 3600) {
      this.setState({
        breakClock: this.state.breakClock + 60,
        breakLeft: this.state.breakLeft + 60
      });
    }
  };

  decrementBreak = () => {
    // decrease breakClock by 1 and update this.state.breakClock based on work
    if (this.state.breakClock > 60 && !this.state.isRunning) {
      this.setState({ breakClock: this.state.breakClock - 60,
        breakLeft: this.state.breakLeft - 60 });
    }
  };

  stopTimer = timer => {
    clearInterval(timer);
    timer = null;
  };

  startTimer = () => {
    
    this.timer = setInterval(() => {
      if (this.state.workLeft <= 0) {
        this.stopTimer(this.timer); 
        this.setState({workLeft: this.state.work,
        cycle: 'Break'})
        this.startBreak();
        return;
      }
      this.setState(prevState => ({ workLeft: prevState.workLeft - 1 }));
    }, 1000);

    this.setState({
      isRunning: true,
      breakRunning: false,
      isPaused: false,
    }); 
  };

  startBreak = () => {
   console.log('break activated');
    this.breakTimer = setInterval(() => {
      if (this.state.breakLeft <= 0) {
        this.stopTimer(this.timer);
        this.setState({breakLeft: this.state.breakClock,
        cycle: 'Session'})
        this.startTimer();
        return;
      }
      this.setState(prevState => ({ breakLeft: prevState.breakLeft - 1 }));
    }, 1000);

  this.setState({
      isRunning: false,
      breakRunning: true,
      isPaused: false,
    }); 
  };

  pauseTimer = () => {
    if (!this.state.isRunning) {
      return;
    }
    this.setState({
      isPaused: true,
      isRunning: false,
      breakRunning: false
    });
    this.stopTimer(this.timer);
  };

  resetTimer = () => {
    this.pauseTimer();
    this.alarm.pause()
    this.alarm.currentTime = 0
    
    this.setState({
      isRunning: false,
      isPaused: false,
      breakRunning: false,
      startPause: "Start",
      work: 1500,
      breakClock: 300,
      workLeft: 1500,
      breakLeft: 300,
      cycle: 'Session'
    });
  };

  handleTimer = () => {
    if (this.state.isRunning) {
      this.pauseTimer();
      return;
    }
   if(this.state.cycle === 'Session') {
      this.startTimer();
    }else if(this.state.cycle === 'Break'){
      this.startBreak();
    }
  
    
  };


  render() {
    const { breakRunning, workLeft, breakLeft } = this.state;

    return (
      <div className="App">
        <h1>Pomodoro Clock</h1>
        <p>by Slow1mo</p>
        <Timer
          clock={breakRunning ? breakLeft : workLeft}
          cycle={this.state.cycle}
        />
        
        <Controllers
          work={this.state.work}
          break={this.state.breakClock}
          workLeft={this.state.workLeft}
          breakLeft={this.state.breakLeft}
          isRunning={this.state.isRunning}
          startTimer={this.startTimer}
          pauseTimer={this.pauseTimer}
          resetTimer={this.resetTimer}
          handleTimer={this.handleTimer}
          startPause={this.state.startPause}
          incrementWork={this.incrementWork}
          decrementWork={this.decrementWork}
          incrementBreak={this.incrementBreak}
          decrementBreak={this.decrementBreak}
        />

         <audio id="beep" preload="auto" 
          src="http://dight310.byu.edu/media/audio/FreeLoops.com/1/1/Alarm%20Clock.wav-19830-Free-Loops.com.mp3"
          ref={ref => this.alarm = ref} />
      </div>
    );
  }
}

export default App;
