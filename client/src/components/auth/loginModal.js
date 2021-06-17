import {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';

class LoginModal extends Component {
    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const {error, isAuthenticated} = this.props;
        if (error !== prevProps.error) {
            //checks to see if there's any login errors
            if (error.id === 'LOGIN_FAIL') {
                this.setState({msg: error.msg.msg});
            }
            else {
                this.setState({msg: null});
            }
        }

        //if the user is authenticated, close the modal
        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        //clear out all errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        const user = {email, password};

        //attempts login
        this.props.login(user);
    }

    render() {
        return (
            <div className="container">
                <Button color="success" className="btn btn-sm"><NavLink onClick={this.toggle} href="#"><span className="text-dark"><b>Login</b></span></NavLink></Button>
                <Modal 
                    isOpen={this.state.modal} 
                    toggle={this.toggle} 
                >
                    <ModalHeader toggle={this.toggle}>
                        Login
                    </ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>): null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >Login</Button>
                            </FormGroup>
                        </Form>    
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStatestoProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStatestoProps, {login, clearErrors})(LoginModal);
