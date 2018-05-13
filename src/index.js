import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./app/root";
import './reset.css';
import './common.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
