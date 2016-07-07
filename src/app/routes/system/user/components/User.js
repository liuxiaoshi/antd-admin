import React from 'react';
import {
	Row,
	Col
} from 'antd';
import NProgress from 'nprogress';

export default class User extends React.Component {
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
		return (
			<Col lg={20} md={18} sm={24} xs={24} className="main-container">
          			 <section>
          			 	用户
          			 </section>
            	</Col>
		);
	}
}