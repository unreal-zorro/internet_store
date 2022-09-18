import './Description.scss'

function Description(props) {
  return (
    <div className="description">
      <div className="description__img"><img src={props.url} alt="img" /></div>
      <div className="description__info">
        <div className="description__name">Название: <span>{props.name}</span></div>
        <div className="description__id">ID: <span>{props.id}</span></div>
        <div className="description__descr">Описание: <span>{props.descr}</span></div>
        <div className="description__rating">Рейтинг: <span>{props.rating}</span></div>
        <div className="description__price">Цена: <span>{props.price} руб.</span></div>
      </div>
      <div className="description__add">
        <label htmlFor="amount" className="description__label">Количество:</label>
        <input
          className="description__input"
          id="count"
          type="number"
          min="1"
          defaultValue={props.count}
          onChange={props.inputCountChangeHandler}
        />
        <div className="description__text">
          шт.
        </div>
        <button
          className="btn description__btn"
          onClick={props.addToCartClickHandler}
        >В корзину</button>
      </div>
    </div>
  )
}

export default Description
