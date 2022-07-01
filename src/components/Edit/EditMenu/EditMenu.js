import '../Edit.scss'

function EditMenu(props) {
  return (
    <section
      id="edit__menu"
      className={"edit__menu " + props.className}
    >
      <form className="edit__menu-form">
        <div className="edit__menu-row">
          <span>Форма редактирования товара</span>
        </div>

        <div className="edit__menu-row">
          <div className="edit__menu-str">
            <label
              htmlFor="id"
              className="edit__menu-label"
            >ID:</label>
            <input
              type="number"
              id="id"
              min="0"
              className={"edit__menu-input " + (props.errorGoodId ? "error" : "")}
              value={props.goodId}
              onChange={props.onChangeGoodId}
              required
            />
          </div>

          <div className="edit__menu-str">
            <label
              htmlFor="rating"
              className="edit__menu-label"
            >Рейтинг:</label>
            <input
              type="number"
              id="rating"
              min="0"
              className="edit__menu-input"
              defaultValue={props.goodRating}
              onChange={props.onChangeGoodRating}
              required
            />
          </div>

          <div className="edit__menu-str">
            <label
              htmlFor="category"
              className="edit__menu-label"
            >Категория:</label>
            <select
              name="sort"
              id="category"
              className="edit__menu-select"
              defaultValue={props.goodCategory}
              onChange={props.onChangeGoodCategory}
            >
              {props.categories.map(item => (
                <option
                  key={item.id}
                  value={item.title}
                  className="edit__menu-option"
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="edit__menu-row">
          <div className="edit__menu-str">
            <label
              htmlFor="url"
              className="edit__menu-label"
            >URL фото:</label>
            <input
              type="url"
              id="url"
              className="edit__menu-input"
              value={props.goodUrl}
              onChange={props.onChangeGoodUrl}
              required
            />
          </div>
        </div>

        <div className="edit__menu-row">
          <div className="edit__menu-col">
            <label
              htmlFor="name"
              className="edit__menu-label"
            >Название:</label>
            <textarea
              name="name"
              id="name"
              cols="10"
              rows="3"
              className={"edit__menu-textarea " + (props.errorGoodName ? "error" : "")}
              defaultValue={props.goodName}
              onChange={props.onChangeGoodName}
              required
            ></textarea>
          </div>

          <div className="edit__menu-col">
            <label
              htmlFor="descr"
              className="edit__menu-label"
            >Описание:</label>
            <textarea
              name="descr"
              id="descr"
              cols="10"
              rows="3"
              className="edit__menu-textarea"
              defaultValue={props.goodDescr}
              onChange={props.onChangeGoodDescr}
              required
            ></textarea>
          </div>
        </div>

        <div className="edit__menu-row">
          <div className="edit__menu-str">
            <label
              htmlFor="amount"
              className="edit__menu-label"
            >Кол-во, шт.:</label>
            <input
              type="number"
              id="amount"
              min="0"
              className="edit__menu-input"
              value={props.goodAmount}
              onChange={props.onChangeGoodAmount}
              required
            />
          </div>

          <div className="edit__menu-str">
            <label
              htmlFor="price"
              className="edit__menu-label"
            >Цена, руб.:</label>
            <input
              type="number"
              id="price"
              min="0"
              className="edit__menu-input"
              value={props.goodPrice}
              onChange={props.onChangeGoodPrice}
              required
            />
          </div>

          <div className="edit__menu-str edit__menu-ok">
            <div></div>
            <div
              className="edit__menu-link"
              onClick={props.onOkClick}
            >
              <img src="/icons/ok.png" alt="ok" />
            </div>
          </div>
          <div className="edit__menu-str edit__menu-ok">
            <div></div>
            <div
              className="edit__menu-link"
              onClick={props.onCancelClick}
            >
              <img src="/icons/cancel.png" alt="cancel" />
            </div>
          </div>
        </div>

        <div className="edit__menu-row">
          <div className="edit__menu-error">
            {props.errorGoodId + ' ' + props.errorGoodName}
          </div>
        </div>
      </form>
    </section>
  )
}

export default EditMenu
