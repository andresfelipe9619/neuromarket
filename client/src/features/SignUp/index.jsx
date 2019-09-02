import React, {useState, useContext, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

// Material helpers
import {withStyles} from '@material-ui/core';

// Material components
import {
	Button,
	CircularProgress,
	Grid,
	IconButton,
	TextField,
	Typography,
} from '@material-ui/core';

// Material icons
import {ArrowBack as ArrowBackIcon} from '@material-ui/icons';

// Component styles
import styles from './styles';

// Form validation schema
import registerUserValidationSchema from './schema';
import {Formik} from 'formik';

// server services
import {Auth} from '@neuromarket/services';
import {Category} from '@neuromarket/services';

import AlertContext from '../../context/alert-context';
import Select from 'react-select';

const SignUp = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const {openAlert} = useContext(AlertContext);
	const [selectedCategories, setSelectedCategories] = useState([]);

	const handleSelectChange = (selectedCategories) => {
		console.log('selectedOption :', selectedCategories);
		setSelectedCategories(selectedCategories);
	};

	useEffect(() => {
		async function getCategories() {
			const {categories} = await Category.getAll();
			setCategories(categories);
		}
		getCategories();
	}, []);

	const categoryNames = categories.map((val) => {
		return {label: val.name, value: val._id};
	});

	const handleBack = (props) => {
		const {history} = props;
		history.goBack();
	};

	const handleSignUp = async (values) => {
		const catIds = selectedCategories.map((cat) => cat.value);
		try {
			const {history} = props;
			setIsLoading(true);
			await Auth.register({
				name: values.name,
				email: values.email,
				password: values.password,
				phone: values.phone,
				interestCategories: catIds,
			});

			history.push('/sign-in');
		} catch (error) {
			setIsLoading(false);
			openAlert({
				message: 'Internal error',
				variant: 'error',
			});
		}
	};

	const {classes} = props;

	return (
		<Formik
			onSubmit={handleSignUp}
			validationSchema={registerUserValidationSchema}
			initialValues={{
				name: '',
				email: '',
				phone: '',
				password: '',
				confirmPassword: '',
			}}
		>
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
												Create new account
											</Typography>
											<Typography className={classes.subtitle} variant='body1'>
												Use your work email to create new account... it's free.
											</Typography>
											<div className={classes.fields}>
												<TextField
													className={classes.textField}
													label='Name'
													name='name'
													onChange={handleChange}
													onBlur={handleBlur}
													type='text'
													helperText={touched.name && errors.name}
													error={!!(touched.name && errors.name)}
													value={values.name}
													variant='outlined'
												/>

												<TextField
													className={classes.textField}
													label='Phone Number'
													name='phone'
													onChange={handleChange}
													onBlur={handleBlur}
													helperText={touched.phone && errors.phone}
													error={!!(touched.phone && errors.phone)}
													value={values.phone}
													variant='outlined'
												/>

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
													helperText={touched.password && errors.password}
													error={!!(touched.password && errors.password)}
													type='password'
													value={values.password}
													variant='outlined'
												/>
												<TextField
													className={classes.textField}
													label='Confirm Password'
													name='confirmPassword'
													onChange={handleChange}
													onBlur={handleBlur}
													helperText={
														touched.confirmPassword && errors.confirmPassword
													}
													error={
														!!(
															touched.confirmPassword && errors.confirmPassword
														)
													}
													type='password'
													value={values.confirmPassword}
													variant='outlined'
												/>
												<div className={classes.selectCategories}>
													<Typography
														className={classes.subtitle}
														variant='subtitle1'
													>
														Choose the categories of your interest
													</Typography>
													<Select
														closeMenuOnSelect={false}
														isMulti
														isSearchable
														options={categoryNames}
														onChange={handleSelectChange}
													/>
												</div>
											</div>
											<Button
												className={classes.signUpButton}
												color='primary'
												type='submit'
												size='large'
												variant='contained'
											>
												Sign up now
											</Button>
											<Typography className={classes.signIn} variant='body1'>
												Have an account?{' '}
												<Link className={classes.signInUrl} to='/sign-in'>
													Sign In
												</Link>
											</Typography>
											{isLoading ? (
												<CircularProgress className={classes.progress} />
											) : null}
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

SignUp.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
};

export default compose(
	withRouter,
	withStyles(styles)
)(SignUp);
