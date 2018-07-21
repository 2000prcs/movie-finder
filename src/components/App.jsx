import React, { Component } from 'react';
import Search from '../components/Search.jsx';
import Movies from '../components/Movies.jsx';

export default class App extends React.Component {
 constructor(props){
  super(props);
  this.state = {};
 }

  render() {
    return (
      <div className="container">
        <Search />
        <div className="main">
          <Movies />
        </div>
      </div>
    );
  }
}
