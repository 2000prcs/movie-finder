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

  test('Should set a new search keyword when user types a keyword', () => {
    const AppWrapper = mount(<App />);
    AppWrapper.setState({ activePage: 1, keyword: '' });
    AppWrapper.find('input').simulate('change', { target: { value: 'cat' } }); // Mock event object, for testing purposes
    AppWrapper.update();
    expect(AppWrapper.state().keyword).toBe('cat');
    AppWrapper.unmount();
  });

  test('Should change current page value when user clicks a different page number', () => {
    sinon.spy(App.prototype, 'handlePaginationChange');
    const AppWrapper = mount(<App />);
    AppWrapper.setState({ activePage: 1, keyword: '' });
    const e = { target: { value: 3 } }; // Mock event object, for testing purposes
    AppWrapper.instance().handlePaginationChange(e, { activePage: 3 });
    AppWrapper.update();
    expect(AppWrapper.state().activePage).toBe(3);
    AppWrapper.unmount();
  });
});
