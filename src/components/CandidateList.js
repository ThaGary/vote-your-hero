import React, { Component } from 'react'

class CandidateList extends React.Component {
  render() {
    const { candidates } = this.props

    return (
      <ol>
        {candidates.map((candidate, i) => <li key={i}>{candidate}</li>)}
      </ol>
    )
  }
}

export default CandidateList
