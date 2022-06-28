import '../Edit.scss'

import {Link} from "react-router-dom";

function EditCardAdd() {
  return (
    <div className="edit__card">
      <div className="edit-add">
        <Link to="#edit__menu" className="edit-add__link">
          <img src="/icons/add.png" alt="add" />
        </Link>
      </div>
    </div>
  )
}

export default EditCardAdd
