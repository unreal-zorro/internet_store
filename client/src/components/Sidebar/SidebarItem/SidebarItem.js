import '../Sidebar.scss'

function SidebarItem(props) {
  return (
    <li className="sidebar__item">
      {props.children}
    </li>
  )
}

export default SidebarItem
