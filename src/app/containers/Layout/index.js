import React, {
  PropTypes
} from 'react';

import ReactDOM from 'react-dom';
import {
  bindActionCreators
} from 'redux';
import {
  connect
} from 'react-redux';
import NProgress from 'nprogress';
import authUtils from '../../utils/auth';
import Header from '../Header';
import Footer from '../../components/Footer';

import {
  logout,
  fetchProfile
} from '../../actions/user';
import './index.less'

class Layout extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    NProgress.start();
    const {
      actions,
      uid
    } = this.props;
    let realUid = uid ? uid : authUtils.getUid();
    actions.fetchProfile(realUid);
  }

  componentDidMount() {
    NProgress.done();
    const loadingNode = document.getElementById('ant-site-loading');
    if (!loadingNode) {
      return;
    }
    this.timer = setTimeout(() => {
      loadingNode.parentNode.removeChild(loadingNode);
    }, 450);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  logout = () => {
    this.props.actions.logout();
    this.context.router.replace('/login');
  }

  render() {
    const {
      uid,
      profile,
      actions
    } = this.props;
    let realUid = uid ? uid : authUtils.getUid();

    return (
      <div className="page-wrapper">
          <Header profile={profile} logout={this.logout} {...this.props}  />
          {this.props.children}
        </div>
    );
  }
}
Layout.propTypes = {
  uid: PropTypes.string,
  profile: PropTypes.object,
  children: PropTypes.node.isRequired
};

Layout.contextTypes = {
  history: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {
    user,
  } = state;
  return {
    uid: user.uid ? user.uid : null,
    profile: user.profile ? user.profile : null,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      logout,
      fetchProfile
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);