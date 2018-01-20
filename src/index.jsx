/* @jsx h */
import { h , mount } from 'petit-dom';
import App from './containers/App';
import store from './store';
import history from './store/history';
import {navigate} from './store/actions';

document.getElementById("root").appendChild(mount(<App />));

history.listen(function (location) {
    store.dispatch(navigate(location));
})
