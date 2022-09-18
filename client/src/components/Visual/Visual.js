import './Visual.scss'

function Visual(props) {
  return (
    <div
      className={"visual " + props.className}
    >
      {props.children}
    </div>
  )
}

export default Visual
