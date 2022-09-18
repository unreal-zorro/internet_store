import './Visible.scss'

function Visible(props) {
  return (
    <div className="visible">
      <label htmlFor="visible" className="visible__label">
        Отображать по:
      </label>
      <select
        name="visible"
        id="visible"
        className="visible__select"
        defaultValue={props.value}
        onChange={props.onChange}
      >
        <option value="1" className="visible__item">1</option>
        <option value="2" className="visible__item">2</option>
        <option value="5" className="visible__item">5</option>
        <option value="all" className="visible__item">все</option>
      </select>
    </div>
  )
}

export default Visible
