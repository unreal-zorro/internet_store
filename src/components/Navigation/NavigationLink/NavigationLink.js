import '../Navigation.scss'

import {Link} from "react-router-dom";

function NavigationLink(props) {
  return (
    <Link to={props.link} className="navigation__link">
      {props.linkName}
    </Link>
  )
}

export default NavigationLink
