import React, {useContext} from 'react';
import ShopContext from '../../context/shop-context';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import QuantitySelect from '../../components/quantity-select';
import useStyles from './styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const CartPage = (props) => {
	const {cart, subtotal, removeProductFromCart, addProductToCart} = useContext(
		ShopContext
	);
	const classes = useStyles();
	const goTo = (route) => (event) => props.history.push(route);
	const productSummary = cart.map((item) => {
		return {name: item.name, quantity: item.quantity};
	});

	return (
		<React.Fragment>
			{cart.length <= 0 ? (
				<Paper>
					<Typography variant='h5'>No Item in the Cart!</Typography>
				</Paper>
			) : (
				<div>
					<Grid container spacing={2}>
						{cart.map((product) => {
							const image =
								product.imageUrl || product.imageurls
									? product.imageurls.split(',')[0]
									: 'https://source.unsplash.com/random';
							const {_id, price, quantity, ammount} = product;
							return (
								<Grid item xs={12} sm={12} md={3}>
									<Card className={classes.card}>
										<CardHeader
											action={
												<IconButton aria-label='settings'>
													<MoreVertIcon />
												</IconButton>
											}
											title={product.name}
											subheader={product.brand}
										/>
										<CardMedia
											className={classes.media}
											image={image}
											title={product.name}
										/>
										<CardContent>
											<Typography
												variant='h4'
												color='textSecondary'
												component='h2'
											>
												<b>Price:</b> ${price}
											</Typography>
											<Typography
												variant='h4'
												color='textSecondary'
												component='h2'
											>
												<b>Quantity:</b> {quantity}
											</Typography>
											<Typography
												variant='h4'
												color='textSecondary'
												component='h2'
											>
												<b>Total ammount:</b> ${ammount}
											</Typography>
										</CardContent>
										<CardActions disableSpacing>
											<QuantitySelect
												quantity={quantity}
												remove={removeProductFromCart.bind(this, _id)}
												add={addProductToCart.bind(this, product)}
											/>
											<IconButton aria-label='add to favorites'>
												<FavoriteIcon />
											</IconButton>
										</CardActions>
									</Card>
								</Grid>
							);
						})}
						<Grid container item xs={12} sm={12} md={6}>
							<Card className={classes.subtotalCard}>
								<CardContent>
									<Typography variant='h2' component='h2'>
										Subtotal: ${subtotal}
									</Typography>
									<Typography variant='body1' component='h2' color='textSecondary' className={classes.summaryText}>
										<b>Summary:</b>
										{productSummary.map((product, index) => (
											<ul key={index}>{product.quantity} x {product.name}</ul>
										))}
									</Typography>
									<Button
										className={classes.checkoutbtn}
										variant='contained'
										color='secondary'
										onClick={goTo('/checkout')}
									>
										Checkout
									</Button>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</div>

				// <div className={classes.root}>
				// 	<Grid container spacing={8}>
				// 		<Grid container spacing={8} item xs={9} sm={9}>
				// 			{/* <Paper> */}
				// 			<Grid
				// 				container
				// 				item
				// 				xs={12}
				// 				sm={12}
				// 				alignItems='center'
				// 				justify='center'
				// 			>
				// 				<Grid item xs={12} sm={3}>
				// 					<Typography variant='h5'>Product</Typography>
				// 				</Grid>
				// 				<Grid item xs={12} sm={3}>
				// 					<Typography variant='h5'>Quantity</Typography>
				// 				</Grid>
				// 				<Grid item xs={12} sm={3}>
				// 					<Typography variant='h5'>Unit Price</Typography>
				// 				</Grid>
				// 				<Grid item xs={12} sm={3}>
				// 					<Typography variant='h5'>Ammount</Typography>
				// 				</Grid>
				// 			</Grid>
				// 			{cart.map((product) => {
				// 				const {_id, price, quantity, ammount} = product;
				// 				return (
				// 					<Grid
				// 						key={_id}
				// 						container
				// 						item
				// 						xs={12}
				// 						sm={12}
				// 						spacing={8}
				// 						justify='center'
				// 						alignItems='center'
				// 					>
				// 						<Grid item xs={12} sm={3}>
				// 							<Product product={product} />
				// 						</Grid>
				// 						<Grid item xs={12} sm={3}>
				// 							<QuantitySelect
				// 								quantity={quantity}
				// 								remove={removeProductFromCart.bind(this, _id)}
				// 								add={addProductToCart.bind(this, product)}
				// 							/>
				// 						</Grid>
				// 						<Grid item xs={12} sm={3}>
				// 							<Typography align='center' variant='h6'>
				// 								{price}
				// 							</Typography>
				// 						</Grid>
				// 						<Grid item xs={12} sm={3}>
				// 							<Typography align='center' variant='h6'>
				// 								{ammount}
				// 							</Typography>
				// 						</Grid>
				// 						<hr />
				// 					</Grid>
				// 				);
				// 			})}
				// 			{/* </Paper> */}
				// 		</Grid>
				// 		<div className={classes.sticky}>
				// 			<Grid container item xs={3} sm={3} justify='center'>
				// 				{/* <Paper> */}
				// 				<Grid item xs={12} sm={12}>
				// 					<Typography variant='h6'>
				// 						{' '}
				// 						Subtotal: USD
				// 						{subtotal}
				// 					</Typography>
				// 				</Grid>
				// 				<Grid item xs={8} sm={8}>
				// 					<Button
				// 						className={classes.checkoutbtn}
				// 						variant='contained'
				// 						color='secondary'
				// 						onClick={goTo('/checkout')}
				// 					>
				// 						Checkout
				// 					</Button>
				// 				</Grid>
				// 				{/* </Paper> */}
				// 			</Grid>
				// 		</div>
				// 	</Grid>
				// </div>
			)}
		</React.Fragment>
	);
};

export default CartPage;
