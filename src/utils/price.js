export const getDiscountedPrice = (price, discountPercentage = 0) => {
  return price * (1 - discountPercentage / 100)
}

export const formatPrice = (price) => {
  return `$${price.toFixed(2)}`
}