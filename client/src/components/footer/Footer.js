import React  from 'react';
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
		minHeight: '100vh',
	},
	main: {
		marginTop: theme.spacing(8),
		marginBottom: theme.spacing(2),
	},
	footer: {
		padding: theme.spacing(2),
		marginTop: 'auto',
		backgroundColor: 'Gray',
	},
	paper: {
		padding: theme.spacing(3, 2),
		color: theme.palette.text.secondary,
		justifyContent: 'flex-start',
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		flexGrow: 1,
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		width: theme.spacing(7),
		height: '100%',
		position: 'relative',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
		width: '85%',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 4),
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: 200,
		},
	},
	centercontent:{
		justifyContent: 'center',
	}
}));


export default function StickyFooter() {
	const classes = useStyles();


	return (
		<div className={classes.root}>
			<CssBaseline />
			<Container component="main" className={classes.main} maxWidth="sm">
				<Typography variant="h2" component="h1" gutterBottom>
					Sticky footer
				</Typography>
				<Typography variant="h5" component="h2" gutterBottom>
					{'Pin a footer to the bottom of the viewport.'}
					{'The footer will move as the main element of the page grows.'}
				</Typography>
				<Typography variant="body1">Sticky footer placeholder.</Typography>
			</Container>
			<footer className={classes.footer}>
				<Container spacing={3} maxWidth="lg">
					<Typography variant="body1">My sticky footer can be found here.</Typography>
					<Grid container spacing={2}>
						<Grid item xs={3}>
							<Paper className={classes.paper}>
								<Typography variant="h6" component="h3">
									Nuestra compañia
								</Typography>
								<Typography component="p">* Quienes somos</Typography>
								<Typography component="p">* Trabaja con Nostros</Typography>
								<Typography component="p">* Garantia Extenduda</Typography>
								<Typography component="p">* Marco Legal</Typography>
							</Paper>
						</Grid>
						<Grid item xs={6}>
							<Typography align={"center"} variant="h6" component="h3">
								Be the first to find out about our news!
							</Typography>
							<centercontent />
						</Grid>
						<Grid item xs={3}>
							<Paper className={classes.paper}>xs=3</Paper>
						</Grid>
					</Grid>
					<Copyright />
				</Container>
			</footer>
		</div>
	);
}
