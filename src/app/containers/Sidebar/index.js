import React, {
	PropTypes
} from 'react'
import {
	bindActionCreators
} from 'redux';
import {
	connect
} from 'react-redux';
import {
	Row,
	Col,
	Icon,
	Menu,
	Dropdown
} from 'antd';
import {
	Link
} from 'react-router';
import {
	getSidebarMenu
} from '../../actions/menu';
import './index.less';
import authUtils from '../../utils/auth';
const SubMenu = Menu.SubMenu

class Sidebar extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		const {
			routes,
		} = this.props;

		console.log(this.props);

		if (routes[1].path) {
			let route = routes[1].path;
			let uid = authUtils.getUid();
			this.props.getSidebarMenu(uid, route);
		}
	}

	componentDidUpdate(prevProps, prevState) {}

	onToggle = (info) => {}

	menuClickHandle = (item) => {}


	getCurrentPaths = (path, paths) => {
		function handler(path, paths) {
			let idx = path.lastIndexOf("/");
			paths.push(path);
			if (idx != 0) {
				handler(path.substring(0, idx), paths);
			}
		}
		handler(path, paths);
	}

	renderMenu = (item) => {
		function _handler(item) {
			if (!!item.children) {
				return (
					<SubMenu key={item.url} title={<span> <i className={item.icon}></i> {item.name}</span>}>
                        {item.children.map((subMenu) => {
                          return(_handler(subMenu))
                        })}
                    </SubMenu>
				)
			} else {
				return (
					<Menu.Item key={item.url}>
                   <Link to={item.url}><i className={item.icon}></i>  {item.name}</Link>
                </Menu.Item>
				)
			}
		}
		return _handler(item);
	}

	render() {

		const {
			items
		} = this.props;

		const pathname = (this.props.location && this.props.location.pathname);
		const paths = pathname.split('/');

		let _defaultOpenKeys = [];
		paths.map((path) => {
			if (path != null && path != "") {
				_defaultOpenKeys.push("/" + path);
			}
		});

		let currentPaths = [];
		this.getCurrentPaths(pathname, currentPaths);

		_defaultOpenKeys.pop();

		const menu = items.map((item) => {
			return (this.renderMenu(item));
		})
		return (
			<Col lg={4} md={6} sm={24} xs={24}>
		           <Menu mode="inline" className="aside-container"
			          selectedKeys={currentPaths}
			          onOpen={this.onToggle}
			          onClose={this.onToggle}
			          defaultOpenKeys={_defaultOpenKeys}
			          onClick={this.menuClickHandle}>
			          {menu}
			        </Menu>
		         </Col>
		);
	}
}


Sidebar.propTypes = {
	items: PropTypes.array
}

Sidebar.defaultProps = {
	items: []
}

function mapStateToProps(state) {
	return {
		items: state.sidebar.items,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getSidebarMenu: bindActionCreators(getSidebarMenu, dispatch),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)