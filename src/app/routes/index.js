import authUtils from '../utils/auth'

export default {
	path: '/',
	getIndexRoute(location, callback) {
		require.ensure([], function(require) {
			callback(null, {
				component: require('../containers/Home').default,
			})
		})
	},
	onEnter: function(nextState, replace, callback) {
		const isLoggedIn = authUtils.getToken()
		if (!isLoggedIn && nextState.location.pathname != '/login') {
			replace('/login')
		}
		callback()
	},
	childRoutes: [
		require('../routes/home'),
		require('../routes/system'),
		require('../routes/login'),
	],
};