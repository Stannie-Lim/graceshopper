import React, {Component} from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import axios from 'axios'

class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      text: '',
      items: [],
      options: ['Product', 'Category', 'User']
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.findItems = this.findItems.bind(this)
  }

  async componentDidMount() {
    this.findItems()
  }

  async findItems(filter = 'product') {
    let items
    switch (filter) {
      case 'product':
        items = (await axios.get('/api/products')).data.map(item => {
          return {
            value: item.name,
            label: item.name
          }
        })
        break
      case 'category':
        items = (await axios.get('/api/categories')).data.map(category => {
          return {
            value: category.name,
            label: category.name
          }
        })
        break
      case 'user':
        items = (await axios.get('/api/users')).data.map(user => {
          return {
            value: user.email,
            label: user.email
          }
        })
        break
    }
    this.setState({items: items})
  }

  onSubmit(ev) {
    ev.preventDefault()
    console.log(this.state.text)
  }

  onChange(ev) {
    this.setState({text: ev.target.value})
  }

  render() {
    const {items, options} = this.state
    const {onSubmit, findItems} = this

    return (
      <form onSubmit={onSubmit}>
        <select
          onChange={filter => {
            findItems(filter.target.value.toLowerCase())
          }}
        >
          {options.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
        <Select
          onChange={item => this.setState({text: item.value})}
          options={items}
        />
        <button>Search</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(null, mapDispatchToProps)(SearchBar)
