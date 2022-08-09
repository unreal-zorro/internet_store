import '../Navigation.scss'

function EditNavigationLink(props) {
  return (
    <div
      className="navigation__link"
      onClick={props.onClick}
    >
      {props.linkName}
    </div>
  )
}

export default EditNavigationLink
