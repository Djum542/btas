import firestore from '@react-native-firebase/firestore';
import { createActions } from "redux-actions";

const {
    addToken,
    addJob,
    fetchJobs
} = createActions({
    ADD_TOKEN: (text) => ({ text }),
    ADD_JOB: (object) => ({ object }),
    FETCH_JOBS: () => () => { },
}, {
    prefix: 'app'
})

export {
    addToken,
    addJob,
    fetchJobs
}