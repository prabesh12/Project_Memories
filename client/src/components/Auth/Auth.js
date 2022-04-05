import React, { useState } from 'react'
import { Avatar, Typography, Grid, Paper, Button, Container } from '@material-ui/core';
import useStyles from "./style";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from './Input';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {signin, signup } from "../../actions/auth"

const initialState={firstName:'', lastName:'', email:'', password:'',confirmPassword:''}
const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState();
    const dispatch = useDispatch();
     const history = useHistory();
     const [formData, setFormData]=useState(initialState);
    const handleSubmit = (e) => {
           e.preventDefault();
       if(isSignUp){
           dispatch(signup(formData,history))
       }
       else
       dispatch(signin(formData,history))

    }
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value});

    }

    const handleShowPassword =()=> setShowPassword((prevShowPassword) => !prevShowPassword)

    const switchMode = () => {
        setIsSignUp((prevIsSignup) => !prevIsSignup)
        setShowPassword(false);
    }
    
    const googleSuccess= async(res)=>{
        const result = res?.profileObj;
        const token = res?.tokenId
      try {
          dispatch({type:'AUTH', data:{result, token}})
          history.push('/')
      } catch (error) {
          console.log(error)
      }
    }
   const   googleFailure=(error)=>{
              console.log(error);
              console.log('Google SignIn failed please use valid google account')
    }
    return (
        <Container component="main" maxWidth="lg">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5" > {isSignUp ? " SignUp" : "SignIn"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input name="firstName "
                                    label="First Name"
                                    autoFocus 
                                    half
                                    handleChange={handleChange}
                                />
                                <Input name="lastName"
                                    label="Last Name"
                                    half
                                    handleChange={handleChange}
                                />

                            </>
                        )}
                        <Input
                            name="email"
                            label="Email Address"
                            handleChange={handleChange}
                            type="email"
                        />
                        <Input name="password"
                            label="password"
                            handleChange={handleChange}
                            type={showPassword ? 'text' : "password"}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="outlined" color="primary" className={classes.submit}>
                        {isSignUp ? 'SignUp' : "SignIn"}
                    </Button>
                    <GoogleLogin
                        clientId="1008171167906-5nqjdll3k9m37fppvro2nlph4clmkuge.apps.googleusercontent.com"
                        render={(renderProps => (
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                 disabled={renderProps.disabled}
                                 startIcon={<Icon/>}
                                 variant= "outlined "
                                >
                                Continue with Google.

                            </Button>
                        ))}
                        onSuccess={googleSuccess}
                        onFailure = {googleFailure}
                    />
                   
                    <Grid container justify="flex-end" >
                        <Grid item>
                            <Button onClick={switchMode} >
                                {isSignUp ? " Already have an account? SignIn" : "Dont have an account SignUp"}
                            </Button>
                        </Grid>
                    </Grid>

                </form>
            </Paper>

        </Container>
    )
}

export default Auth;
