import '../Catalog.scss'

import {Link} from "react-router-dom";

function CatalogItem(props) {
  return (
    <li className="catalog__item">
      <Link to={props.link} className="catalog__link">
        {props.linkText}
      </Link>
    </li>
  )
}

export default CatalogItem
