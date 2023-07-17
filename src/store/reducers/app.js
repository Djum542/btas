import { handleActions } from "redux-actions";
import initState from '../initState'
import {
    addToken,
    addJob,
    fetchJobs
} from '../actions'

export default handleActions({
    [addToken]: (state, { payload: { text } }) => ({
        token: text
    }),
    [addJob]: (state, { payload: { object } }) => ({
        ...state,
        job: object
    }),
}, initState.app)