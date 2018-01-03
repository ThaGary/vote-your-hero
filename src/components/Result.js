import React, { Component } from 'react'
import firebase from '../firebase'
import BarChart from 'react-bar-chart'

class Result extends Component {
  state = {
    data: [],
    loading: true,
  }

  componentDidMount() {
    const refVotes = firebase.database().ref('votes')
    refVotes.on('value', (snapshot) => {
      let items = []
      for (let candidate in snapshot.val()) {
        const ref = firebase.database().ref(`votes/${candidate}`)
        ref.once('value', (snapshot) => {
          let count = 0
          if (snapshot.val() !== null) {
            count = snapshot.val().count
          }
          items.push({
            text: candidate,
            value: count,
          })
        })
      }
      this.setState({
        loading: false,
        data: items,
      })
    })
  }

  render() {
    const width = 700
    const height = 400
    const margin = {left: 100, right: 100, top: 50, bottom: 50}

    return (
      <div>
        <BarChart
          width={width}
          height={height}
          margin={margin}
          data={this.state.data}
        />
      </div>
    )
  }
}

export default Result
