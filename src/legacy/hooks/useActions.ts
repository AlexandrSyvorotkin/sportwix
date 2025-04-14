import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
// import * as AllActions from '../redux/store/actions'

const useActions = () => {
    const dispatch = useDispatch()

    // return {...bindActionCreators(AllActions, dispatch), dispatch}
}

export default useActions