import { connect } from 'react-redux'
import Login from '../screen/Login'
import { addToken } from '../store/actions'

function onAddToken(dispatch, text) {
    dispatch(addToken(text))
}

const mapStateToProps = (state) => ({
    token: state.app.token,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onAddToken: (text) => onAddToken(dispatch, text)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
