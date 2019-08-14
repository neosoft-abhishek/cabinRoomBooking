import { reducerType } from "./ReducerType";

const initialState = {
    onSuccessData: { },
    isLoading:false,
    onFailureData:{ }
  };
  
  const DemoReducer = (state = initialState, action) => {
    switch(action.type) {
      case `onRequest_${reducerType.demo}`:
        return {
          ...state,
          isLoading: true
        };
        case `onSuccess_${reducerType.demo}`:
        return {
          ...state,
            userName: action.successPayload,
            isLoading: false

        };
        case `onError_${reducerType.demo}`:
        return {
          ...state,
          onFailureData: action.errorPayload,
          isLoading: false
        };
      default:
        return state;
    }
  }
  
  export default DemoReducer;