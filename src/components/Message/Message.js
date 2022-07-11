import './Message.scss'

import {useEffect} from "react";

function Message(props) {
  useEffect(() => {
    let message = ''
     if (props.text) {
       message = props.text
       setTimeout(() => message = '', 3000)
     }
  })

  return (
    <div className="message active">{message}</div>
  )
}

export default Message
