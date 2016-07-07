import _ from 'lodash'
import {
	role
} from './role'

const data = {
	role
}

const gridMap = _.reduce(data, function(map, grid) {
	map[grid.name] = grid
	return map
}, {})

module.exports = {
	getAll() {
		return data
	},

	lookupGrid(name) {
		return gridMap[name]
	}
}