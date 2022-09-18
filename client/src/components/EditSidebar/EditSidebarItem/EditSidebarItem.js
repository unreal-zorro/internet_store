import '../../Sidebar/Sidebar.scss'

function EditSidebarItem(props) {
  return (
    <li className="sidebar__item">
      {props.children}
    </li>
  )
}

export default EditSidebarItem
