import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render = (<h1>Hola mundo desde react</h1>)

createRoot(document.getElementsById('root'))
