module.exports = {
	path: '/system/role',
	getComponent(location, cb) {
		require.ensure([], (require) => {
			cb(null, require('./components/Role').default);
		})
	},
	getChildRoutes(location, callback) {
		require.ensure([], function(require) {
			callback(null, [
				require('./add'),
				require('./edit'),
				require('./detail'),
			])
		})
	},

}