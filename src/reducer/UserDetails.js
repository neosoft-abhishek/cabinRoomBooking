import { reducerType } from "./ReducerType";

const initialState = {
  userDetails :[ ]
  };
  
  const UserDetails = (state = initialState, action) => {
    switch(action.type) {
      case `onRequest_${reducerType.demo}`:
        return {
          ...state,
          isLoading: true
        };
        case `onSuccess_${reducerType.user_details}`:
        return {
          ...state,
            userDetails: action.successPayload,
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
  
  export default UserDetails;