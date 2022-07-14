import './Message.scss'

import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {addMessage} from "../../redux/mainSlice";

//
// import {Component} from "react";
//
// import mainStore from "../../redux/mainStore";
// import {addMessage} from "../../redux/mainSlice";
//
// class Message extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       message: ''
//     }
//   }
//
//   componentDidMount() {
//     this.setState(prev => ({
//       ...prev,
//       message: mainStore.getState().main.message
//     }))
//
//     setTimeout(() => {
//       mainStore.dispatch(addMessage(''))
//     }, 3000)
//   }
//
//   componentDidUpdate(prevProps, prevState, snapshot) {
//     if (this.state.message !== mainStore.getState().main.message) {
//       this.setState(prev => ({
//         ...prev,
//         message: mainStore.getState().main.message
//       }))
//
//       setTimeout(() => {
//         mainStore.dispatch(addMessage(''))
//       }, 3000)
//     }
//   }
//
//   render() {
//     return (
//       <div
//         className={"message " + (this.state.message ? "active" : "")}
//       >{this.state.message}</div>
//     )
//   }
// }
//
// export default Message

function Message() {
  const message = useSelector(state => state.main.message)

  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => dispatch(addMessage('')), 3000)
  });

  return (
    <div
      className={"message " + (message ? "active" : "")}
    >{message}</div>
  )
}

export default Message
