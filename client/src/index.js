import React from 'react';
import ReactDOM from 'react-dom';
//styling
import 'antd/dist/antd.css';
import './index.css';
import './components/layout/layout.css';
import './components/common/main.css';

//app component
import App from './App';
//redux
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
