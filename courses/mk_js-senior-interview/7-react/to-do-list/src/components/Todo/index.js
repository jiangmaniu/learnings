import React, { Component } from "react";
import Input from "./Input";
import List from "./List";

class Todo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      count: 0
    }
  }

  setTitle (title) {
    const currentList = this.state.list
    this.setState({
      list: currentList.concat(`要完成的事件：${title}`)
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.setTitle.bind(this, this.state.count)}>添加</button>
        <Input addTitle={this.setTitle.bind(this)} />
        <List data={this.state.list}></List>
      </div>
    )
  }
}

export default Todo