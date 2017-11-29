import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';
import './components/offcanvas/animations.css'; 

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
