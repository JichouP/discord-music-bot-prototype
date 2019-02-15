import ReactDOM from 'react-dom';
import React from 'react';
import App from './src/App';

declare const exit: any;

window.onbeforeunload = exit;

ReactDOM.render(<App />, document.getElementById('root'));
