import React, {useContext, useEffect, useState, useCallback} from 'react';
import ShopContext from '../../context/shop-context';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Divider from '@material-ui/core/Divider';
import {Product} from '@neuromarket/services';
import ProductImage from './ProductImage';
import {Typography, Button} from '@material-ui/core';
import {withStyles} from '@material-ui/styles';

const styles = (theme) => ({
	root: {
		[theme.breakpoints.up('sm')]: {
			padding: theme.spacing(5),
		},
	},
	descriptionContainer: {
		[theme.breakpoints.down('md')]: {
			marginTop: theme.spacing(3),
			marginBottom: theme.spacing(3),
			padding: theme.spacing(5),
		},
	},
	title: {
		padding: theme.spacing(3),
	},
	price: {
		fontSize: '50px',
		padding: theme.spacing(3),
	},
	description: {
		color: theme.palette.text.secondary,
		fontSize: '24px',
		paddingTop: theme.spacing(3),
		textAlign: 'justify',
		lineHeight: '30px',
	},
	subtitle: {},
	caption: {
		padding: theme.spacing(3),
		fontSize: '20px',
	},
	cartbtn: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(3),
	},
	favsbtn: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
});
const ProductsDetailsPage = (props) => {
	const {addProductToCart} = useContext(ShopContext);
	const [product, setProduct] = useState(null);
	const {match} = props;
	useEffect(() => {
		const id = (match.params || {}).id;
		async function getProduct() {
			const {product} = await Product.get(id);
			setProduct(product);
		}

		id && getProduct();
	}, [match.params]);

	const handleOnAddProduct = useCallback(() => addProductToCart(product), [
		addProductToCart,
		product,
	]);

	if (!product) return 'Product Not Found';
	const {classes} = props;
	return (
		<React.Fragment>
			<div>
				<Grid container spacing={7} className={classes.root}>
					<Grid item key={product.id} xs={12} sm={6} md={6}>
						<ProductImage
							src={
								product.imageUrl || product.imageurls
									? product.imageurls.split(',')
									: 'https://source.unsplash.com/random'
							}
						/>
					</Grid>
					<Grid container item xs={12} sm={6} md={6} justify='center'>
						<Grid item sm={12} md={12}>
							<Typography variant='h2' className={classes.title}>
								{product.name}
							</Typography>
							<Typography variant='body2' className={classes.price}>
								$ {product.price}
							</Typography>
							<Typography variant='caption' className={classes.caption}>
								Free shipping
							</Typography>
						</Grid>
						<Grid container spacing={3}>
							<Grid item sm={6} md={6}>
								<Button
									variant='contained'
									color='primary'
									onClick={handleOnAddProduct}
									className={classes.cartbtn}
								>
									Add to Cart
								</Button>
								<IconButton
									edge='end'
									size='medium'
									color='inherit'
									className={classes.favsbtn}
								>
									<FavoriteBorderIcon fontSize='large' />
								</IconButton>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Divider variant='fullWidth' />
				<Grid
					container
					spacing={7}
					className={classes.descriptionContainer}
					style={{border: '2px solid gray'}}
				>
					<Grid xs={12} sm={12} md={12}>
						<Typography variant='h2'>Description</Typography>
						<Typography variant='body2' className={classes.description}>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text
							ever since the 1500s, when an unknown printer took a galley of
							type and scrambled it to make a type specimen book. It has
							survived not only five centuries, but also the leap into
							electronic typesetting, remaining essentially unchanged. It was
							popularised in the 1960s with the release of Letraset sheets
							containing Lorem Ipsum passages, and more recently with desktop
							publishing software like Aldus PageMaker including versions of
							Lorem Ipsum.
						</Typography>
					</Grid>
				</Grid>
			</div>
		</React.Fragment>
	);
};

export default withStyles(styles)(ProductsDetailsPage);
