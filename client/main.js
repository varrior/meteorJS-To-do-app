import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {render} from 'react-dom';
import '../imports/startup/account-config';
import App from '../imports/ui/App.js';

Meteor.startup(()=>{
  render(<App/>, document.getElementById('app'))
});

