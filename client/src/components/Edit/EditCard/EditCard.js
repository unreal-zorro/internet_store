import '../Edit.scss'

import {Link} from "react-router-dom";

function EditCard(props) {
  return (
    <div className="edit__card">
      <div className="edit-id">
        <span>{props.id}</span>
      </div>
      <div className="edit-img">
        <Link to={"/catalog/" + props.categoryTitle + "/" + props.id}>
          <img src={props.url} alt="img" />
        </Link>
      </div>
      <div className="edit-info">
        <Link to={"/catalog/" + props.categoryTitle + "/" + props.id}>
          <div className="edit-name">
            {props.name}
          </div>
        </Link>
        <div className="edit-rating">
          Рейтинг: <span>{props.rating}</span>
        </div>
        <div className="edit-descr">
          Описание: <span>{props.descr}</span>
        </div>
      </div>
      <div className="edit-category">
        {props.category}
      </div>
      <div className="edit-count">
        <span>{props.amount}</span>
      </div>
      <div className="edit-price">
        <span>{props.price}</span>
      </div>
      <div className="edit-actions">
        <div
          className="edit-actions__link"
          onClick={props.onEditClick}
        >
          <img src="/icons/edit.png" alt="edit" />
        </div>
        <div
          className="edit-actions__link"
          onClick={props.onDeleteClick}
        >
          <img src="/icons/delete.png" alt="delete" />
        </div>
      </div>
    </div>
  )
}

export default EditCard
