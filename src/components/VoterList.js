import React, { Component } from 'react'
import { Container, Header, Segment } from 'semantic-ui-react'
import _ from 'lodash'
import firebase from '../firebase'

class VoterList extends Component {
  state = {
    candidates: [],
    voters: [],
    loading: true,
  }

  componentDidMount() {
    firebase.database().ref('items').on('value', (data) => {
      const items = data.val();
      const candidates = []
      const voters = []
      for (let key in items) {
        let item = items[key]
        const count = _.countBy(item.voters.split(',').filter(x => x))
        candidates.push(item.name)
        voters.push(count)
      }
      this.setState({
        candidates,
        voters,
      })
    })
  }

  render() {
    const results = []
    this.state.voters.forEach((voter, i) => {
      results.push(<h2>{this.state.candidates[i]}</h2>)
      for (let key in voter) {
        let numOfVotes = voter[key]
        results.push(<div>{key} ({numOfVotes})</div>)
      }
    })

    return (
      <Container>
        <Segment>
          <Header as='h1'>Voter List</Header>
          {results}
        </Segment>
      </Container>
    )
  }
}

export default VoterList
