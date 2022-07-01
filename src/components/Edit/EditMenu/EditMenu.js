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
              className={"edit__menu-input " + props.idClassName}
              defaultValue="545454"
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
              className="edit__menu-input"
              defaultValue="4.7"
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
              defaultValue="./img/Computers_1.jpg"
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
              className={"edit__menu-textarea " + props.nameClassName}
              defaultValue="ПК ZET Gaming NEO M017"
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
              defaultValue="Intel Core i5-11400F, 6x2.6 ГГц, 16 ГБ DDR4, GeForce RTX 3050, SSD 512 ГБ, без ОС"
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
              className="edit__menu-input"
              defaultValue="300"
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
              className="edit__menu-input"
              defaultValue="77299"
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
      </form>
    </section>
  )
}

export default EditMenu
