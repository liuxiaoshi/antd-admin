import React from 'react';
import {
	connect
} from 'react-redux'
import {
	Row,
	Col
} from 'antd';

import XTable from '../../../../components/XTable'
import gridHelper from '../data/grid';
import NProgress from 'nprogress';

export default class Role extends React.Component {
	constructor() {
		super()
	}

	componentWillMount() {
		NProgress.start();
	}

	componentDidMount() {
		NProgress.done();
	}
	render() {
		const grid = gridHelper.lookupGrid('role');
		let _content;
		if (this.props.children)
			_content = React.cloneElement(this.props.children, {
				grid: grid
			})
		else
			_content = (<XTable grid={grid} />)
		return (
			<Col lg={20} md={18} sm={24} xs={24} className="main-container">
          			{_content}
            </Col>
		);
	}
}
export default connect()(Role)