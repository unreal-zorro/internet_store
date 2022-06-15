import '../Navbar.scss'

function Burger(props) {
  return (
    <div
      className={"navbar__burger " + props.className}
      onClick={props.onClick}
    >
      <div className="navbar__burger-item"></div>
      <div className="navbar__burger-item"></div>
      <div className="navbar__burger-item"></div>
    </div>
  )
}

export default Burger
