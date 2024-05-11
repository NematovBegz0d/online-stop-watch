import { Component } from "react";

class App extends Component {
  state = {
    second: 0,
    minute: 0,
    hour: 0,
    btnDisabled: false,
    interval: "",
    intervalsStorage: []
  };

  start = () => {
    const timer = setInterval(() => {
      const { second, minute, hour } = this.state;
      this.setState({
        btnDisabled: true,
      });
      if (second === 59) {
        if (minute === 59) {
          this.setState({
            hour: hour + 1,
            minute: 0,
          });
        } else {
          this.setState({
            second: 0,
            minute: minute + 1,
          });
        }
      } else {
        this.setState({
          second: second + 1,
        });
      }
    }, 1000);
    this.setState({
      interval: timer
    })
  };

  stop = () => {
    clearInterval(this.state.interval)
    this.setState({
      btnDisabled: false
    })
 }

  interval = () => {
    const { second, minute, hour, intervalsStorage } = this.state;
    this.state.intervalsStorage.push(`${hour}:${minute}:${second}`)
    this.setState({
      intervalsStorage,
    })
  }

  clear = () => {
    this.stop();
    this.setState({
      second: 0,
      minute: 0,
      hour: 0,
      intervalsStorage: [],
    });
  };

  render() {
    const { second, minute, hour, btnDisabled, intervalsStorage } = this.state;
    return (
      <div>
        <div className="timer-container">
          <h1 className="mb-4">Online Stop watch </h1>
          <div className="timer-col">
            <h3 className="timer-hours">{hour}</h3>
            <p className="timer-label">Hours</p>
          </div>

          <div className="timer-col">
            <h3 className="timer-minuts">{minute}</h3>
            <p className="timer-label">Minuts</p>
          </div>

          <div className="timer-col">
            <h3 className="timer-seconds">{second}</h3>
            <p className="timer-label">Seconds</p>
          </div>
        </div>
        <div className="timer-container text-center">
          <div className="timer-btn">
            <button
              className="btn btn-success"
              onClick={this.start}
              disabled={btnDisabled}
            >
              Start
            </button>
          </div>
          <div className="timer-btn">
            <button className="btn btn-danger" onClick={this.stop}>
              Stop
            </button>
          </div>
          <div className="timer-btn">
            <button
              className="btn btn-secondary"
              onClick={this.interval}
              disabled={!btnDisabled}
            >
              Interval
            </button>
          </div>
          <div className="timer-btn">
            <button className="btn btn-warning" onClick={this.clear}>
              Clear
            </button>
          </div>
        </div>
        <div className="timer-container-intervals text-center">
          {intervalsStorage.map((item, index) => (
            <p>
              {index + 1} ** {item}
            </p>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
