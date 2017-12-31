import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import firebase from '../firebase'

class NewCandidate extends Component {
  state = {
    text: '',
    candidates: [],
    loading: true,
  }

  handleChange = (e) => {
    const text = e.target.value
    this.setState({
      text
    })
  }

  clearList = () => {
    const ref = firebase.database().ref('votes')
    ref.remove()
    this.setState({
      candidates: [],
    })
  }

  addCandidate = () => {
    let { text, candidates } = this.state
    if (text !== '' ) {
      const ref = firebase.database().ref(`votes/${text}`)
      ref.update({
        count: 0
      })
      candidates.push(text)
      this.setState({
        candidates,
        text: '',
      })
    }
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.addCandidate()
    }
  }

  componentDidMount() {
    let refVotes = firebase.database().ref('votes')
    refVotes.once('value', (snapshot) => {
      if (snapshot.val() !== null) {
        const candidates = Object.keys(snapshot.val())
        this.setState({
          candidates,
        })
      }
      this.setState({
        loading: false,
      })
    })
  }

  handleClick = () => {
    this.addCandidate()
  }

  render() {
    return (
      <div>
        <Button onClick={this.clearList}>Clear List</Button>
        <div>
          <input type="text" onChange={this.handleChange} onKeyPress={this.handleKeyPress} value={this.state.text} />
          <button onClick={this.handleClick}>Add</button>
          {this.state.loading ? (
            <div>Loading...</div>
          ) : (
            <ul>
              {this.state.candidates.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default NewCandidate
