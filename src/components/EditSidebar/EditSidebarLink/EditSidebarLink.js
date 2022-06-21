import '../../Sidebar/Sidebar.scss'

function EditSidebarLink(props) {
  return (
    <div
      className={"sidebar__link " + props.className}
      onClick={props.onClick}
    >
      {props.text}
      <img src={props.url} alt={props.alt} />
    </div>
  )
}

export default EditSidebarLink
