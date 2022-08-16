import {useCallback} from "react";
import {useDispatch} from "react-redux";

import {addMessage} from "../redux/mainSlice";

export const useMessage = () => {
  const dispatch = useDispatch()
  
  return useCallback( text => {
    if (text) {
      dispatch(addMessage(text))
    }
  }, [dispatch])
}
