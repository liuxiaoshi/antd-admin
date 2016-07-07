import React from 'react'
import {
  Row,
  Col,
  Collapse,
  Alert
} from 'antd';
const Panel = Collapse.Panel;

import PanelBox from '../../components/PanelBox';

import Line from '../../components/Echarts/Line';
import Pie from '../../components/Echarts/Pie';
import Bar from '../../components/Echarts/Bar';
import NProgress from 'nprogress';

import Layout from '../Layout'

import './index.less'

const lineData = [{
  name: '衣服',
  data: [5, 20, 36, 15, 10, 20, 10, 8, 20, 13, 11, 60]
}, {
  name: '袜子',
  data: [15, 2, 5, 30, 18, 30, 5, 15, 3, 20, 7, 40]
}, {
  name: '外套',
  data: [10, 15, 20, 5, 30, 5, 15, 7, 30, 10, 23, 20]
}]
const pieData = [{
  value: 335,
  name: '直接访问'
}, {
  value: 310,
  name: '邮件营销'
}, {
  value: 234,
  name: '联盟广告'
}, {
  value: 135,
  name: '视频广告'
}, {
  value: 1548,
  name: '搜索引擎'
}]


const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export default class Home extends React.Component {
  constructor() {
    super()
  }


  componentWillMount() {
    NProgress.start();
  }

  componentDidMount() {
    NProgress.done();
  }

  callback() {

  }

  render() {
    const detail = (
      <Collapse defaultActiveKey={['1','2','3']} onChange={this.callback}>
        <Panel header="This is panel header 1" key="1">
          <p>{text}</p>
        </Panel>
        <Panel header="This is panel header 2" key="2">
          <p>{text}</p>
        </Panel>
        <Panel header="This is panel header 3" key="3">
          <p>{text}</p>
        </Panel>
      </Collapse>
    )

    return (
      <Layout {...this.props}>
        <div className="main-wrapper">
          <Row className="m-15">
            <Col md={24}>
              <Alert message="消息提示的文案" description="消息提示的辅助性文字介绍消息提示的辅助性文，字介绍消息提示的辅助性文字介绍" type="info" showIcon />
            </Col>
          </Row>
          <Row className="m-15">
            <PanelBox title="最近的数据">
              <Row>
                <Col span="16">
                  <Line title="销量统计图" data={lineData} xAxisData={["一月", "二月", "三月", "四月", "五月", "六月",'七月', '八月', '九月', '十月', '十一月', '十二月']} className="line-chart" height="340px" width="100%" />
                </Col>
                <Col span="8">
                  <Pie title="来源访问统计图" data={pieData} className="line-chart" height="340px" width="100%" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Bar title="销量统计图" data={lineData} xAxisData={["一月", "二月", "三月", "四月", "五月", "六月",'七月', '八月', '九月', '十月', '十一月', '十二月']} className="line-chart" height="340px" width="100%" />
                </Col>
              </Row>
            </PanelBox>
          </Row>
          
           
          <Row className="m-15" type="flex" justify="space-between">
            <Col span="11">
              {detail}
            </Col>
            <Col span="2">
              {/**/}
            </Col>
            <Col span="11">
              {detail}
            </Col>
          </Row>
        </div>
      </Layout>
    )
  }
}