function cartCountAndAmount(cart, categories) {
  const count = cart.reduce((sum, item) => {
    return sum + item.count
  }, 0)

  const amount = cart.reduce((sum, item) => {
    const cat = categories.find((catItem) => {
      return catItem.id === item.categoryId
    })

    const good = cat.goods.find((goodItem) => {
      return goodItem.id === item.id
    })

    return sum + item.count * +(good.price)
  }, 0)

  return {count, amount}
}

export default cartCountAndAmount
