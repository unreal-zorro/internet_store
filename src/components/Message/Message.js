import './Message.scss'

import {Component} from "react";

import mainStore from "../../redux/mainStore";
import {addMessage} from "../../redux/mainSlice";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }

  componentDidMount() {
    this.setState(prev => ({
      ...prev,
      message: mainStore.getState().main.message
    }))

    setTimeout(() => {
      mainStore.dispatch(addMessage(''))
    }, 3000)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.message !== mainStore.getState().main.message) {
      this.setState(prev => ({
        ...prev,
        message: mainStore.getState().main.message
      }))

      setTimeout(() => {
        mainStore.dispatch(addMessage(''))
      }, 3000)
    }
  }

  render() {
    return (
      <div
        className={"message " + (this.state.message ? "active" : "")}
      >{this.state.message}</div>
    )
  }
}

export default Message
