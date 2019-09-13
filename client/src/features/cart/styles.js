import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: 'center',
		padding: theme.spacing(1),
	},
	sticky: {
		position: 'sticky',
	},
	card: {
		maxWidth: 345,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
  },
  subtotalCard: {
    margin: theme.spacing(5),
  },
  summaryText: {
    padding: theme.spacing(3),
  },
	checkoutbtn: {
		margin: theme.spacing(1),
	},
}));
export default useStyles;
