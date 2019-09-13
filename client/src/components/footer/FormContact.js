import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Contact } from '@neuromarket/services';
import Swal from 'sweetalert2';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexWrap: 'wrap',
		},
		textField: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			width: 200,
		},
		dense: {
			marginTop: 19,
		},
		menu: {
			width: 200,
		},
		button: {
			margin: theme.spacing(1),
		},
		input: {
			display: 'none',
		},
	})
);

export default function TextFields() {
	const footer_contact = async e => {
		e.preventDefault();
		//validacion de objecto
		if (name === '' || lastname === '' || description === '' || email === '') {
			console.log('hay un error de validacion');
			Swal.fire({
				type: 'error',
				title: 'Oops...',
				text: 'Something went wrong !',
				footer: '<a href>Why do I have this issue?</a>',
			});
		} else {
			//ahora si construimos el objeto
			const objetoContenido = {
				name,
				lastname,
				description,
				email,
			};
			// mandamos la info
			try {
				const contact = await Contact.create(objetoContenido);
				console.log(contact)
				Swal.fire({
					position: 'top-end',
					type: 'success',
					title: 'Your question has been saved',
					showConfirmButton: false,
					timer: 1500,
				});
			} catch (error) {
				Swal.fire({
					type: 'error',
					title: 'Oops...',
					text: 'algo ocurrio amigo!',
				});
			}
		}
	};

	const classes = useStyles();
	const [name, SetName] = useState('');
	const [lastname, SetLastName] = useState('');
	const [description, setdescription] = useState('');
	const [email, setEmail] = useState('');


	return (
		<form className={classes.container} onSubmit={footer_contact}>
			<TextField
				id="standard-name"
				label="Name"
				className={classes.textField}
				margin="normal"
				onChange={e => SetName(e.target.value)}
			/>

			<TextField
				id="standard-name"
				label="Last Name"
				className={classes.textField}
				margin="normal"
				onChange={e => SetLastName(e.target.value)}
			/>

			<TextField
				id="standard-full-width"
				label="write us your concern"
				style={{ margin: 8 }}
				placeholder="hi I would like know the oferts"
				helperText="Write Sometihing!"
				fullWidth
				margin="normal"
				onChange={e => setdescription(e.target.value)}
			/>
			<TextField
				id="outlined-email-input"
				label="Email"
				placeholder="www@correunivalle.edu.co"
				className={classes.textField}
				type="email"
				name="email"
				autoComplete="email"
				margin="normal"
				variant="outlined"
				onChange={e => setEmail(e.target.value)}
			/>
			<Button type="submit" variant="contained" color="primary" className={classes.button}>
				send
			</Button>
		</form>
	);
}
