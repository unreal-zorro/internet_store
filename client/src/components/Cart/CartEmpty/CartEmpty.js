import '../Cart.scss'

function CartEmpty(props) {
  return (
    <div
      className={"cart__empty " + props.className}
    >Корзина пуста.</div>
  )
}

export default CartEmpty
