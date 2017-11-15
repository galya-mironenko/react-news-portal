import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Portal from './model/Portal'
import Storage from './model/Storage'

const portal = new Portal("React Portal")
const storage = new Storage()

ReactDOM.render(<App portal={portal} papers={storage.papers} users={storage.users}/>, document.getElementById('root'));
