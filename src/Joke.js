import React, { Component } from 'react';

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
        <span>
          {`${joke} ${score}`}
          <i onClick={this.handleUpVoteClick} className="far fa-thumbs-up" />
          <i
            onClick={this.handleDownVoteClick}
            className="far fa-thumbs-down"
          />
        </span>
      </div>
    );
  }
}

export default Joke;
