import './HomeLink.scss'

import {Link} from "react-router-dom";

function HomeLink() {
  return (
    <div className="home-link">
      <Link to="/">
        На главную
      </Link>
    </div>
  )
}

export default HomeLink
