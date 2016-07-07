import React from 'react'

import './index.less'

export default class Footer extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <footer>
        <ul>
          <li>
            <div>©2016 XX科技股份有限公司</div>
          </li>
        </ul>
      </footer>
    )
  }
}