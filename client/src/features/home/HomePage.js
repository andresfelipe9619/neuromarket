import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useStyles from './styles';
import { Product } from '@neuromarket/services';
import ProductsList from '../products/ProductsList';
import { Typography } from '@material-ui/core';
import SingleLineGridList from './SingleLineGridList';

export default function HomePage() {
	const classes = useStyles();
	const [products, setProducts] = useState([]);
	useEffect(() => {
		async function getProducts() {
			const { products } = await Product.getAll();
			setProducts(products);
		}
		getProducts();
	}, []);
	return (
		<React.Fragment>
			<main>
				<div className={classes.title}>
					<Typography variant="h2"> DISCOUNTED PRODUCTS 20 % </Typography>
				</div>
				<Paper className={classes.mainFeaturedPost}>
					<Grid container>
						<Grid item md={12}>
							<SingleLineGridList products={products} />
						</Grid>
					</Grid>
				</Paper>
				<div className={classes.title}>
					<Typography variant="h3">Best Sellers</Typography>
				</div>
				<ProductsList products={products} />
				<Grid container spacing={5} className={classes.mainGrid}></Grid>
			</main>
		</React.Fragment>
	);
}
