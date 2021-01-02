import React from 'react';
import renderer from 'react-test-renderer';
import App from './index'

test('html layout is renderer correctly', () => {
  const component = renderer.create(
    <App />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});
