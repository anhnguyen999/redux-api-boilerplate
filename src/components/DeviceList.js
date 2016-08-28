import React, { Component } from 'react';

export default class DeviceList extends Component {
  static propTypes = {
    devices: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onDeviceClick: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  _onDeviceClick() {
    console.log("device click");
  }

  render() {
    return (
      <div>
        <p>Device List</p>
        <ul>
          {this.props.devices.map(device => (
            <li key={device.id}>
              {`${device.name} - ${device.status}`}
              <span
                style={{marginLeft: 5}}
                onClick={() => this.props.onDeviceClick(device.id)}>
                Toggle
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
