import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../styles/Homepage.css"
import {
  Container,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
} from "react-bootstrap";


class HomePage extends Component {
  render() {
    return (
      <div className="main-home">
        <Link to="/search">
        <Button variant="dark" style={{float:"right" , marginRight:"3rem"}}>Add Repository</Button>{' '}
        </Link>
        <Container>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexWrap: "wrap",
                  marginTop: "2rem",
                }}
              >
                {this.props.managerRepoList.length !== 0
                  ? this.props.managerRepoList.map((repo, index) => (
                      <div key={index}>
                        <Card style={{ marginTop: "1rem" }}>
                          <ListGroup className="list-group-flush">
                            <a
                              href={repo.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{textDecoration:"none"}}
                            >
                              <ListGroupItem>{repo.name}</ListGroupItem>
                            </a>
                          </ListGroup>
                        </Card>
                      </div>
                    ))
                  : <div className="box effect">
                  <h3>Please go to add Repository button to add repository</h3>
                  </div>}
              </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    managerRepoList: state.managerList.repolist,
  };
};

export default connect(mapStateToProp,null)(HomePage);
