import { urls } from "../services/Url";
import { reducerType } from "../reducer/ReducerType";
import { apiCalling } from "../services/APIDispatchMethod";


export const onLoginClick = () => {
  return (
    dispatch =>
    {
      apiCalling("GET", urls.demoUrl, null, null, reducerType.demo, dispatch)}
  )
};

export const pushUserDataList = (value) => {
  return {
    type: `onSuccess_${reducerType.user_details}`,
    successPayload: value
  }

}

export const callAllLocation = () =>{
  return(
    dispatch =>{
      apiCalling('GET',urls.getAllLocation, null, null, reducerType.get_all_location, dispatch)
    }
  )
}

export const callAllCabins = (id) =>{
  return(
    dispatch =>{
      apiCalling('GET',`${urls.getAllLocation}/${id}`, null, null, reducerType.get_all_cabins, dispatch)
    }
  )
}
