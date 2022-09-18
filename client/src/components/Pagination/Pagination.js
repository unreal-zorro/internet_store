import './Pagination.scss'

function Pagination(props) {
  return (
    <div className="pagination">
      <button
        className="btn pagination__btn"
        onClick={props.onClickPrevButton}
      >Предыдущая</button>
      <div className="pagination__pages">
        Страница <span>{props.currentPage}</span> из <span>{props.pages}</span>
      </div>
      <button
        className="btn pagination__btn"
        onClick={props.onClickNextButton}
      >Следующая</button>
    </div>
  )
}

export default Pagination
