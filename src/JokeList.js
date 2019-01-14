import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = { jokes: [] };
  }

  async componentDidMount() {
    let randomPage = Math.ceil(Math.random() * 53);
    let response = await axios.get(`https://icanhazdadjoke.com/search`, {
      headers: { Accept: 'application/json' },
      params: { page: randomPage, limit: 10 }
    });
    let jokes = response.data.results.map(jokeObj => ({
      ...jokeObj,
      score: 0
    }));
    this.setState({ jokes });
  }

  upVote = id => {
    // Create a copy of non-primitive state object
    let newJokesArr = this.state.jokes.map(jokeObj => {
      return { ...jokeObj };
    });
    // find index with the matching jokeID to modify
    let targetJokeIndex = newJokesArr.findIndex(jokeObj => {
      return id === jokeObj.id;
    });
    // update score
    newJokesArr[targetJokeIndex].score++;
    this.setState({ jokes: newJokesArr });
  };

  downVote = id => {
    // Create a copy of non-primitive state object
    let newJokesArr = this.state.jokes.map(jokeObj => {
      return { ...jokeObj };
    });
    // find index with the matching jokeID to modify
    let targetJokeIndex = newJokesArr.findIndex(jokeObj => {
      return id === jokeObj.id;
    });
    // update score
    newJokesArr[targetJokeIndex].score--;
    this.setState({ jokes: newJokesArr });
  };

  render() {
    return (
      <div>
        <h1> I Can Has Dad Jokes!</h1>
        {this.state.jokes.map(jokeObj => (
          <Joke
            jokeDetails={jokeObj}
            upVote={this.upVote}
            downVote={this.downVote}
          />
        ))}
      </div>
    );
  }
}

export default JokeList;
