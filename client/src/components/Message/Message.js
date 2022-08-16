import './Message.scss'

import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {addMessage} from "../../redux/mainSlice";

function Message() {
  const message = useSelector(state => state.main.message)

  const dispatch = useDispatch()

  useEffect(() => {
    if (message) {
      setTimeout(() => dispatch(addMessage('')), 3000)
    }
  }, [dispatch, message]);

  return (
    <div
      className={"message " + (message ? "active" : "")}
    >{ message }</div>
  )
}

export default Message
