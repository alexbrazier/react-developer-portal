import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../Home';
import router from '../../tests/router';

function setup() {
  const fakeApps = [
    {
      id: 'test1',
      name: 'test 1',
      logo: 'logo',
    },
    {
      id: 'test2',
      name: 'test 2',
      logo: 'logo',
    },
  ];
  const props = {
    getApps: jest.fn(),
    editApp: jest.fn(),
    updateApp: jest.fn(),
    apps: fakeApps,
  };

  const wrapper = shallow(<Home {...props} />, router);

  return {
    props,
    wrapper,
  };
}

describe('<Home />', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div').first().hasClass('Home')).toBe(true);
    expect(wrapper.find('AppCard')).toHaveLength(2);
  });

  it('should only render EditAppModal once editing requested', () => {
    const { wrapper, props } = setup();
    expect(wrapper.find('EditAppModal')).toHaveLength(0);
    wrapper.setProps({ editingApp: props.apps[0] });
    expect(wrapper.find('EditAppModal')).toHaveLength(1);
  });

  it('should call getApps initially', () => {
    const { props } = setup();
    expect(props.getApps).toHaveBeenCalledTimes(1);
  });

  describe('onEdit', () => {
    it('should call props.onEdit with app', () => {
      const { wrapper, props } = setup();
      expect(props.editApp).toHaveBeenCalledTimes(0);
      wrapper.instance().onEdit(props.apps[0]);
      expect(props.editApp).toHaveBeenCalledTimes(1);
      expect(props.editApp).toHaveBeenCalledWith(props.apps[0]);
    });
  });

  describe('onEditClose', () => {
    it('should call props.onEdit with nothing', () => {
      const { wrapper, props } = setup();
      expect(props.editApp).toHaveBeenCalledTimes(0);
      wrapper.instance().onEditClose();
      expect(props.editApp).toHaveBeenCalledTimes(1);
      expect(props.editApp).toHaveBeenCalledWith();
    });
  });

  describe('onEditSubmit', () => {
    it('should call props.onEdit with nothing', () => {
      const { wrapper, props } = setup();
      expect(props.updateApp).toHaveBeenCalledTimes(0);
      wrapper.instance().onEditSubmit(props.apps[0]);
      expect(props.updateApp).toHaveBeenCalledTimes(1);
      expect(props.updateApp).toHaveBeenCalledWith(props.apps[0]);
    });
  });
});
