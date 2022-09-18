import './Sidebar.scss'

function Sidebar(props) {
  return (
    <div
      className={"sidebar " + props.className}
      id="sidebar"
    >
      <ul className="sidebar__content">
        {props.children}
      </ul>
    </div>
  )
}

export default Sidebar
