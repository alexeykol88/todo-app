import React, {Component} from "react";
import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    value: ''
  }

  handleSearchChange = (e) => {
    const value = e.target.value;
    this.setState({value})
    this.props.onChange(value);
  }

  render() {
    return (
      <div>
        <input type="text"
             className="form-control search-input"
             placeholder="type to search" 
             onChange={this.handleSearchChange}
             value={this.state.value}
             />
      </div>
    )
  }
}