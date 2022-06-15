import './Catalog.scss'

function Catalog(props) {
  return (
    <div className="catalog">
      <div className="catalog__title">Каталог:</div>
      <ul className="catalog__content">
        {props.children}
      </ul>
    </div>
  )
}

export default Catalog
