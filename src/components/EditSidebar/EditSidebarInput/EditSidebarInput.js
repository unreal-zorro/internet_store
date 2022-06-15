import '../../Sidebar/Sidebar.scss'

function EditSidebarInput(props) {
  return (
    <input type="text" className="sidebar__edit-input" defaultValue={props.value} />
  )
}

export default EditSidebarInput
