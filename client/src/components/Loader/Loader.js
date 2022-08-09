import './Loader.scss'

function Loader() {
  return (
    <div className="loader">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="loader__text">
        Идёт загрузка...
      </div>
    </div>
  )
}

export default Loader
