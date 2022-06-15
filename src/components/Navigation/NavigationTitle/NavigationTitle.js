import '../Navigation.scss'
function NavigationTitle(props) {
  return (
    <div className="navigation__title">
      {props.children}
    </div>
  )
}

export default NavigationTitle
