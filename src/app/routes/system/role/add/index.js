module.exports = {
	path: '/system/role/add',
	getComponent(location, cb) {
		require.ensure([], (require) => {
			cb(null, require('../../../../containers/AddForm').default);
		})
	}
}