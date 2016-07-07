import React from 'react'
import {
  Row,
  Col,
  Collapse,
  Alert
} from 'antd';

import {
  connect
} from 'react-redux';
const Panel = Collapse.Panel;

import PanelBox from '../../components/PanelBox';

import Line from '../../components/Echarts/Line';
import Pie from '../../components/Echarts/Pie';
import Bar from '../../components/Echarts/Bar';
import Sidebar from '../Sidebar';
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

export default class System extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {
      children
    } = this.props;
    return (
      <Layout {...this.props}>
        <div className="main-wrapper">
          <Row>
            <Sidebar {...this.props}/>
              {children || <Col lg={20} md={18} sm={24} xs={24} className="main-container">
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
              </Col>}
          </Row>
        </div>
      </Layout>
    )
  }
}

export default (System);