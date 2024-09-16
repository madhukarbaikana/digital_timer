// Write your code here

import {Component} from 'react'
import './index.css'

const playIcon = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
const pauseIcon = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

const initialState = {
  timerLimitInMinutes: 25,
  timeElapsedInSeconds: 0,
  isTimerRunning: false,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => {
    clearInterval(this.intervalID)
  }

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      timeElapsedInSeconds,
    } = this.state

    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState(() => ({
        timeElapsedInSeconds: 0,
      }))
    }

    if (isTimerRunning) {
      this.clearTimeInterval()
    } else {
      this.intervalID = setInterval(this.increaseTimeElapsedInSeconds, 1000)
    }

    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  increaseTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state

    const isTimeCompleted = timerLimitInMinutes * 60 === timeElapsedInSeconds

    if (isTimeCompleted) {
      this.clearTimeInterval()
      this.setState(prevState => ({isTimerRunning: false}))
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  reset = () => {
    this.clearTimeInterval()
    this.setState(initialState)
  }

  stringifiedTimer = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    console.log(minutes)
    console.log(seconds)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes.toString()}:${stringifiedSeconds.toString()}`
  }

  render() {
    const {
      timerLimitInMinutes,
      timeElapsedInSeconds,
      isTimerRunning,
    } = this.state

    const labelText = isTimerRunning ? 'Pause' : 'Start'
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    const isButtonsDisabled = timeElapsedInSeconds > 0

    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-time-and-controls-container">
          <div className="time-container">
            <div className="time-display-container">
              <h1 className="timer-text">{this.stringifiedTimer()}</h1>
              <p className="status-text">
                {isTimerRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="controls-container">
            <div className="start-reset-container">
              <div className="button-container">
                <button
                  className="button"
                  onClick={this.onStartOrPauseTimer}
                  type="button"
                >
                  <img
                    src={startOrPauseImageUrl}
                    alt={startOrPauseAltText}
                    className="button-icons"
                  />
                  <p className="label-text">{labelText}</p>
                </button>
              </div>
              <div className="button-container">
                <button className="button" onClick={this.reset} type="button">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="button-icons"
                    alt="reset icon"
                  />
                  <p className="label-text">Reset</p>
                </button>
              </div>
            </div>
            <p className="limit-label">Set Timer Limit</p>
            <div className="increment-decrement-container">
              <button
                className="button"
                disabled={isButtonsDisabled}
                onClick={this.onDecreaseTimerLimitInMinutes}
                type="button"
              >
                -
              </button>
              <div>
                <p className="time-limit">{timerLimitInMinutes}</p>
              </div>
              <button
                className="button"
                disabled={isButtonsDisabled}
                onClick={this.onIncreaseTimerLimitInMinutes}
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
