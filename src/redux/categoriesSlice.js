import {createSlice} from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [
      {
        id: 1,
        title: "computers",
        name: "Компьютеры",
        goods: [
          {
            url: "/img/Computers_1.jpg",
            name: "ПК ZET Gaming NEO M017",
            descr: "Intel Core i5-11400F, 6x2.6 ГГц, 16 ГБ DDR4, GeForce RTX 3050, SSD 512 ГБ, без ОС",
            id: 545454,
            rating: "4.7",
            price: "77299",
            amount: "5500"
          },
          {
            url: "/img/Computers_2.jpg",
            name: "ПК Lenovo Legion T5 26IOB6 [90RT0044RS]",
            descr: "Intel Core i5-11400F, 6x2.6 ГГц, 16 ГБ DDR4, GeForce RTX 3070, HDD 1 ТБ, SSD 256 ГБ, без ОС",
            id: 171717,
            rating: "4.1",
            price: "109999",
            amount: "3200"
          },
          {
            url: "/img/Computers_3.jpg",
            name: "ПК ZET Gaming WARD H188",
            descr: "Intel Core i5-11400F, 6x2.6 ГГц, 16 ГБ DDR4, GeForce RTX 3060, SSD 500 ГБ, Windows 11 Home Single Language",
            id: 548761,
            rating: "5.0",
            price: "104599",
            amount: "1000"
          },
          {
            url: "/img/Computers_4.jpg",
            name: "ПК Lenovo IdeaCentre Gaming G5 14IMB05 [90N9008XRS]",
            descr: "Intel Core i3-10100, 4x3.6 ГГц, 8 ГБ DDR4, GeForce GTX 1650 SUPER, SSD 512 ГБ, без ОС",
            id: 789989,
            rating: "3.7",
            price: "44699",
            amount: "720"
          },
          {
            url: "/img/Computers_5.jpg",
            name: "ПК DEXP Mars E332",
            descr: "Intel Core i5-10400F, 6x2.9 ГГц, 8 ГБ DDR4, GeForce GTX 1650, SSD 512 ГБ, Windows 10 Home Single Language",
            id: 159852,
            rating: "3.9",
            price: "59999",
            amount: "10500"
          },
          {
            url: "/img/Computers_6.jpg",
            name: "ПК Acer Nitro N50-620 [DG.E2DER.003]",
            descr: "Intel Core i5-11400F, 6x2.6 ГГц, 16 ГБ DDR4, GeForce GTX 1650, SSD 512 ГБ, без ОС",
            id: 357142,
            rating: "4.2",
            price: "69999",
            amount: "4000"
          },
          {
            url: "/img/Computers_7.jpg",
            name: "ПК ZET Gaming EVO X001",
            descr: "Intel Core i7-12700KF, 8x3.6 ГГц, 32 ГБ DDR5, GeForce RTX 3090 Ti, SSD 2000 ГБ, Windows 11 Home Single Language",
            id: 123321,
            rating: "5.0",
            price: "363999",
            amount: "2000"
          },
        ]
      },
      {
        id: 2,
        title: "home",
        name: "Техника для дома",
        goods: [
          {
            url: "/img/Home_1.jpg",
            name: "Стирально-сушильная машина LG F2V5NG0W",
            descr: "стирка - 6 кг, сушка - 4 кг, фронтальная загрузка, отжим - 1200 об/мин, программ - 14, дозагрузка белья, пар, 60 см x 85 см x 45.5 см",
            id: 111222,
            rating: "4.5",
            price: "64999",
            amount: "4500"
          },
          {
            url: "/img/Home_2.jpg",
            name: "Водонагреватель газовый Zanussi GWH 10 Fonte",
            descr: "проточный, эмалированная сталь, 18.5 кВт, 10 л/мин, до - 50 °C, управление - механическое, газ-контроль",
            id: 33334,
            rating: "3.1",
            price: "10499",
            amount: "12000"
          }
        ]
      },
      {
        id: 3,
        title: "auto",
        name: "Автотовары",
        goods: [
          {
            url: "/img/Auto_1.jpg",
            name: "Автопроигрыватель Soundmax SM-CCR3057F",
            descr: "1 DIN, 160 Вт, AUX, USB",
            id: 111522,
            rating: "3.0",
            price: "1099",
            amount: "300"
          }
        ]
      },
      {
        id: 4,
        title: "garden",
        name: "Сад и огород",
        goods: [
          {
            url: "/img/Garden_1.jpg",
            name: "Подвеска декоративная Green Apple Девочка",
            descr: "декор помещений, керамика, 7.6x7x12.3 см",
            id: 1741522,
            rating: "1.0",
            price: "199",
            amount: "5000"
          }
        ]
      },
      {
        id: 5,
        title: "accessories",
        name: "Аксессуары",
        goods: [
          {
            url: "/img/Monitor_1.jpg",
            name: '19.5" Монитор Acer V206HQLAb черный',
            descr: "1600x900@60 Гц, TN, 5 мс, 1000 : 1, 200 Кд/м², 90°/65°, VGA (D-Sub)",
            id: 12345,
            rating: "4.0",
            price: "9999",
            amount: "10000"
          },
          {
            url: "/img/Monitor_2.jpg",
            name: '21.5" Монитор Dell SE2222H черный',
            descr: "1920x1080@60 Гц, VA, 8 мс, 3000 : 1, 250 Кд/м², 178°/178°, HDMI, VGA (D-Sub)",
            id: 33333,
            rating: "4.5",
            price: "11999",
            amount: "7200"
          },
          {
            url: "/img/Monitor_3.jpg",
            name: '23.6" Монитор HP X24c черный',
            descr: "1920x1080@144 Гц, VA, 4 мс, 3000 : 1, 300 Кд/м², 178°/178°, DisplayPort, HDMI, изогнутый, AMD FreeSync Premium",
            id: 77777,
            rating: "4.2",
            price: "15999",
            amount: "1050"
          }
        ]
      }
    ]
  },
  reducers: {
    addCategory: (state, action) => {
      state.categories[state.categories.length] = {
        id: +action.payload.categoryId,
        title: action.payload.categoryTitle,
        name: action.payload.categoryName,
        goods: []
      }
    },
    deleteCategory: (state, action) => {
      state.categories.splice(action.payload.categoryIndex,1)
    },
    editCategory: (state, action) => {
      state.categories[action.payload.index] = {
        id: +action.payload.completeCategory.categoryId,
        title: action.payload.completeCategory.categoryTitle,
        name: action.payload.completeCategory.categoryName
      }
    },
    addGood: (state, action) => {
      state.categories[action.payload.categoryIndex].goods[state.categories[action.payload.categoryIndex].goods.length] = {
        ...action.payload.good
      }
    },
    deleteGood: (state, action) => {
      state.categories[action.payload.categoryIndex].goods.splice(action.payload.goodIndex,1)
    },
    editGood: (state, action) => {
      state.categories[action.payload.categoryIndex].goods[action.payload.goodIndex] = {
        ...action.payload.good
      }
    }
  }
})

export const {
  addCategory,
  deleteCategory,
  editCategory,
  addGood,
  deleteGood,
  editGood
} = categoriesSlice.actions

export default categoriesSlice.reducer
