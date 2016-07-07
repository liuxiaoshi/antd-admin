module.exports = {
	path: '/system/user',
	getComponent(location, cb) {
		require.ensure([], (require) => {
			cb(null, require('./components/User').default);
		})
	}
}