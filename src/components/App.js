import React, { Component } from 'react'
import { Button, Container, Segment } from 'semantic-ui-react'
import Admin from './Admin'
import Home from './Home'
import { auth, provider } from '../firebase'

class App extends Component {
  state = {
    user: null,
    loading: true,
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
      }
      this.setState({
        loading: false
      })
    })
  }

  login = () => {
    auth.signInWithRedirect(provider)
      .then((result) => {
        const user = result.user
        this.setState({
          user,
          loading: false
        })
      })
  }

  render() {
    const baseUrl = '/vote-your-hero/'
    const currentPath = window.location.pathname

    return (
      <React.Fragment>
        {(
          currentPath === baseUrl ||
          currentPath === baseUrl.substr(0, baseUrl.length - 1) ||
          currentPath === '/'
        ) ?
        (
          this.state.user ?
            this.state.loading ? 'Loading...' : <Home />
          :
            this.state.loading ? 'Loading...' : <Container>
              <Segment>
                <Button onClick={this.login}>Log In</Button>
              </Segment>
            </Container>
        ) :
        (
          <Admin baseUrl={baseUrl} />
        )}
      </React.Fragment>
    )
  }
}

export default App
