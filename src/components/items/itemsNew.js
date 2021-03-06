import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'


import ItemsForm from './ItemsForm'
import Auth from '../../lib/Auth'



class ItemsNew extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        name: '',
        image: '',
        description: '',
        categories: []
      },
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleChange({ target: {name, value}}) {
    const data = { ...this.state.data, [name]: value }
    const errors = {...this.state.errors, [name]: null}
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios
      .post(
        '/api/items',
        this.state.data,
        { headers: { Authorization: `Bearer ${Auth.getToken()}` } }
      )
      .then(() => {
        this.props.history.push('/')
      })
      .catch(err => {
        this.setState({ errors: err.response.data })
      })
  }

  handleSelect(e){
    const categories = (e.map(select => select.value))
    const data = { ...this.state.data, categories }
    this.setState({ data })
  }

  render() {
    return (
      <main className="section">
        <div className="container">
          <h2 className="title">Post A New Item</h2>
          <ItemsForm
            data={this.state.data}
            errors={this.state.errors}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleSelect={this.handleSelect}
          />
        </div>
      </main>
    )
  }

}

export default withRouter(ItemsNew)
