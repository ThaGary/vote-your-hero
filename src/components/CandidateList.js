import React from 'react'

const CandidateList = ({ candidates }) => {
  return (
    <React.Fragment>
      <h1>Candidate List</h1>
      <ol>
        {candidates.map((candidate, i) => <li key={i}>{candidate}</li>)}
      </ol>
    </React.Fragment>
  )
}

export default CandidateList
