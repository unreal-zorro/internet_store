import '../Sidebar.scss'

import {NavLink} from "react-router-dom";

function SidebarLink(props) {
  return (
    <NavLink to={props.link} className="sidebar__link">
      {props.linkText}
    </NavLink>
  )
}

export default SidebarLink
