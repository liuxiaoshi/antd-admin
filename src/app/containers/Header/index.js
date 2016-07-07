import React, {
  PropTypes
} from 'react';
import {
  bindActionCreators
} from 'redux';
import {
  connect
} from 'react-redux';
import {
  Link
} from 'react-router';
import {
  Row,
  Col,
  Icon,
  Menu,
  Modal,
  Button
} from 'antd';


import {
  getNavMenu
} from '../../actions/menu'

import './index.less';
import authUtils from '../../utils/auth';

const SubMenu = Menu.SubMenu;

const MenuItemGroup = Menu.ItemGroup;
const confirm = Modal.confirm;

class Header extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    let uid = authUtils.getUid();
    this.props.getNavMenu(uid);
  }

  handleClick = (item) => {
    let _props = this.props;
    if (item.key == 'setting:2') {
      confirm({
        title: '您确定要退出系统吗？',
        content: '',
        onOk() {
          console.log('确定');
          _props.logout();
        },
        onCancel() {},
      });

    }
  }

  render() {
    const {
      routes,
      components,
      items,
    } = this.props;

    let route = '';
    if (routes[1].path) {
      route = routes[1].path;
    }
    let activeMenuItem = route || '/home';

    let menu = items.map((item) => {
      return (
        <Menu.Item key={item.url}>
          <Link to={item.url}>  {item.name}</Link>
        </Menu.Item>);
    })
    const {
      profile
    } = this.props
    const username = profile ? profile.userName : 'loading'
    return (
      <header id="header" className="clearfix">
        <Row>
            <Col lg={4} md={6} sm={7} xs={24}>
              <Icon className="nav-phone-icon" type="menu" />
              <Link to="/" id="logo">
                <img alt="logo" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" />
                <span>后台管理系统</span>
              </Link>
            </Col>
            <Col className="nav" lg={16} md={23} sm={10} xs={0}  lg={16} md={14} sm={13} xs={0} style={{ display: 'block' }}>
                <Menu mode="horizontal" id="nav" selectedKeys={[activeMenuItem]} >
                  {menu}
                </Menu>
            </Col>
            <Col id="user-menu" lg={4} md={6} sm={7} xs={0}  lg={4} md={4} sm={4} xs={0} >
              <Menu onClick={this.handleClick} mode="horizontal">
                <SubMenu title={<span><Icon type="user" />{username}</span>}>
                  <Menu.Item key="setting:1">修改密码</Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="setting:2">登出</Menu.Item>
                </SubMenu>
              </Menu>
            </Col>
        </Row>
      </header>
    )
  }
}


Header.propTypes = {
  items: PropTypes.array,
  children: PropTypes.node,
  profile: PropTypes.object,
}

Header.defaultProps = {
  items: []
}

function mapStateToProps(state) {
  return {
    items: state.menu.items,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getNavMenu: bindActionCreators(getNavMenu, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)