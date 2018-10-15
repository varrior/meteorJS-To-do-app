import React, { Component } from 'react';
import { Tasks } from '../api/list';
import { Meteor } from 'meteor/meteor';

class List extends React.Component {
    constructor(props){
        super(props)
        this.handleDescription = this.handleDescription.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.updateDescription = this.updateDescription.bind(this)
        this.saveChanges = this.saveChanges.bind(this);
        this.userId = Meteor.userId();
    }

    handleDescription(e){
        e.preventDefault();
        Meteor.call('tasks.update', this.props.task._id, e.target.children[1].value)

        e.target.children[1].value = '';
    }
    updateDescription(e){
        e.target.previousSibling.setAttribute('contenteditable', true);
        e.target.previousSibling.focus();
        e.target.classList.add('hide')
        e.target.nextSibling.classList.remove('hide')
    }
    saveChanges(e){
        Meteor.call('tasks.update', this.props.task._id, e.target.previousSibling.previousSibling.textContent)

        e.target.previousSibling.previousSibling.removeAttribute('contenteditable');
        e.target.classList.add('hide');
        e.target.previousSibling.classList.remove('hide');
    }
    removeTask(){
        Meteor.call('tasks.remove', this.props.task._id)
    }
    render(){
        return(
            <div className="card">
                <div className="card-header" id="headingOne">
                    <h5 className="mb-0">
                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapseOne${this.props.id}`} aria-expanded="true">{this.props.task.username && <strong>{this.props.task.username} :</strong>} {this.props.task.text}</button>
                        { this.props.currentUser && <button onClick={this.removeTask} title="Remove task" className="pull-right removeTask" type="button"aria-expanded="true"><span className="glyphicon glyphicon-trash"></span></button>}
                    </h5>
                </div>
                <div id={`collapseOne${this.props.id}`} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                    {this.props.task.description?
                        <div className="card-body">
                            <div className="editableDescription"><strong>{this.props.task.description}</strong></div>
                            { this.props.currentUser === this.props.task.owner && <span onClick={this.updateDescription} title="Edit description" className="glyphicon glyphicon-edit pull-right editDescription"></span>}
                            { this.props.currentUser === this.props.task.owner && <span onClick={this.saveChanges} title="Save changes" className="glyphicon glyphicon-floppy-saved pull-right editDescription hide"></span>}
                        </div>:
                        <div className="newDes">
                            { this.props.currentUser  === this.props.task.owner ? 
                            <form onSubmit={this.handleDescription} noValidate>
                                <label htmlFor="newDes">Add description to the task</label>
                                <textarea placeholder="Add description content" className="form-control newDes" rows="3"></textarea>
                                <button className="btn btn-info addDescription" type="submit"><span className="glyphicon glyphicon-plus"></span>Add description</button>                                  
                            </form>: <p>{this.props.task.username} has not added a description</p>
                        }
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default List
