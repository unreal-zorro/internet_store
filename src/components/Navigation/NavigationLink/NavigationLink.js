import {Link} from "react-router-dom";

import '../Navigation.scss'

function NavigationLink(props) {
  return (
    <Link to={props.link} className="navigation__link">
      {props.linkName}
    </Link>
  )
}

export default NavigationLink
