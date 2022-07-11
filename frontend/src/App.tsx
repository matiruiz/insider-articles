import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddArticle from "./components/add-article.component";
import EditArticle from "./components/edit-article.component";
import ArticlesList from "./components/list-articles.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/articles"} className="navbar-brand">
            Insider Intelligence
          </Link>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/articles"]} component={ArticlesList} />
            <Route exact path="/add" component={AddArticle} />
            <Route path="/articles/:id" component={EditArticle} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;