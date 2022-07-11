import { Component, ChangeEvent } from "react";
import { Link } from 'react-router-dom';
import DateTimePicker from 'react-datepicker';
import ArticleDataService from "../services/article.service";
import IArticleData from '../types/article.type';
import { getValidationError } from '../utils/error-helper';

type Props = {};
type State = IArticleData & {
  message: string;
};

const initialState: State = {
  id: "",
  title: "",
  author: "",
  body: "",
  publicationDate: new Date(),
  message: "",
};

export default class AddArticle extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeBody = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      body: e.target.value,
    });
  }

  onChangeAuthor = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      author: e.target.value,
    });
  }

  onChangePublicationDate(date: Date | null) {
    if (date) {
      this.setState({
        publicationDate: date,
      });
    }
  }

  saveArticle = () => {
    const data: IArticleData = {
      title: this.state.title,
      author: this.state.author,
      publicationDate: this.state.publicationDate,
      body: this.state.body,
    };

    ArticleDataService.create(data)
      .then((response: any) => {
        this.setState({
          message: "The article was created successfully!",
        });
      
        this.resetArticle();
      })
      .catch((e: any) => {
        console.log(e);
        const validationError = getValidationError(e);
        this.setState({ message: validationError || '' });
      });
  }

  private resetArticle(): void {
    setTimeout(() => this.setState(initialState), 1000);
  }

  render() {
    const { title, body, author, publicationDate } = this.state;

    return (
      <div className="submit-form">
        <div className='d-flex  justify-content-between'>
          <h4>New Article</h4>
          <Link to={"/articles"} className="nav-link">
            <h6>⇦ Back</h6>
          </Link>
        </div>
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={title}
              onChange={this.onChangeTitle}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              className="form-control"
              id="author"
              required
              value={author}
              onChange={this.onChangeAuthor}
              name="author"
            />
          </div>
          <div className="form-group">
            <label htmlFor="publicationDate">Publication Date</label>
            <DateTimePicker
              onChange={(date) => this.onChangePublicationDate(date)}
              selected={publicationDate}
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <input
              type="text"
              className="form-control"
              id="body"
              required
              value={body}
              onChange={this.onChangeBody}
              name="body"
            />
          </div>
          <button
            type="submit"
            className="badge badge-primary"
            onClick={this.saveArticle}
          >
            ✔️ Save
          </button>
          {
            this.state.message &&
              <p className="h6 mt-2 alert alert-warning">{this.state.message}</p>
          }
        </div>
      </div>
    );
  }
}