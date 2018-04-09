import React, {PureComponent} from 'react';
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Nav,
  Table,
} from 'reactstrap';
import map from 'lodash/map';
import find from 'lodash/find';
import get from 'lodash/get';
import first from 'lodash/first';
import filter from 'lodash/filter';
import has from 'lodash/has';
import {connect} from 'react-redux';

import config from '../../config.json';

const getShortDay = day => day.toLowerCase().substr(0, 3);
const getFirstDay = (hours) => {
  for (const day of config.days) {
    if (has(hours, `${getShortDay(day)}_1_open`)) {
      return day;
    }
  }
};

class Grid extends PureComponent {
  state = {
    toggled: map(this.props.locations, ({id}) => ({id, toggled: false})),
    selectedDay: map(this.props.locations, ({id, hours}) => ({id, day: getFirstDay(hours)})),
  };
  render = () => {
    console.log(this.state);
    return this.render2();
  };
  render2 = () => (
    <Table className="table table-response-sm table-hover table-outline mb-0">
      <thead className="thead-light">
        <tr>
          <th className="text-center">
            <i className="icon-location" />
            <strong>Locations</strong>
          </th>
          <th>
            <i className="icon-clock" />
            <strong>Hours</strong>
          </th>
          <th>
            <i className="icon-phone" />
            <strong>Phone</strong>
          </th>
        </tr>
      </thead>
      <tbody>
        {map(this.props.locations, location => (
          <tr key={location.id}>
            <td>
              {location.location.street}
            </td>
            <td>
              <Nav tabs>
                <Dropdown
                  nav
                  isOpen={this.isOpen(location.id)}
                  toggle={() => this.onToggle(location.id)}
                >
                  <DropdownToggle nav caret>
                    {this.getSelectedDay(location.id)}
                  </DropdownToggle>
                  <DropdownMenu>
                    {map(
                      filter(config.days, day => has(
                        location.hours,
                        `${getShortDay(day)}_1_open`,
                      )),
                      day => (
                        <DropdownItem
                          key={day}
                          disabled={day === this.getSelectedDay(location.id)}
                          onClick={() => this.selectDay(location.id, day)}
                        >
                          {day}
                        </DropdownItem>
                      )
                    )}
                  </DropdownMenu>
                </Dropdown>
              </Nav>
              <div>{this.displayHours(location.id)}</div>
            </td>
            <td>{location.phone}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
  isOpen = id => get(find(this.state.toggled, {id}), 'toggled');
  onToggle = id => this.setState({toggled: map(
    this.state.toggled,
    location => {
      if (location.id === id) {
        return {id, toggled: !location.toggled};
      }
      return location;
    }
  )});
  getSelectedDay = id => get(find(this.state.selectedDay, {id}), 'day');
  selectDay = (id, day) => this.setState({selectedDay: map(
    this.state.selectedDay,
    location => {
      if (location.id === id) {
        return {id, day};
      }
      return location;
    }
  )});
  displayHours = (id) => {
    const day = this.getSelectedDay(id);
    const short = day.toLowerCase().substr(0, 3);
    const location = find(this.props.locations, {id});
    const open = `${short}_1_open`;
    const close = `${short}_1_close`;
    return `${location.hours[open]} - ${location.hours[close]}`;
  };
}

const selector = state => ({locations: state.locations});

export default connect(selector)(Grid);
