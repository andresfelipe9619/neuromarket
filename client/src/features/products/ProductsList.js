import React, { useState, useEffect, useContext } from 'react';
import Product from './Product';
import Grid from '@material-ui/core/Grid';
import Sppiner from '../Spinner/Sppiner';
import UserContext from "../../context/user-context";

const ProductsList = ({ products, ...actions }) => {
	const user = useContext(UserContext);
	console.log('user', user)
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
					<Product key={product._id} {...{ user, product, ...actions }} />
				</Grid>
			))}
		</Grid>
	);
};

export default ProductsList;
