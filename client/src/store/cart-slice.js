import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {}, // key = username, value = { products: [], quantity: number, price: number }
  reducers: {
    // action.payload = { product, size, quantity, username }
    addProduct(state, action) {
      /** @typedef {object} json
       * @property {string} _id
       * @property {string} title
       * @property {string} description
       * @property {string} image
       * @property {string} category
       * @property {string[]} color
       * @property {number} price
       * @property {boolean} inStock
       * @property {number} quantity
       * @property {string} size
       * **/
      const product = {...action.payload.product, quantity: action.payload.quantity, size: action.payload.size}
      const username = action.payload.username ?? null

      const userState = state[username]

      if (!userState) {
        state[username] = {
          products: [product],
          totalQuantity: product.quantity,
          totalPrice: product.price * product.quantity
        }
        return
      }

      const storedProducts = userState.products

      try {
        for (const storedProduct of storedProducts) {
          if (storedProduct._id === product._id && storedProduct.size === product.size) {
            storedProduct.quantity += product.quantity
            return
          }
        }

        storedProducts.push(product);

      } finally {
        let totalQuantity = 0
        let totalPrice = 0

        storedProducts.forEach(product => {
          totalQuantity += product.quantity
          totalPrice += product.quantity * product.price
        })

        userState.totalQuantity = totalQuantity
        userState.totalPrice = totalPrice
      }
    },
  }
});

export const {addProduct} = cartSlice.actions;
export default cartSlice;
