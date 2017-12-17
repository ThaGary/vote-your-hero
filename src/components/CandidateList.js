import React from 'react'
import PropTypes from 'prop-types'

class CandidateList extends React.Component {
  static propTypes = {
    candidates: PropTypes.array,
  }

  render() {
    const { candidates } = this.props

    return (
      <React.Fragment>
        <h1>Candidate List</h1>
        <ol>
          {candidates.map((candidate, i) => <li key={i}>{candidate}</li>)}
        </ol>
      </React.Fragment>
    )
  }
}

export default CandidateList
