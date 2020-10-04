import React, { Component } from "react";
import {
  Container,
  ListGroupItem,
} from "react-bootstrap";
import { addRepoToManager } from "../redux/actions/managerListAction";
import { connect } from "react-redux";
import { searchByRepo } from "../redux/actions/githubAction";
import Spinner from "./Spinner"
import {NotificationManager} from 'react-notifications';

class RepoSearchPage extends Component {
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
    console.log(name, e.target.value);
    this.props.searchByRepo(name, e.target.value);
  };

  render() {
    return (
      <div>
        <Container>
          <h3>
            {this.props.repos !== null ? (
              <div>
                {this.props.repos.length !== 0
                  ? this.props.repos.map((repo, index) => (
                      <div key={index}>
                        <div style={{ display:"flex", marginTop:"0.5rem" , width:"100%" ,justifyContent:"center"}}>
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{textDecoration:"none"}}
                          >
                            <ListGroupItem className="repo-list">{repo.name}</ListGroupItem>
                          </a>
                            <span
                              name="list"
                              className="span-tag"
                              onClick={() =>
                                this.handleClick(repo.name, repo.html_url)
                              }
                            >
                              +
                            </span>
                        </div>
                      </div>
                    ))
                  : <Spinner />}
              </div>
            ) : null}
          </h3>
          <div style={{marginTop:"50px"}}>
          {this.props.repos !== null
            ? (() => {
                const options = [];
                for (let i = 1; i <= Math.ceil(this.props.rcount / 20); i++) {
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
                      onClick={(e) => this.pagination(this.props.reponame, e)}
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
      </div>
    );
  }
}

export default connect(null, { addRepoToManager, searchByRepo })(
  RepoSearchPage
);
