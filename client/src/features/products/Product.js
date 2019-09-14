import React, {useCallback} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorderOutlined';
import {makeStyles} from '@material-ui/core/styles';
import {Link, withRouter} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		paddingTop: '56.25%',
	},
	cardContent: {
		flexGrow: 1,
	},
	cardAction: {
		height: '100%',
	},
}));

const Product = ({user, product, addProductToCart, addProductToFavorites}) => {
	const classes = useStyles();
	const handleOnAddFavorite = useCallback(
		() => addProductToFavorites(product),
		[addProductToFavorites, product]
	);
	const handleOnAddProduct = useCallback(() => addProductToCart(product), [
		addProductToCart,
		product,
	]);
	const img =
		product.imageUrl || product.imageurls
			? product.imageurls.split(',')
			: 'https://source.unsplash.com/random';
	return (
		<Card className={classes.card}>
			<CardActionArea className={classes.cardAction}>
				<CardMedia
					className={classes.cardMedia}
					image={img[0]}
					title={product.name}
				/>
				<CardContent className={classes.cardContent}>
					<Typography gutterBottom variant='h5' component='h2'>
						<Link to={`/products/${product._id}`}>
							<strong>{product.name}</strong> - ${product.price}{' '}
						</Link>
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				{addProductToCart && (
					<Button size='small' color='primary' onClick={handleOnAddProduct}>
						Add to Cart
					</Button>
				)}
				{user.loggedIn && addProductToFavorites && (
					<IconButton color='inherit' onClick={handleOnAddFavorite}>
						<FavoriteBorderIcon />
					</IconButton>
				)}
			</CardActions>
		</Card>
	);
};
export default withRouter(
	React.memo(Product, (prev, next) => prev.product._id === next.product._id)
);
