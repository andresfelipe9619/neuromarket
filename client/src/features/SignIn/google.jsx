import React from 'react';
import {GoogleLogin} from 'react-google-login';
import {withStyles} from '@material-ui/core';
import styles from './styles';
import {Google as GoogleIcon} from '../../icons';
import {Button} from '@material-ui/core';

const Google = (props) => {
	const {onLoginSuccess, classes} = props;
	return (
		<GoogleLogin
			clientId='219758474264-vh1bibcphgvbc32km508lubtqkanikf1.apps.googleusercontent.com'
			onSuccess={(googleUser) => {
				let user = {
					id: googleUser.getBasicProfile().getId(),
					name: googleUser.getBasicProfile().getName(),
					email: googleUser.getBasicProfile().getEmail(),
					img: googleUser.getBasicProfile().getImageUrl(),
					idtoken: googleUser.getAuthResponse().id_token,
				};
				onLoginSuccess(user);
			}}
			onFailure={(err) => console.log('Login failed', err)}
			render={(renderProps) => (
				<Button
					className={classes.googleButton}
					onClick={renderProps.onClick}
					size='large'
					variant='contained'
				>
					<GoogleIcon className={classes.googleIcon} />
					Login with Google
				</Button>
			)}
		/>
	);
};

export default withStyles(styles)(Google);
