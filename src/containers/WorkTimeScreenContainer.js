import { connect } from 'react-redux'
import WorkTime from '../screen/WorkTime'
import { addJob } from '../store/actions'

function onAddJob(dispatch, object) {
    dispatch(addJob(object))
}

const mapStateToProps = (state) => ({
    job: state.app.job,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onAddJob: (object) => onAddJob(dispatch, object)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkTime)
