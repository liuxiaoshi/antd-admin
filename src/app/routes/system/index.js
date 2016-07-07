module.exports = {
	path: '/system',
	getComponent(location, cb) {
		require.ensure([], (require) => {
			cb(null, require('../../containers/System').default);
		})
	},
	childRoutes: [
		require('./role'),
		require('./user'),
	],
}