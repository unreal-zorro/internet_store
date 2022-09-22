function cartCountAndAmount(cart, categories) {
  if (!cart.length || !categories.length) {
    return {count: 0, amount: 0}
  }

  const count = cart.reduce((sum, item) => sum + item.count, 0)

  const amount = cart.reduce((sum, item) => {
    const cat = categories.find((catItem) => catItem.id === item.categoryId)
    const good = cat.goods.find((goodItem) => goodItem.id === item.id)
    return sum + item.count * +(good.price)
  }, 0)

  return {count, amount}
}

export default cartCountAndAmount
