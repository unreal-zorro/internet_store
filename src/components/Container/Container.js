import './Container.scss'

function Container(props) {
  return (
    <section className={"container " + props.className}>
      {props.children}
    </section>
  )
}

export default Container
