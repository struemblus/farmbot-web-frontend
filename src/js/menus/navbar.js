import React from 'react';

export var Navbar = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default drop-shadow ng-scope" ng_app="farmbot" ng_controller="nav" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <button className="navbar-toggle" data-target="#navbar" data-toggle="collapse" type="button">
              <span className="glyphicon glyphicon-menu-hamburger" />
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="nav navbar-nav">
              <li>
                <a href="#s/designer">Farm Designer</a>
              </li>
              <li>
                <a href="#s/controls">Controls</a>
              </li>
              <li>
                <a href="#s/devices">Devices</a>
              </li>
              <li>
                <a href="#s/sequences">Sequences</a>
              </li>
              <li>
                <a href="#s/schedules">Schedules</a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <syncbutton className="nav-status-buttons ng-isolate-scope" schedules="schedules"><button className="button-like yellow" type="button"> Sync Now <i className="fa fa-upload" /> </button> <div className="last-sync ng-binding">LAST SYNC: ---</div></syncbutton>
              </li>
              <li>
                <stopbutton className="nav-status-buttons ng-isolate-scope"><button className="red button-like" type="button">Stop</button></stopbutton>
              </li>
              <li>
                <a href="/users/sign_out">Sign out</a>
              </li>
              <li>
                <a href="/users/edit">My Account</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});
