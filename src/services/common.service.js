import axios from "axios";

class Service {
  service;

  constructor() {
    let service = axios.create();

    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response) {
    //Add any additional general response handling here
    return response;
  }

  handleError(error) {
    //Add any additional general error handling here
    return Promise.reject(error);
  }

  get(path) {
    return this.service.get(path);
  }

  put(path, body) {
    return this.service.request({
      method: "PUT",
      url: path,
      responseType: "json",
      data: body
    });
  }

  patch(path, body) {
    return this.service.request({
      method: "PATCH",
      url: path,
      responseType: "json",
      data: body
    });
  }

  post(path, body) {
    return this.service.request({
      method: "POST",
      url: path,
      responseType: "json",
      data: body
    });
  }

  delete(path, body) {
    return this.service.request({
      method: "DELETE",
      url: path,
      responseType: "json",
      data: body
    });
  }
}

let instance = new Service();

export default instance;
