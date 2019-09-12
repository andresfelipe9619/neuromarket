import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles, fade } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Grid, Paper } from '@material-ui/core';
import FormContact from './FormContact';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: '20px',
	},
	footer: {
		borderTopColor: 'black',
		borderTopWidth: '4px',
		borderTopStyle: 'solid',
		padding: theme.spacing(2),
		marginTop: 'auto',
		backgroundColor: 'secondary',
	},
	paper: {
		padding: theme.spacing(1),
		color: theme.palette.text.secondary,
		justifyContent: 'flex-start',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
}));


export default function StickyFooter() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<footer className={classes.footer}>
				<Container spacing={3} maxWidth="lg">
					<Typography variant="body1">My sticky footer can be found here.</Typography>
					<Grid container spacing={2}>
						<Grid item xs={3}>
							<Paper className={classes.paper}>
								<Typography gutterBottom variant="h3" component="h3">
									Nuestra compañia
								</Typography>
								<Typography align={'justify'} component="p">
									Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
									Ipsum has been the industry's standard dummy text ever since the 1500s, when an
									unknown printer took a galley of type and scrambled it to make a type specimen book.
									It has survived not only five centuries.
								</Typography>
								<Typography gutterBottom component="p">
									* Trabaja con Nostros
								</Typography>
								<Typography gutterBottom component="p">
									* Garantia Extenduda
								</Typography>
								<Typography  component="p">
									* Marco Legal
								</Typography>
							</Paper>
						</Grid>
						<Grid item xs={6}>
							<Paper className={classes.paper}>
								<Typography align={'center'} variant="h3" component="h3">
									Be the first to find out about our news!
								</Typography>
								<FormContact />
							</Paper>
						</Grid>
						<Grid item xs={3}>
							<Paper className={classes.paper}>
								<Typography gutterBottom variant="h3" component="h3">
									CONTACTO
								</Typography>
								<Typography  align={'justify'} gutterBottom variant="h4" component="h3">
									Línea de servicio al cliente
									<br></br>
									Teléfono de contacto:
									<br></br>
									(1) 307 70 53 (Bogotá)
									<br></br>
									Escríbenos 
									scliente@Neuromarket.com
									<br></br>
								</Typography>

								<Typography align={'justify'} component="p">
									-Esta página es propiedad de Industrias Neuromarket S.A.S, con NIT. 1532083-271, las
									ventas de los productos es responsabilidad de Industrias Neuromarket S.A.S, con NIT.
									1532083-271.
								</Typography>
							</Paper>
						</Grid>
					</Grid>
					<Copyright />
				</Container>
			</footer>
		</div>
	);
}
