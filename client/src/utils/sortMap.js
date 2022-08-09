const compareNames = (a, b) => {
  if (a.name > b.name) {
    return 1
  } else if (a.name === b.name) {
    return 0
  } else if (a.name < b.name) {
    return -1
  }
}

export const sortMap = {
  'price-incr': (a, b) => +a.price - +b.price,
  'price-decr': (a, b) => +b.price - +a.price,
  'name': compareNames,
  'rating': (a, b) => +b.rating - +a.rating
}
