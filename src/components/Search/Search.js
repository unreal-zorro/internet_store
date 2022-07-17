import './Search.scss'

function Search(props) {
  return (
    <section className="search">
      <label className="search__label" htmlFor="search">Поиск: </label>
      <input
        className="search__input"
        type="text"
        id="search"
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
      />
      <button
        className="btn search__btn"
        onClick={props.onClick}
      >Найти</button>
      <div
        className="search__icon"
        onClick={props.onClick}
      >
        <img src="/icons/search.png" alt="search"/>
      </div>
    </section>
  )
}

export default Search
