import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { baseApiUrl, checkGmail } from '../../Config/app.config';
import { loginUser } from '../../reducer/Auth/Auth.Action';
import './LoginPage.css';

function LoginPage(props) {
    const [onProgress, setOnProgress] = useState(false);
    const [tabOneSelected, setTabOneSelected] = useState(true);
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    const [signUpFirstname, setSignUpFirstname] = useState('');
    const [signUpLastname, setSignUpLastname] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
    const [signupemail, setSignupemail] = useState('');

    const [redirect, setRedirect] = useState(false);

    //signIn process
    const signInProcess = () => {
        if (!checkGmail(signInEmail)) {
            return toast.error('invalid email address', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Bounce,
            });
        } else if (signInPassword.trim() === '') {
            return toast.error('Enter a correct password', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Bounce,
            });
        }
        setOnProgress(true);
        axios.post(`${baseApiUrl}/api/users/login`, {
            email: signInEmail,
            password: signInPassword,
        }).then(response => {
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                props.userLogin(response.data.token);
                setRedirect(true);
            }
        }).catch(err => {
            return toast.error(err.response.data.message, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Bounce,
            });
        }).finally(_ => setOnProgress(false));
    };

    //signup process
    const signupprocess = () => {
        if (!checkGmail(signupemail)) {
            return toast.error('invalid email address', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Bounce,
            });
        } else if (signUpFirstname.trim() === '' || signUpLastname.trim() === '') {
            return toast.error('Invalid name entered', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Bounce,
            });
        } else if (signUpPassword.trim() === '') {
            return toast.error('Enter a correct password', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Bounce,
            });
        } else if (signUpPassword !== signUpConfirmPassword) {
            return toast.error('invalid Confirm password field', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Bounce,
            });
        }
        setOnProgress(true);
        axios.post(`${baseApiUrl}/api/users/register`, {
            firstName: signUpFirstname,
            lastName: signUpLastname,
            email: signupemail,
            password: signUpPassword,
        }).then(response => {
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                props.userLogin(response.data.token);
                setRedirect(true);
            }
        }).catch(err => {
            return toast.error(err.response.data.message, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Bounce,
            });
        }).finally(_ => setOnProgress(false));
    };

    if (redirect) {
        return <Redirect to='/dashbord' />
    }

    return (
        <Fragment>
            <div className="login-wrap">
                <div className="login-html">
                    <input id="tab-1" type="radio" name="tab" className="sign-in" checked={tabOneSelected} onChange={e => setTabOneSelected(e.target.checked)} /><label htmlFor="tab-1" className="tab">Sign In</label>
                    <input id="tab-2" type="radio" name="tab" className="sign-up" checked={!tabOneSelected} onChange={e => setTabOneSelected(!e.target.checked)} /><label htmlFor="tab-2" className="tab">Sign Up</label>
                    <div className="login-form">
                        <div className="sign-in-htm">
                            <div className="group">
                                <label htmlFor="signinuser" className="label">Email</label>
                                <input id="signinuser" value={signInEmail} onChange={e => setSignInEmail(e.target.value)} type="text" className="input" />
                            </div>
                            <div className="group">
                                <label htmlFor="signinpass" className="label">Password</label>
                                <input id="signinpass" value={signInPassword} onChange={e => setSignInPassword(e.target.value)} type="password" className="input" data-type="password" />
                            </div>
                            <div className="group">
                                <input type="submit" disabled={onProgress} onClick={_ => signInProcess()} className="button" value="Sign In" />
                            </div>
                            <div className="hr"></div>
                        </div>
                        <div className="sign-up-htm">
                            <div className="group">
                                <label htmlFor="user" className="label">First name</label>
                                <input id="firstname" value={signUpFirstname} onChange={e => setSignUpFirstname(e.target.value)} type="text" className="input" />
                            </div>
                            <div className="group">
                                <label htmlFor="user" className="label">Last name</label>
                                <input id="lastname" value={signUpLastname} onChange={e => setSignUpLastname(e.target.value)} type="text" className="input" />
                            </div>
                            <div className="group">
                                <label htmlFor="email" className="label">Email Address</label>
                                <input id="email" value={signupemail} onChange={e => setSignupemail(e.target.value)} type="text" className="input" />
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Password</label>
                                <input id="pass" value={signUpPassword} onChange={e => setSignUpPassword(e.target.value)} type="password" className="input" data-type="password" />
                            </div>
                            <div className="group">
                                <label htmlFor="conpass" className="label">Repeat Password</label>
                                <input id="conpass" value={signUpConfirmPassword} onChange={e => setSignUpConfirmPassword(e.target.value)} type="password" className="input" data-type="password" />
                            </div>
                            <div className="group">
                                <input type="submit" onClick={e => signupprocess()} className="button" value="Sign Up" />
                            </div>
                            <div className="hr"></div>
                            <div className="foot-lnk">
                                <label htmlFor="tab-1">Already Member?</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
const mapStateToProps = (state) => {
    return {
        isLogin: state.isLogin,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogin: (value) => {
            dispatch(loginUser(value));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
