import React, {useState, useContext} from 'react';
import {Link, withRouter} from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

// Material helpers
import {withStyles} from '@material-ui/core';

// Material components
import {
	Grid,
	Button,
	IconButton,
	CircularProgress,
	TextField,
	Typography,
} from '@material-ui/core';

// Material icons
import {ArrowBack as ArrowBackIcon} from '@material-ui/icons';

// Shared components
import {Facebook as FacebookIcon} from '../../icons';

// Component styles
import styles from './styles';

// Form validation schema
import userValidationSchema from './schema';
import {Formik} from 'formik';

// server services
import {Auth} from '@neuromarket/services';

import AlertContext from '../../context/alert-context';
import UserContext from '../../context/user-context';

// Google OAuth
import Google from './google';

const SignIn = (props) => {
	const {userLoggedIn} = useContext(UserContext);

	const {openAlert} = useContext(AlertContext);

	const [isLoading, setIsLoading] = useState(false);

	const handleBack = () => {
		const {history} = props;

		history.goBack();
	};

	const handleGoogleSignIn = async (user) => {
		const {history} = props;
		setIsLoading(true);
		Auth.loginGoogle(user)
			.then(() => {
				userLoggedIn({
					name: user.name,
					email: user.email,
					img: user.img,
					phone: '',
				});
				history.push('/dashboard');
			})
			.catch((err) => {
				console.log('err :', err);
				setIsLoading(false);
				openAlert({
					message: 'Failed google login',
					variant: 'error',
				});
			});
	};

	const handleSignIn = async (values) => {
		const {history} = props;
		setIsLoading(true);

		Auth.login({email: values.email, password: values.password})
			.then((user) => {
				console.log('user :', user);
				userLoggedIn({
					name: user.user.name,
					email: user.user.email,
					img: user.user.img,
					phone: user.user.phone,
				});
				setIsLoading(false);
				history.push('/dashboard');
			})
			.catch(() => {
				setIsLoading(false);
				openAlert({
					message: 'Incorrect email or password',
					variant: 'error',
				});
			});
	};

	const {classes} = props;

	return (
		<Formik onSubmit={handleSignIn} validationSchema={userValidationSchema}>
			{(formikProps) => {
				const {
					values,
					touched,
					errors,
					handleChange,
					handleBlur,
					handleSubmit,
				} = formikProps;

				return (
					<div className={classes.root}>
						<Grid className={classes.grid} container>
							<Grid className={classes.quoteWrapper} item lg={5}>
								<div className={classes.quote}>
									<div className={classes.quoteInner}>
										<Typography className={classes.quoteText} variant='h1'>
											Hella narwhal Cosby sweater McSweeney's, salvia kitsch
											before they sold out High Life.
										</Typography>
										<div className={classes.person}>
											<Typography className={classes.name} variant='body1'>
												Takamaru Ayako
											</Typography>
											<Typography className={classes.bio} variant='body2'>
												Manager at inVision
											</Typography>
										</div>
									</div>
								</div>
							</Grid>
							<Grid className={classes.content} item lg={7} xs={12}>
								<div className={classes.content}>
									<div className={classes.contentHeader}>
										<IconButton
											className={classes.backButton}
											onClick={handleBack}
										>
											<ArrowBackIcon />
										</IconButton>
									</div>
									<div className={classes.contentBody}>
										<form className={classes.form} onSubmit={handleSubmit}>
											<Typography className={classes.title} variant='h2'>
												Sign in
											</Typography>
											<Typography className={classes.subtitle} variant='body1'>
												Sign in with social media
											</Typography>
											<Button
												className={classes.facebookButton}
												color='primary'
												size='large'
												variant='contained'
											>
												<FacebookIcon className={classes.facebookIcon} />
												Login with Facebook
											</Button>
											<Google onLoginSuccess={handleGoogleSignIn} />
											<Typography className={classes.sugestion} variant='body1'>
												or login with email address
											</Typography>
											<div className={classes.fields}>
												<TextField
													className={classes.textField}
													label='Email address'
													name='email'
													onChange={handleChange}
													onBlur={handleBlur}
													type='text'
													helperText={touched.email && errors.email}
													error={!!(touched.email && errors.email)}
													value={values.email}
													variant='outlined'
												/>
												<TextField
													className={classes.textField}
													label='Password'
													name='password'
													onChange={handleChange}
													onBlur={handleBlur}
													type='password'
													helperText={touched.password && errors.password}
													error={!!(touched.password && errors.password)}
													value={values.password}
													variant='outlined'
												/>
											</div>

											<Button
												className={classes.signInButton}
												color='primary'
												type='submit'
												size='large'
												variant='contained'
											>
												Sign in now
											</Button>
											{isLoading ? (
												<CircularProgress className={classes.progress} />
											) : null}
											<Typography className={classes.signUp} variant='body1'>
												Don't have an account?{' '}
												<Link className={classes.signUpUrl} to='/sign-up'>
													Sign up
												</Link>
											</Typography>
										</form>
									</div>
								</div>
							</Grid>
						</Grid>
					</div>
				);
			}}
		</Formik>
	);
};

SignIn.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
};

export default compose(
	withRouter,
	withStyles(styles)
)(SignIn);
