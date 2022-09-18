import './Delivery.scss'

function Delivery() {
  return (
    <div className="delivery">
      <div className="delivery__title">Варианты доставки:</div>
      <ol className="delivery__list">
        <li className="delivery__item">Самовывоз</li>
        <li className="delivery__item">Курьером</li>
        <li className="delivery__item">По почте</li>
        <li className="delivery__item">Транспортной компанией</li>
      </ol>
    </div>
  )
}

export default Delivery
