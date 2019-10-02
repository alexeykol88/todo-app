import React, {Component} from 'react';
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import AddItemForm from '../add-item-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make App"),
      this.createTodoItem("Smoke"),
    ],
    searchValue: '',
    filter: 'all'
  };
 
  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  removeItem = (id) => {
    this.setState(({todoData}) => {
      
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx), 
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      }
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({todoData}) => {

      const newArr = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArr
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

      const oldItem = arr[idx];
      const newItem = {...oldItem, 
             [propName]: !oldItem[propName]};
      
             return [
              ...arr.slice(0, idx),
              newItem, 
              ...arr.slice(idx + 1)
            ];
  };

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
});
  };

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
            return {
              todoData: this.toggleProperty(todoData, id, 'done')
            };
    });
  };

  onSearchChange = (e) => {
    this.setState({
      searchValue: e
    })
  }

  search(items, value) {
    if (value.length === 0) {
      return items;
    }

    return items.filter((el) => {
      return el.label.toLowerCase().indexOf(value.toLowerCase()) > -1;
    })
  }

  filter(items, filter) {
    switch(filter) {
       case 'all':
        return items;
      case 'active':
        return items.filter((el) => !el.done)
      case 'done':
        return items.filter((el) => el.done)
      default: return items;
        }
  }

  onFilterChange = (filter) => {
    this.setState({filter});
  }

  filterToAll = () => { this.setState({filter: 'all'}) };

  filterToActive = () => { this.setState({filter: 'active'}) };

  filterToDone = () => { this.setState({filter: 'done'}) };
  
  render() {
    
    const {todoData, searchValue, filter} = this.state;
    const visibleItems = this.filter(
                     this.search(todoData, searchValue), filter);

    const doneCount = todoData
                      .filter((el) => el.done).length;
    
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">

          <SearchPanel 
            onChange={this.onSearchChange}
          />

          <ItemStatusFilter 
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList 
        todos={visibleItems}
        onRemove={this.removeItem}
        onToggleImportant={this.onToggleImportant}
        onToggleDone={this.onToggleDone}
         />

         <AddItemForm addItem={this.addItem}/>
      </div>
    )
  }
}