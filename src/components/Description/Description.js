import './Description.scss'

import {useDispatch, useSelector} from "react-redux";

import {cartAddNewCount, cartAddNewGood} from "../../redux/mainSlice";

function Description(props) {
  const cart = useSelector(state => state.main.cart)
  const dispatch = useDispatch()

  let count = 1

  function inputChangeHandler(value) {
    count = +value.target.value
  }

  function clickHandler() {
    if (count < 1) {
      return
    }

    let goodIndex = 0

    const good = cart.find((item, index) => {
      if (item.id === props.id) {
        goodIndex = index
        return item
      } else {
        return undefined
      }
    })

    if (good) {
      const newCount = good.count + count
      const goodWithNewCount = {
        ...good,
        count: newCount
      }
      dispatch(cartAddNewCount({goodIndex, goodWithNewCount}))
    } else {
      const newGood = {
        categoryId: props.categoryId,
        id: props.id,
        count: count
      }
      dispatch(cartAddNewGood({newGood}))
    }
  }

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
          defaultValue={count}
          onChange={inputChangeHandler}
        />
        <div className="description__text">
          шт.
        </div>
        <button
          className="btn description__btn"
          onClick={clickHandler}
        >В корзину</button>
      </div>
    </div>
  )
}

export default Description
