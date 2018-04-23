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
import firebase, { auth, provider } from '../firebase'

class NewCandidate extends Component {
  state = {
    candidates: [],
    loading: true,
    text: '',
    user: null
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
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
      }
    })

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

  login = () => {
    auth.signInWithRedirect(provider)
      .then((result) => {
        const user = result.user
        this.setState({
          user
        })
      })
  }

  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        })
      })
  }

  render() {
    const { candidates, loading, text } = this.state

    return (
      <Container>
        {this.state.user ? this.state.user.email : ''}
        {this.state.user ?
          <Button onClick={this.logout}>Logout</Button>
        :
          <Button onClick={this.login}>Log In</Button>
        }
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
