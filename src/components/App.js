import React from 'react';
import {Component} from 'react';
import MainAppRoutes from '../routes/MainAppRoutes';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducers';
import {AuthProvider} from '../routes/AuthProvider';
import {MenuProvider} from 'react-native-popup-menu';

class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <AuthProvider>
          <MenuProvider>
            <MainAppRoutes />
          </MenuProvider>
        </AuthProvider>
      </Provider>
    );
  }
}

export default App;
