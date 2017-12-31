import React, { Component } from 'react'
import firebase from '../firebase'
import BarChart from 'react-bar-chart'

class Result extends Component {
  state = {
    data: [],
    loading: true,
  }

  componentDidMount() {
    let refVotes = firebase.database().ref('votes')
    refVotes.on('value', (snapshot) => {
      for (let candidate in snapshot.val()) {
        let ref = firebase.database().ref(`votes/${candidate}`)
        ref.once('value', (snapshot) => {
          let count = 0
          if (snapshot.val() !== null) {
            count = snapshot.val().count
          }
          this.setState({
            data: [
              ...this.state.data,
              {
                text: candidate,
                value: count,
              }
            ]
          })
        })
      }
      this.setState({
        loading: false,
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
