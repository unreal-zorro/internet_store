import '../Sidebar/Sidebar.scss'

function EditSidebar(props) {
  return (
    <div className="sidebar active">
      <ul className="sidebar__content">
        {props.children}
      </ul>
    </div>
  )
}

export default EditSidebar
