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
    candidates: [],
    loading: true,
    text: '',
  }

  handleChange = (e) => {
    const text = e.target.value
    this.setState({
      text
    })
  }

  resetVote = () => {
    const { candidates } = this.state
    candidates.forEach(c => {
      firebase.database().ref(`items/${c.key}`).set({
        name: c.name,
        count: 0,
      })
    })
    this.setState({
      isVoted: false,
    })
  }

  clearList = () => {
    const ref = firebase.database().ref('items')
    ref.remove()
    this.setState({
      candidates: [],
      text: '',
    })
  }

  addCandidate = () => {
    const { candidates, text } = this.state
    if (text !== '' ) {
      let item = {
        name: text,
        count: 0,
      }
      const newItem = firebase.database().ref('items').push(item)
      item.key = newItem.key
      this.setState({
        candidates: candidates.concat(item),
        text: '',
      })
    }
  }

  handleSubmit = () => {
    this.addCandidate()
  }

  componentDidMount() {
    firebase.database().ref('items').on('value', (data) => {
      const items = data.val()
      let candidates = [];
      for (let key in items) {
        let item = items[key]
        item.key = key
        candidates.push(item)
      }
      this.setState({
        candidates,
        loading: false
      })
    })
  }

  render() {
    const { candidates, loading, text } = this.state

    return (
      <Container>
        <Segment>
          <Header as='h1'>Add Your Candidate</Header>
          <Button onClick={this.resetVote}>Reset Vote</Button>
          <Button onClick={this.clearList}>Clear List</Button>
          <Divider hidden />
          <div>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Input
                  placeholder='Candidate Name'
                  onChange={this.handleChange}
                  value={text}
                />
                <Form.Button content='Add' />
              </Form.Group>
            </Form>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <List bulleted>
                {
                  candidates.map(c  => (
                    <List.Item key={c.key}>{c.name}</List.Item>
                  ))
                }
              </List>
            )}
          </div>
        </Segment>
      </Container>
    )
  }
}

export default NewCandidate
