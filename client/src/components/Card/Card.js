import './Card.scss'

import {Link} from "react-router-dom";

function Card(props) {
  return (
    <div className="card">
      <Link to={"/catalog/" + props.categoryTitle + "/" + props.id}>
        <div className="card-img"><img src={props.url} alt="img" /></div>
      </Link>
      <div className="card-info">
        <div className="card-name">Название:&nbsp;
          <Link to={"/catalog/" + props.categoryTitle + "/" + props.id}>
            <span>{props.name}</span>
          </Link>
        </div>
        <div className="card-id">ID: <span>{props.id}</span></div>
        <div className="card-rating">Рейтинг: <span>{props.rating}</span></div>
        <div className="card-price">Цена: <span>{props.price} руб.</span></div>
      </div>
      <Link to={"/catalog/" + props.categoryTitle + "/" + props.id}>
        <button className="btn card-btn">Открыть</button>
      </Link>
    </div>
  )
}

export default Card
