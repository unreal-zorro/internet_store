import '../../Sidebar/Sidebar.scss'

function EditSidebarLinkEdit(props) {
  return (
    <div
      className={"sidebar__edit-link"}
      onClick={props.onClick}
    >
      {props.text}
      <img src={props.url} alt={props.alt} />
    </div>
  )
}

export default EditSidebarLinkEdit
