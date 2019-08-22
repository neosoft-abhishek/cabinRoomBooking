import { reducerType } from "./ReducerType";

const initialState = {
  payload :'',
  isLoading:false,
  onFailureData:{}
  };
  
  const GetAllLocation = (state = initialState, action) => {
    switch(action.type) {
      case `onRequest_${reducerType.get_all_location}`:
        return {
          ...state,
          isLoading: true
        };
        case `onSuccess_${reducerType.get_all_location}`:
        return {
          ...state,
            payload: action.successPayload,
            isLoading: false

        };
        case `onError_${reducerType.get_all_location}`:
        return {
          ...state,
          onFailureData: action.errorPayload,
          isLoading: false
        };
      default:
        return state;
    }
  }
  
  export default GetAllLocation;