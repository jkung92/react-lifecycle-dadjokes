import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import './JokeList.css';

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = { jokes: [], done: null };
  }

  async componentDidMount() {
    let localJokes = JSON.parse(localStorage.getItem('jokes'));
    if (localJokes) {
      this.setState({ jokes: localJokes, done: true });
    } else {
      setTimeout(this.getJokesFromAPI, 1000);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // localStorage.getItem('jokes', this.state.jokes)
    localStorage.setItem('jokes', JSON.stringify(this.state.jokes));
  }

  getJokesFromAPI = async () => {
    let randomPage = Math.ceil(Math.random() * 53);
    let response = await axios.get(`https://icanhazdadjoke.com/search`, {
      headers: { Accept: 'application/json' },
      params: { page: randomPage, limit: 10 }
    });
    let jokes = response.data.results.map(jokeObj => ({
      ...jokeObj,
      score: 0
    }));
    this.setState({ jokes, done: true });
  };

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
    // sort newJokeArr by highest score first
    newJokesArr.sort((prevItem, nextItem) => nextItem.score - prevItem.score);
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
    // sort newJokeArr by highest score first
    newJokesArr.sort((prevItem, nextItem) => nextItem.score - prevItem.score);
    this.setState({ jokes: newJokesArr });
  };

  renderJokes() {
    return (
      <div>
        {this.state.jokes.map(jokeObj => (
          <Joke
            key={jokeObj.id}
            jokeDetails={jokeObj}
            upVote={this.upVote}
            downVote={this.downVote}
          />
        ))}
        <button onClick={this.getJokesFromAPI}> Get new jokes!</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1> I Can Has Dad Jokes!</h1>

        {this.state.done ? (
          this.renderJokes()
        ) : (
          <div>
            <div>
              {' '}
              <i className="fas fa-spinner fa-5x" />{' '}
            </div>
            <div>Loading...</div>
          </div>
        )}
      </div>
    );
  }
}

export default JokeList;
