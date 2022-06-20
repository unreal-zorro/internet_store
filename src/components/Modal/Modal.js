import './Modal.scss'

function Modal(props) {
  return (
    <div className={"modal " + props.className}>
      {props.children}
    </div>
  )
}

export default Modal
