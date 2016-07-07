module.exports = {
	path: '/system/role/edit/:id',
	getComponent(location, cb) {
		require.ensure([], (require) => {
			cb(null, require('../../../../containers/EditForm').default);
		})
	}
}