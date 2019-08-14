import axios from "axios";

export const apicalling = (
  methodCall,
  url,
  header,
  data,
  reducerType,
  dispatch
) => {
  dispatch({
    type: `onRequest_${reducerType}`
  });
  axios({
    method: methodCall,
    url: url,
    headers: header,
    data: data
  })
    .then(function(response) {
      dispatch({
        type: `onSuccess_${reducerType}`,
        successPayload: response.data
      });
    })
    .catch(function(error) {
      dispatch({
        type: `onError_${reducerType}`,
        errorPayload: error
      });
    });
};
