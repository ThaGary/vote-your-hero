import React from 'react'

const CandidateList = ({ candidates }) => {
  return (
    <ol>
      {candidates.map((candidate, i) => <li key={i}>{candidate}</li>)}
    </ol>
  )
}

export default CandidateList
