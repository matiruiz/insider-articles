import http from "../http-common";
import IArticleData from "../types/article.type"

class ArticleDataService {
  getAll(searchText?: string) {
    const queryParams = `${searchText ? `?searchText=${searchText}` : ''}`;
    const url = `/articles${queryParams}`;

    return http.get<Array<IArticleData>>(url);
  }
  
  get(id: string) {
    return http.get<IArticleData>(`/articles/${id}`);
  }
  
  create(data: IArticleData) {
    return http.post<IArticleData>("/articles", data);
  }

  update(data: IArticleData, id: any) {
    return http.put<any>(`/articles/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/articles/${id}`);
  }
}

export default new ArticleDataService();