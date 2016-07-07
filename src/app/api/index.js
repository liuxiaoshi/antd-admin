import Api from './api';

const api = new Api({
	baseURI: 'http://localhost:8080/shuilaike-cms',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': window.localStorage.getItem('TOKEN')
	}
})

export default api