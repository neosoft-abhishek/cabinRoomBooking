import axios from "axios";

export const callbackApiCalling = {
  // making of custom object in required format
  axios: function(type, url, data, headerData, disableLoader) {
    let opts = {
      url: url,
      method: type,
      responseType: "json",
      data: data,
      headers: headerData,
      timeout: 30000
    };

    // Add a request interceptor
    axios.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    // Add a response interceptor
    // axios.interceptors.response.use(
    //   function(response) {
    //     // Do something with response data
    //     return response;
    //   },
    //   function(error) {
    //     // Do something with response error
    //     return Promise.reject(error);
    //   }
    // );
    return axios(opts);
  },

  // GET function callback
  get: async function(url, headerData) {
    return axios
      .get(url, headerData)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },

  // POST function callback
  post: async function(url, data, headerData, disableLoader) {
    return this.axios("POST", url, data, headerData, disableLoader)
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },

  // PUT function callback
  put: async function(url, data, headerData, contentType, disableLoader) {
    return this.axios("PUT", url, data, headerData, contentType)
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },

  // PATCH function callback
  patch: function(url, data, contentType, disableLoader) {
    return this.axios("PATCH", url, data, contentType, disableLoader)
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },

  // DELETE function callback
  delete: async function(url, data, headerData, disableLoader) {
    return this.axios("DELETE", url, data, headerData, disableLoader)
      .then(response => {
        return response;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
};
