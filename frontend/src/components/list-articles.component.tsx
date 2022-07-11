import { Component, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { format } from 'date-fns';

import ArticleDataService from "../services/article.service";
import IArticleData from '../types/article.type';

type Props = {};
type State = {
  articles: Array<IArticleData>,
  currentArticle: IArticleData | null,
  currentIndex: number,
  searchTitle: string
};

export default class ArticlesList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      articles: [],
      currentArticle: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveArticles();
  }

  onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveArticles() {
    ArticleDataService.getAll()
      .then((response: any) => {
        this.setState({
          articles: response.data
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  setActiveArticle(article: IArticleData | null, index: number) {
    this.setState({
      currentIndex: index,
      currentArticle: article,
    });
  }

  clearActiveArticle = () => {
    this.setActiveArticle(null, -1);
  }

  searchTitle = () => {
    this.setState({
      currentArticle: null,
      currentIndex: -1
    });
    
    ArticleDataService.getAll(this.state.searchTitle)
      .then((response: any) => {
        this.setState({
          articles: response.data
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, articles, currentArticle, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-7">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-info"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex justify-content-between">
            <h4>Articles List</h4>
            <Link to={"/add"} className="nav-link">
              <h6>➕ Add</h6>
            </Link>
          </div>
          {!articles.length && 'There are no articles...'}
          <ul className="list-group">
            {articles &&
              articles.map((article: IArticleData, index: number) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveArticle(article, index)}
                  key={index}
                >
                  {article.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentArticle &&
            <div>
              <div className="d-flex justify-content-between">
                <h4>Article</h4>
                <button
                  className="btn"
                  type="button"
                  onClick={this.clearActiveArticle}
                >
                  ✖
                </button>
              </div>
              <div className="border border-primary p-3">
                <div>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {currentArticle.title}
                </div>
                <div>
                  <label>
                    <strong>Author:</strong>
                  </label>{" "}
                  {currentArticle.author}
                </div>
                <div>
                  <label>
                    <strong>Publication Date:</strong>
                  </label>{" "}
                  {format(new Date(currentArticle.publicationDate), 'MM/dd/yyyy')}
                </div>
                <div>
                  <label>
                    <strong>Body:</strong>
                  </label>{" "}
                  {currentArticle.body}
                </div>
                <Link to={"/articles/" + currentArticle.id} className="badge badge-warning">
                  📝 Edit Article
                </Link>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}