import '../Catalog.scss'

function EditCatalogItem(props) {
  return (
    <li className="catalog__item">
      <div
        className="catalog__link"
        onClick={props.onClick}
      >
        {props.linkText}
      </div>
    </li>
  )
}

export default EditCatalogItem
