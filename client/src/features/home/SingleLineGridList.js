import React, { useState, useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Product } from "@neuromarket/services";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'space-around',
			overflow: 'hidden',
			backgroundColor: theme.palette.background.paper,
		},
		gridList: {
			flexWrap: 'nowrap',
			height: 'auto',
			// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
			transform: 'translateZ(0)',
		},
		title: {
			color: theme.palette.primary.light,
		},
		titleBar: {
			background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
		},
	})
);

export default function SingleLineGridList() {
  const classes = useStyles();
  
	const [products, setProducts] = useState([]);
	useEffect(() => {
		async function getProducts() {
			const { products } = await Product.getAll();
			setProducts(products);
		}
		getProducts();
  }, []);

  console.log(products.length);
  const tileData =[];
    products.map(product=>{
      if(product.offer === true){
        console.log(product.offer);
        
        tileData.push(product)
        return tileData  
      }    
    })
 
  console.log(tileData);
    

	return (
		<div className={classes.root}>
			<GridList className={classes.gridList} cols={2.5}>
				{tileData.map(tile => (
					<GridListTile key={tile._id}>
						<img src={tile.imageurls} alt={tile.price} />
						<GridListTileBar
							title={tile.name}
							classes={{
								root: classes.titleBar,
								title: classes.title,
							}}
							actionIcon={
								<IconButton aria-label={`star ${tile.name}`}>
									<StarBorderIcon className={classes.title} />
								</IconButton>
							}
						/>
					</GridListTile>
				))}
			</GridList>
		</div>
	);
}
