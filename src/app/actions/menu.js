import api from '../api'


export const GET_NAV = 'GET_NAV'
export const GET_NAV_PENDING = 'GET_NAV_PENDING'
export const GET_NAV_SUCCESS = 'GET_NAV_SUCCESS'
export const GET_NAV_ERROR = 'GET_NAV_ERROR'

export const GET_SIDEBAR = "GET_SIDEBAR"
export const GET_SIDEBAR_PENDING = "GET_SIDEBAR_PENDING"
export const GET_SIDEBAR_SUCCESS = "GET_SIDEBAR_SUCCESS"
export const GET_SIDEBAR_ERROR = "GET_SIDEBAR_ERROR"

export function getNavMenu(id) {
	let path = '/api/v2/user/' + id + '/nav';
	return {
		type: GET_NAV,
		payload: {
			promise: api.get(path)
		}
	}
}

export function getSidebarMenu(id, key) {
	let path = '/api/v2/user/' + id + '/sidebar/' + key;
	return {
		type: GET_SIDEBAR,
		payload: {
			promise: api.get(path)
		}
	}
}