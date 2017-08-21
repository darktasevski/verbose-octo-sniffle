// Build a digital clock with React that displays the current (west coast) time
// (non-military). Single digits must be padded and the actual time may only be
// requested once.

// root.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './clock.jsx';

class Root extends React.Component {
  render() {
    return(
      <div>
        <Clock />
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root/>, document.getElementById('main'));
});

// clock.jsx

import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {time: ''};
    this.updateTime = this.updateTime.bind(this);
  }

  componentWillMount() {
    this.getCurrentTime();
    this.timeInterval = setInterval(this.updateTime, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  getCurrentTime() {
    let dateObject = new Date;
    this.hours = dateObject.getHours();
    this.amPM = 'AM';
    if (this.hours > 12) {
      this.amPM = 'PM';
      this.hours -= 12;
    }
    this.minutes = dateObject.getMinutes();
    this.seconds = dateObject.getSeconds();
  }

  updateTime() {
    if (this.seconds < 59) {
      this.seconds += 1;
    } else {
        this.seconds = 0;
        if (this.minutes < 59) {
          this.minutes += 1;
        } else {
            this.minutes = 0;
            if (this.hours < 12) {
              this.hours += 1;
            } else {
              this.hours = 1;
              this.amPM = this.amPM === 'AM' ? 'PM' : 'AM';
            }
        }
    }
    this.setState({
      time: `${this.addPadding(this.hours)}:${this.addPadding(this.minutes)}` +
      `:${this.addPadding(this.seconds)} ${this.amPM}`
    });
  }

  addPadding(number) {
    if (number < 10) {
      return '0' + number;
    } else {
      return number;
    }
  }

  render() {
    return (
      <strong>{this.state.time}</strong>
    );
  }
}

export default Clock;
