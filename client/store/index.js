import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import axios from 'axios'
import user from './user'

// reducers
import categoriesReducer from './categories/reducer'
import cartReducer from './cart/reducer'
import wishlistReducer from './wishlist/reducer'

// actions
import {_getCategories} from './categories/actions'
import {_addToCart} from './cart/actions'
import {_addToWishlist} from './wishlist/actions'

const reducer = combineReducers({
  user,
  categories: categoriesReducer,
  wishlists: wishlistReducer,
  carts: cartReducer
})

const getCategories = () => {
  return async dispatch => {
    const categories = (await axios.get('/api/categories')).data
    dispatch(_getCategories(categories))
  }
}

const addToCart = cart => async dispatch => {
  console.log(cart)
  const productCart = (await axios.post(`/api/cartItems`, {cart})).data
  dispatch(_addToCart(productCart))
}

const addToWishlist = wishlist => async dispatch => {
  const wish = (await axios.post(`/api/wishlistItems`, {wishlist})).data
  dispatch(_addToWishlist(wish))
}

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store

export {getCategories, addToCart, addToWishlist}

export * from './user'
