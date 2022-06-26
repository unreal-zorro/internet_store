import '../Edit.scss'

function EditEmpty(props) {
  return (
    <div className={"edit__empty " + props.className}>
      Товаров пока нет. Добавьте их.
    </div>
  )
}

export default EditEmpty
