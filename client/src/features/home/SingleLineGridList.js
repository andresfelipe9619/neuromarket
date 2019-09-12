import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

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
      height:"auto",
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  }),
);

 const tileData = [
 { 
    "name" : "Game Pass Xbox One", 
    "price" : 3.99, 
    "brand" : "Microsoft", 
    "category" : "5d79a014293f910aeaa99db6", 
    "imageurls" : "https://s2.gaming-cdn.com/images/products/2320/orig/xbox-game-pass-1-mes-xbox-one-solo-cuentas-nuevas-cover.jpg", 
    "manufacturer" : "", 
    "weight" : "120 gr", 
    "_id" : "5d79b5439c86ce7e5db44149"
},
{ 
    "name" : "Consola de Juegos Xbox One s", 
    "price" : 300.99, 
    "brand" : "Microsoft", 
    "category" : "5d79a014293f910aeaa99db6", 
    "imageurls" : " https://compass-ssl.xbox.com/assets/05/b0/05b01a46-58eb-4927-ad21-3c43b545ebaf.jpg?n=X1S-2019_Panes-2-Up-1084_111_570x400.jpg", 
    "manufacturer" : "", 
    "weight" : "4.6 kg", 
    "_id" : "5d79b4639c86ce7e5db44148"
},
 { 
    "name" : "Game Pass Xbox One", 
    "price" : 3.99, 
    "brand" : "Microsoft", 
    "category" : "5d79a014293f910aeaa99db6", 
    "imageurls" : "https://s2.gaming-cdn.com/images/products/2320/orig/xbox-game-pass-1-mes-xbox-one-solo-cuentas-nuevas-cover.jpg", 
    "manufacturer" : "", 
    "weight" : "120 gr", 
    "_id" : "5d79b5439c86ce7e5db4411239"
},
{ 
    "name" : "Consola de Juegos Xbox One s", 
    "price" : 300.99, 
    "brand" : "Microsoft", 
    "category" : "5d79a014293f910aeaa99db6", 
    "imageurls" : " https://compass-ssl.xbox.com/assets/05/b0/05b01a46-58eb-4927-ad21-3c43b545ebaf.jpg?n=X1S-2019_Panes-2-Up-1084_111_570x400.jpg", 
    "manufacturer" : "", 
    "weight" : "4.6 kg", 
    "_id" : "5d79b4639c86ce7e5d23344148"
}

];

export default function SingleLineGridList() {
  const classes = useStyles();

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