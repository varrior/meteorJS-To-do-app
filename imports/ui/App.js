import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../api/list.js';
import List from './List.js';
import Account from './account';

class App extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        let data = new FormData(e.target);

        for(let i of data.entries()){
            data['text'] = i[1]
        }
        Meteor.call('tasks.insert', data.text);

        e.target.children[0].children[1].value = '';
    }
    render(){
        return (
            <div className="container">
                <Account/>
                <header>
                    <h2>To do List</h2>
                </header>
                <div className="accordion" id="accordionExample">
                {this.props.tasks.map((task,index) => (
                    <List key={task._id} task={task} id={index} currentUser={Meteor.userId()}/>
                ))}                            
                </div>
                {this.props.currentUser && <form onSubmit={this.handleSubmit} noValidate>
                    <div className="input-group input-group-lg">
                        <div className="input-group-prepend">
                            <span className="glyphicon glyphicon-pencil input-group-text" id="inputGroup-sizing-lg"></span>
                        </div>
                        <input type="text" name="newTask" placeholder="Add new task" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
                        <div className="input-group-append">
                            <button className="btn btn-success" type="submit" id="inputGroupFileAddon04">Add new task</button>
                        </div>
                    </div>
                </form>}
          </div>
        )
    }
}

const dataHOC = withTracker(() => {
    return {
      tasks: Tasks.find({}, { sort: { date: -1 } }).fetch(),
      currentUser: Meteor.user()
    };
  })(App);

export default dataHOC