import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component {
  static defaultProps = {
    upVote: () => console.log('upvote'),
    downVote: () => console.log('downvote'),
    jokeText: 'test joke here',
    score: 0
  };

  handleUpVoteClick = () => {
    this.props.upVote(this.props.jokeDetails.id);
  };

  handleDownVoteClick = () => {
    this.props.downVote(this.props.jokeDetails.id);
  };

  render() {
    let { joke, score } = this.props.jokeDetails;
    return (
      <div>
        <span>{joke}</span>
        <i onClick={this.handleUpVoteClick} className="far fa-thumbs-up" />
        <span className="score">{score}</span>
        <i onClick={this.handleDownVoteClick} className="far fa-thumbs-down" />
      </div>
    );
  }
}

export default Joke;
