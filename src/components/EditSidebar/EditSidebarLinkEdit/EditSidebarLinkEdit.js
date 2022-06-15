import '../../Sidebar/Sidebar.scss'

import {Link} from "react-router-dom";

function EditSidebarLinkEdit(props) {
  return (
    <Link to={props.link} className={"sidebar__edit-link " + props.className}>
      {props.linkText}
      <img src={props.url} alt={props.alt} />
    </Link>
  )
}

export default EditSidebarLinkEdit
