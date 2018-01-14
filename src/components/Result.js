import React, { Component } from 'react'
import { Container, Header, Segment } from 'semantic-ui-react'
import BarChart from 'react-bar-chart'
import firebase from '../firebase'

class Result extends Component {
  state = {
    data: [],
    loading: true,
  }

  componentDidMount() {
    firebase.database().ref('items').on('value', (data) => {
      const items = data.val();
      let candidates = []
      for (let key in items) {
        let item = items[key]
        candidates.push({
          text: item.name,
          value: item.count,
        })
      }
      this.setState({
        data: candidates,
        loading: false
      })
    })
  }

  render() {
    const width = 700
    const height = 400
    const margin = {left: 100, right: 100, top: 50, bottom: 50}

    return (
      <Container>
        <Segment>
          <Header as='h1'>The Winner is...</Header>
          <BarChart
            width={width}
            height={height}
            margin={margin}
            data={this.state.data}
          />
        </Segment>
      </Container>
    )
  }
}

export default Result
