import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';
import './components/app/animations.css'; 

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
