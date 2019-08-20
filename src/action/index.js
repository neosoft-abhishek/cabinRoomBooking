import { urls } from "../services/Url";
import { reducerType } from "../reducer/ReducerType";
import { apicalling } from "../services/APIDispatchMethod";


export const onLoginClick = () => {
  return (
    dispatch =>
    {
      apicalling("GET", urls.demoUrl, null, null, reducerType.demo, dispatch)}
  )
};

export const pushUserDataList = (value) => {
  return {
    type: `onSuccess_${reducerType.user_details}`,
    successPayload: value
  }

}
