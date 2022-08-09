import './Sort.scss'

function Sort(props) {
  return (
    <div className="sort">
      <label htmlFor="sort" className="sort__label">Сортировать по:</label>
      <select
        name="sort"
        id="sort"
        className="sort__select"
        defaultValue={props.value}
        onChange={props.onChange}
      >
        <option value="price-incr" className="sort__item">возрастанию цены</option>
        <option value="price-decr" className="sort__item">убыванию цены</option>
        <option value="name" className="sort__item">названию</option>
        <option value="rating" className="sort__item">рейтингу</option>
      </select>
    </div>
  )
}

export default Sort
