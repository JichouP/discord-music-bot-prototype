import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';

test('There is any children in root.', () => {
  const component = renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
