import '../Edit.scss'

function EditCard(props) {
  return (
    <div className="edit__card">
      <div className="edit-id"><span>{props.id}</span></div>
      <div className="edit-img"><img src={props.url} alt="img" /></div>
      <div className="edit-info">
        <div className="edit-name">{props.name}</div>
        <div className="edit-rating">Рейтинг: <span>{props.rating}</span></div>
        <div className="edit-descr">Описание: <span>{props.descr}</span></div>
      </div>
      <div className="edit-category">{props.category}</div>
      <div className="edit-count"><span>{props.amount}</span></div>
      <div className="edit-price"><span>{props.price}</span></div>
      <div className="edit-actions">
        <a href="#" className="edit-actions__link"><img src="/icons/edit.png" alt="edit" /></a>
        <a href="#" className="edit-actions__link"><img src="/icons/delete.png" alt="delete" /></a>
      </div>
    </div>
  )
}

export default EditCard
