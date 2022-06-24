import './Promo.scss'

function Promo(props) {
  return (
    <div className={"promo " + props.className}>
      {props.children}
    </div>
  )
}

export default Promo
