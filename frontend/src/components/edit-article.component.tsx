import { Component, ChangeEvent } from "react";
import { Link, RouteComponentProps } from 'react-router-dom';
import DateTimePicker from 'react-datepicker';

import ArticleDataService from "../services/article.service";
import IArticleData from "../types/article.type";
import { getValidationError } from '../utils/error-helper';

interface RouterProps { 
  id: string;
}

type Props = RouteComponentProps<RouterProps>;
type State = {
  currentArticle: IArticleData;
  message: string;
}

export default class EditArticle extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentArticle: {
        id: "",
        title: "",
        body: "",
        author: "",
        publicationDate: new Date(),
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getArticle(this.props.match.params.id);
  }

  onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    this.setState(function (prevState) {
      return {
        currentArticle: {
          ...prevState.currentArticle,
          title,
        },
      };
    });
  }

  onChangeAuthor = (e: ChangeEvent<HTMLInputElement>)  =>{
    const author = e.target.value;
    this.setState((prevState) => ({
      currentArticle: {
        ...prevState.currentArticle,
        author,
      },
    }));
  }

  onChangeBody = (e: ChangeEvent<HTMLInputElement>)  =>{
    const body = e.target.value;
    this.setState((prevState) => ({
      currentArticle: {
        ...prevState.currentArticle,
        body,
      },
    }));
  }

  onChangePublicationDate(date: Date | null) {
    if (date) {
      this.setState((prevState) => ({
        currentArticle: {
          ...prevState.currentArticle,
          publicationDate: date,
        },
      }));
    }
  }

  getArticle = (id: string) => {
    ArticleDataService.get(id)
      .then((response: any) => {
        this.setState({
          currentArticle: {
            ...response.data,
            publicationDate: new Date(response.data.publicationDate)
          },
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  
  updateArticle = () => {
    ArticleDataService.update(this.state.currentArticle, this.state.currentArticle.id)
      .then((response: any) => {
        this.setState({
          message: "The article was updated successfully!",
        });

        this.navigateBack();
      })
      .catch((e: any) => {
        console.log(e);
        const validationError = getValidationError(e);
        this.setState({ message: validationError || '' });
      });
  }

  deleteArticle = () => {
    ArticleDataService.delete(this.state.currentArticle.id)
      .then((response: any) => {
        this.setState({
          message: "The article was deleted.",
        });

        this.navigateBack();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  private navigateBack() {
    setTimeout(() => this.props.history.push("/articles"), 1000);
  }

  render() {
    const { currentArticle } = this.state;

    return (
      <div>
        {currentArticle &&
          <div className="edit-form">
            <div className='d-flex  justify-content-between'>
              <h4>Article</h4>
              <Link to={"/articles"} className="nav-link">
                <h6>⇦ Back</h6>
              </Link>
            </div>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentArticle.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  value={currentArticle.author}
                  onChange={this.onChangeAuthor}
                />
              </div>
              <div className="form-group">
                <label htmlFor="body">Body</label>
                <input
                  type="text"
                  className="form-control"
                  id="body"
                  value={currentArticle.body}
                  onChange={this.onChangeBody}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Publication Date</strong>
                </label>
                <DateTimePicker
                  onChange={(date) => this.onChangePublicationDate(date)}
                  selected={currentArticle.publicationDate}
                />
              </div>
            </form>
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteArticle}
            >
              ❌ Delete
            </button>
            <button
              type="submit"
              className="badge badge-primary"
              onClick={this.updateArticle}
            >
              ✔️ Update
            </button>
            {
              this.state.message &&
                <p className="h6 mt-2 alert alert-warning">{this.state.message}</p>
            }
          </div>
        }
      </div>
    );
  }
}