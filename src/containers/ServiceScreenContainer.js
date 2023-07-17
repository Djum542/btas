import { connect } from 'react-redux'
import Service from '../screen/Service'
import { fetchJobs } from '../store/actions'

function onFetchJobs(dispatch) {
    dispatch(fetchJobs())
}

const mapStateToProps = (state) => ({
    listJob: state.app.listJob,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onFetchJobs: () => onFetchJobs(dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Service)
