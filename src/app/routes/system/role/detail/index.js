module.exports = {
	path: '/system/role/:id',
	getComponent(location, cb) {
		require.ensure([], (require) => {
			cb(null, require('../../../../containers/Detail').default);
		})
	}
}