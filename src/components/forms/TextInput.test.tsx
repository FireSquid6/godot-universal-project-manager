import renderer from 'react-test-renderer';
import TextInput from './TextInput';


/**
 * @jest-environment jsdom
 */



describe('renders without crashing', () => {
  test('Component is rendered without breaking changes', () => {
    const component = renderer.create(
      <TextInput label="Test Label" inputId=""/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});