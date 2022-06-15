import '../Edit.scss'

function EditCards(props) {
  return (
    <div className="edit__cards">
      <div className="edit__header">
        <div className="edit__header_id">ID</div>
        <div className="edit__header_img">Фото</div>
        <div className="edit__header_info">Название</div>
        <div className="edit__header_category">Категория</div>
        <div className="edit__header_count">Кол-во, шт.</div>
        <div className="edit__header_price">Цена, руб.</div>
        <div className="edit__header_actions">Действия</div>
      </div>

      {props.children}
    </div>
  )
}

export default EditCards
