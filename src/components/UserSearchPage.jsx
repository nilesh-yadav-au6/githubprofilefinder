import React, { Component } from "react";
import {
  Container,
  ListGroupItem,
} from "react-bootstrap";
import { addRepoToManager } from "../redux/actions/managerListAction";
import { searchByUser } from "../redux/actions/githubAction";
import { connect } from "react-redux";
import Spinner from "./Spinner"
import {NotificationManager} from 'react-notifications';
import "../styles/UserPage.css"

class UserSearchPage extends Component {
  state = {
    reponame: "",
    repourl: "",
  };

  handleClick = (name, url) => {
    this.setState({ reponame: name });
    this.setState({ repourl: url });
    setTimeout(() => {
      this.props.addRepoToManager({
        name: this.state.reponame,
        url: this.state.repourl,
      });
      NotificationManager.success('Success message', 'Repository Added to ManagerBoard');
    }, 1000);
  };

  pagination = (name, e) => {
    this.props.searchByUser(name, e.target.value);
  };
  render() {
    return (
      <div>
        {this.props.user !== null ? (
          <Container>
            <h3>{ this.props.user.name}</h3>
            <img
              style={{ width: "6rem", height: "6rem" }}
              src={this.props.user.avatar_url}
              alt="profile"
            />

            <div>
              {this.props.repos !== null
                ? this.props.repos.map((repo) => (
                    <div key={repo.name}>
                    <div style={{ display: "flex", marginTop:"0.5rem" , width:"100%" ,justifyContent:"center"}}>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{textDecoration:"none"}}
                      >
                        <ListGroupItem className="repo-list">{repo.name}</ListGroupItem>
                      </a>
                        <button
                          name="list"
                          className="span-tag"
                          onClick={() =>
                            this.handleClick(repo.name, repo.html_url)
                          }
                          data-testid="click"
                        >
                          +
                        </button>
                    </div>
                  </div>
                  ))
                : <Spinner />}
            </div>
            <div style={{marginTop:"50px"}}>
            {this.props.repos !== null
              ? (() => {
                  const options = [];
                  for (let i = 1; i <= Math.ceil(this.props.count / 20); i++) {
                    options.push(
                      <button
                        className={"no-focusborder"}
                        style={{
                          textDecoration: "none",
                          width: "40px",
                          background: "#0dd3ff",
                          borderRadius: "25px",
                          color: "white",
                          margin: "2px",
                        }}
                        onClick={(e) =>
                          this.pagination(this.props.user.login, e)
                        }
                        key={i}
                        value={i}
                      >
                        {i}
                      </button>
                    );
                  }
                  return options;
                })()
              : null}
            </div>
          </Container>
        ) : null}
      </div>
    );
  }
}

export default connect(null, { addRepoToManager, searchByUser })(
  UserSearchPage
);
