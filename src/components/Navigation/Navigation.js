import './Navigation.scss'

function Navigation(props) {
  return (
    <div className="navigation">
      {props.children}
    </div>
  )
}

export default Navigation
