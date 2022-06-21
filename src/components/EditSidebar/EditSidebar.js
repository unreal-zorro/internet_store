import '../Sidebar/Sidebar.scss'

function EditSidebar(props) {
  return (
    <div className={"sidebar " + props.className}>
      <ul className="sidebar__content">
        {props.children}
      </ul>
    </div>
  )
}

export default EditSidebar
