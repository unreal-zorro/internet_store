import './Message.scss'

import {Component} from "react";
import mainStore from "../../redux/mainStore";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: mainStore.getState().main.message
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (mainStore.getState().main.message !== "") {
      this.setState(prev => ({
        ...prev,
        message: mainStore.getState().main.message
      }))

      console.log("message state: ", this.state.message)

      setTimeout(() => {
        this.setState(prev => ({
          ...prev,
          message: ""
        }))
      }, 3000)
    }
  }

  render() {
    return (
      <div
        className={"message " + this.state.message ? "active" : ""}
      >{this.state.message}</div>
    )
  }
}

export default Message
