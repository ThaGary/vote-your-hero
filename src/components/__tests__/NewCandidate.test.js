import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme';
import NewCandidate from '../NewCandidate'

describe('<NewCandidate />', () => {
  it('renders input for new candidate', () => {
    const wrapper = shallow(<NewCandidate />)
    console.log(wrapper)
    expect(wrapper.html()).toEqual('<div><input type="text"/><button>Add</button></div>')
  })
})
