import React, { useState, useEffect } from 'react';
import Product from './Product';
import Grid from '@material-ui/core/Grid';
import Sppiner from '../Spinner/Sppiner';

const ProductsList = ({ products, ...actions }) => {
	console.log('el arreglo de productos es ' + products);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, [products]);

	if (isLoading) return <Sppiner />;
	return !products.length ? (
		<p>No Items found</p>
	) : (
		<Grid container spacing={4}>
			{products.map(product => (
				<Grid item key={product._id} xs={12} sm={4} md={3}>
					<Product key={product._id} {...{ product, ...actions }} />
				</Grid>
			))}
		</Grid>
	);
};

export default ProductsList;
