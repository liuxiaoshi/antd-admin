import React, {
  PropTypes
} from 'react';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  notification
} from 'antd';
import {
  bindActionCreators
} from 'redux';
import {
  connect
} from 'react-redux';
import {
  login
} from '../../actions/user';

import NProgress from 'nprogress';
const FormItem = Form.Item

import './index.less'

class Login extends React.Component {
  constructor(props) {
    super(props)
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

  componentWillMount() {
    NProgress.start();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  componentWillReceiveProps(nextProps) {
    const error = nextProps.loginErrors;
    const isLoggingIn = nextProps.loggingIn;
    const uid = nextProps.uid;

    if (error && error.indexOf('offline') > 0) {
      notification.error({
        message: '登录失败',
        description: '网络问题',
        duration: 1
      });
    } else if (error != this.props.loginErrors && error) {
      notification.error({
        message: '登录失败',
        description: '错误的用户名或者密码',
        duration: 1
      });
    }

    if (!isLoggingIn && !error && uid) {
      notification.success({
        message: '登录成功',
        description: '',
        duration: 1
      });
    }

    if (uid) {
      this.context.router.replace('/home');
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {
      actions
    } = this.props;

    let validate = true;
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        validate = false;
        return;
      }
    });

    if (validate) {
      const data = this.props.form.getFieldsValue();
      actions.login(data.user, data.password);
    }
  }

  render() {
    const {
      getFieldProps
    } = this.props.form;
    const nameProps = getFieldProps('user', {
      rules: [{
        required: true,
        message: '用户名不能为空！'
      }, {
        min: 5,
        max: 15,
        message: '用户名大于5位小于15位！！'
      }]
    });
    const passwdProps = getFieldProps('password', {
      rules: [{
        required: true,
        whitespace: true,
        message: '密码不能为空！'
      }, {
        min: 6,
        max: 18,
        message: '密码大于6位小于18位！'
      }, ]
    });

    return (
      <Row className="login-row" type="flex" justify="space-around" align="middle">
          <Col span="8">
            <Form horizontal form={this.props.form} onSubmit={this.handleSubmit} className="form-login">
              <row>
                <Col span='20' offset='2'>
                  <div className="header-title"><i className="fa fa-sign-in"></i>登录</div>
                </Col>
              </row>
              <FormItem
                label='用户名：'
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}>
                <Input placeholder='请输入账号' {...nameProps}/>
              </FormItem>
              <FormItem
                label='密码：'
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}>
                <Input type='password' placeholder='请输入密码'  {...passwdProps} />
              </FormItem>
               <Row>
                  <Col span='10' offset='6'><Checkbox {...getFieldProps('agreement',{initialValue:false})}>记住我</Checkbox></Col>
                  <Col span='4' className="text-right"><a>忘记密码？</a></Col>
              </Row>
              <Row>
                <Col span='14' offset='6'>
                    <Button type="primary" size="large" htmlType="submit" className="login-btn" loading={this.props.loading}>确定</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
    )
  }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

Login.propTypes = {
  uid: PropTypes.string,
  loggingIn: PropTypes.bool,
  loginErrors: PropTypes.string,
  loading: PropTypes.bool,
}

Login = Form.create()(Login);

function mapStateToProps(state) {
  const {
    user
  } = state;
  if (user.uid) {
    return {
      uid: user.uid,
      loggingIn: user.loggingIn,
      loginErrors: '',
      loading: true
    };
  }
  return {
    uid: null,
    loggingIn: user.loggingIn,
    loginErrors: user.loginErrors,
    loading: false
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      login
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)