import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/SearchPage.css";
import UserSearched from "./UserSearchPage";
import RepoSearched from "./RepoSearchPage";
import { connect } from "react-redux";
import { searchByUser, searchByRepo ,remove } from "../redux/actions/githubAction";
import {NotificationContainer , NotificationManager} from 'react-notifications';

class SearchPage extends Component {
  state = {
    user: "",
    repo: "",
    isUser: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmitUser = (e) => {
    e.preventDefault();
    if(!this.state.user){
      NotificationManager.error('Error message', 'Please Entre the User Name');
      return
    }
    this.props.searchByUser(this.state.user);
  };

  handleSubmitRepo = (e) => {
    e.preventDefault();
    if(!this.state.repo){
      NotificationManager.error('Error message', 'Please Entre the Repository Name');
      return
    }
    console.log(this.state.repo);
    this.props.searchByRepo(this.state.repo);
  };
  handleCheckbox = (e) => {
    this.setState({ isUser: !this.state.isUser });
    this.props.remove()
    this.setState({user:""})
    this.setState({repo:""})
    setTimeout(() => {this.props.history.push("/search")},1000)
  };

  render() {
    return (
      <div className={this.state.isUser ? "main-search" : "main"}>
        <span className="text">User</span>
        <label className="switch">
          <input type="checkbox" onChange={this.handleCheckbox} />
          <span className="slider round"></span>
        </label>
        <span className="text">Repository</span>
        <div className="form">
        {this.state.isUser ? (
          <div className="form">
            <Form onSubmit={this.handleSubmitRepo}>
            <input
              type="txt"
              name="repo"
              value={this.state.repo}
              placeholder="Search By Repository"
              onChange={this.handleChange}
            />
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <RepoSearched
              repos={this.props.repositorySearched}
              reponame={this.state.repo}
              rcount={this.props.count}
            />
          </Form>
          </div>
        ) : (
          <div className="form">
            <Form onSubmit={this.handleSubmitUser} >
              <input
                type="text"
                name="user"
                value={this.state.user}
                placeholder="Search By Users"
                onChange={this.handleChange}
              />
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Form>
            <UserSearched
              user={this.props.userDetaill}
              repos={this.props.repos}
              count={this.props.count}
            />
          </div>
        )}
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    userDetaill: state.user.user,
    repos: state.user.repos,
    count: state.user.count,
    repositorySearched: state.user.repository,
  };
};

export default connect(mapStateToProp, { searchByUser, searchByRepo , remove})(
  SearchPage
);
