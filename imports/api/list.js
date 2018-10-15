import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);

        if (!this.userId) {
          throw new Meteor.Error('not-authorized');
        }
     
        Tasks.insert({
          text,
          date: new Date(),
          owner: this.userId,
          username: Meteor.users.findOne(this.userId).username,
        });
      },
      'tasks.remove'(taskId) {
        check(taskId, String);
     
        Tasks.remove(taskId);
      },
      'tasks.update'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, String);
     
        Tasks.update(taskId, { $set: { description: setChecked } });
      },
})