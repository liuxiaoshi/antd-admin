import {
	combineReducers
} from 'redux';
import {
	routerReducer
} from 'react-router-redux';
import user from './user';
import menu from './menu';
import sidebar from './sidebar';
import xTable from './XTable';
import addForm from './addForm'
import editForm from './editForm'
import detail from './detail'

export default combineReducers({
	user,
	menu,
	sidebar,
	xTable,
	addForm,
	editForm,
	detail,
	routing: routerReducer
});