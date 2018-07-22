import React from 'react';
import sinon from 'sinon';
import "isomorphic-fetch";
import Movies from '../src/components/Movies.jsx';


describe('Movies component', () => {
  test('Should render Movies', () => {
    const AppWrapper = shallow(<Movies />);
    expect(AppWrapper).toMatchSnapshot();
  });

});