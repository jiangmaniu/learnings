import { Component } from "react";

class Input extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  inputHandle (event) {
    this.setState({
      title: event.target.value
    })
  }

  clickHandle () {
    const title = this.state.title
    const addTitle = this.props.addTitle
    addTitle(title)
    this.setState({
      title: ''
    })
  }

  render () {
    return (
      <>
      <input value={this.state.title} onChange={this.inputHandle.bind(this)} />
      <button onClick={this.clickHandle.bind(this)}>添加</button>
      </>
    )
  }
}

export default Input