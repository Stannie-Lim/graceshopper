import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

//thunks
import {
  getCart,
  editCart,
  removeItemFromCart,
  addToWishlist
} from '../store/index'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      total: 0,
      subTotal: 0
    }
  }
  render() {
    const {
      cartItems,
      totalPrice,
      changeAmount,
      buyerId,
      addWish,
      removeItem
    } = this.props

    if (cartItems && cartItems.length === 0) {
      return <div className="notnav">The Cart is Empty</div>
    }
    return (
      <div className="cart-container notnav">
        {cartItems &&
          cartItems.map(cartItem => {
            const quantity = []
            for (let amount = 1; amount <= cartItem.product.stock; amount++) {
              quantity.push(amount)
            }
            return (
              <div key={cartItem.id} className="cart">
                <h2>name: {cartItem.product.name}</h2>
                <select
                  defaultValue={cartItem.quantity}
                  onChange={ev => {
                    changeAmount(ev.target.value, cartItem)
                  }}
                >
                  {quantity.map(index => <option key={index}>{index}</option>)}
                </select>
                <img src={cartItem.product.imageURL} />
                <h2>
                  Item Total: ${cartItem.quantity * cartItem.product.price}
                </h2>
                <button
                  onClick={() => {
                    addWish(cartItem.product, cartItem.quantity)
                    removeItem(cartItem)
                  }}
                >
                  Move to Wishlist
                </button>
                <button onClick={() => removeItem(cartItem)}>
                  Remove Item
                </button>
              </div>
            )
          })}
        <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
        <Link style={{fontSize: '3rem'}} to={`/checkout/${buyerId}`}>
          Proceed to Checkout
        </Link>
      </div>
    )
  }
}

const mapStateToProps = ({user, cartItems}) => {
  let totalPrice = 0
  if (!user.id) {
    const items = JSON.parse(window.localStorage.getItem('cart'))
    cartItems = items
  }
  if (cartItems && cartItems.length) {
    totalPrice = cartItems.reduce((total, cartItem) => {
      total += cartItem.quantity * cartItem.product.price
      return total
    }, 0)
  }
  return {
    buyerId: user.id || '',
    cartItems,
    totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: buyerId => dispatch(getCart(buyerId)),
    changeAmount: (amount, item) => dispatch(editCart(amount, item)),
    addWish: (product, quantity) => dispatch(addToWishlist(product, quantity)),
    removeItem: item => dispatch(removeItemFromCart(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
