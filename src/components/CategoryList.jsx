import React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const CategoryList = ({ categories, selectedCategory, onSelectCategory, loading }) => (
  <Box sx={{ width: 250, flexShrink: 0, borderRight: 1, borderColor: 'divider' }}>
    <List>
      {loading ? (
        [...Array(5)].map((_, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <Skeleton variant="text" width={150} height={24} />
            </ListItemButton>
          </ListItem>
        ))
      ) : (
        categories.map((category, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              component={Link}
              to={`/${category}`}
              selected={category === selectedCategory}
              onClick={() => onSelectCategory(category)}
            >
              <ListItemText primary={category.replace('.json', '').replace(/([A-Z])/g, ' $1').trim()} />
            </ListItemButton>
          </ListItem>
        ))
      )}
    </List>
  </Box>
);

export default CategoryList;