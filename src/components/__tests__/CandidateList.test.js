import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme';
import CandidateList from '../CandidateList'

describe('<CandidateList />', () => {
  it('renders list of candidates', () => {
    const wrapper = shallow(<CandidateList candidates={['Kan', 'Mils']} />)
    console.log(wrapper)
    expect(wrapper.html()).toEqual('<h1>Candidate List</h1><ol><li>Kan</li><li>Mils</li></ol>')
  })
})
