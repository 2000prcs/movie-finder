import React from 'react';
import sinon from 'sinon';
import "isomorphic-fetch";
import App from '../src/components/App.jsx';


describe('App component', () => {
  test('Should render App', () => {
    const AppWrapper = shallow(<App />);
    expect(AppWrapper).toMatchSnapshot();
  });

  test('Should fetch popular movies data from API upon mounting', () => {
    sinon.spy(App.prototype, 'fetchMovieData');
    const AppWrapper = mount(<App />);
    expect(App.prototype.fetchMovieData.calledOnce).toBe(true);
    App.prototype.fetchMovieData.restore();
    AppWrapper.unmount();
  });

  test('Should fetch movies data from API when user types a keyword', () => {
    const AppWrapper = mount(<App />);
    AppWrapper.setState({ activePage: 1, keyword: 'cat' });
    AppWrapper.instance().fetchMovieData(1, 'cat');
    AppWrapper.update();
    console.log(AppWrapper.state());
    expect(AppWrapper.state().movie).toBe(true);
    AppWrapper.unmount();
  });

});