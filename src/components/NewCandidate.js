import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  List,
  Segment
} from 'semantic-ui-react'
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

  handleSubmit = () => {
    this.addCandidate()
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

  render() {
    return (
      <Container>
        <Segment>
          <Header as='h1'>Add Your Candidate</Header>
          <Button onClick={this.clearList}>Clear List</Button>
          <Divider hidden />
          <div>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Input
                  placeholder='Candidate Name'
                  onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress}
                  value={this.state.text}
                />
                <Form.Button content='Add' />
              </Form.Group>
            </Form>
            {this.state.loading ? (
              <div>Loading...</div>
            ) : (
              <List bulleted>
                {this.state.candidates.map((c, i) => <List.Item key={i}>{c}</List.Item>)}
              </List>
            )}
          </div>
        </Segment>
      </Container>
    )
  }
}

export default NewCandidate
