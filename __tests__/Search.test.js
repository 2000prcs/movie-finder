import React from 'react';
import sinon from 'sinon';
import "isomorphic-fetch";
import Search from '../src/components/Search.jsx';


describe('Search component', () => {
  test('Should render Search', () => {
    const AppWrapper = shallow(<Search />);
    expect(AppWrapper).toMatchSnapshot();
  });

});