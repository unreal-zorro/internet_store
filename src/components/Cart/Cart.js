import './Cart.scss'

function Cart(props) {
  return (
    <div className="cart">
      {props.children}
    </div>
  )
}

export default Cart
