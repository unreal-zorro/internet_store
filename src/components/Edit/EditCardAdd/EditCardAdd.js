import '../Edit.scss'

function EditCardAdd(props) {
  return (
    <div className="edit__card">
      <div className="edit-add">
        <div
          className="edit-add__link"
          onClick={props.onClick}
        >
          <img src="/icons/add.png" alt="add" />
        </div>
      </div>
    </div>
  )
}

export default EditCardAdd
