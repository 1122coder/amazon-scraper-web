import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from './components/Header';
import CategoryList from './components/CategoryList';
import ProductTable from './components/ProductTable';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    fetch('/output/categories.json')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      fetch(`/output/${selectedCategory}`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          setLoading(false);
        })
        .catch(error => console.error('Error fetching products:', error));
    }
  }, [selectedCategory]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header 
            title="Amazon Data Scraping Project" 
            darkMode={darkMode} 
            setDarkMode={setDarkMode}
            handleDrawerToggle={handleDrawerToggle}
          />
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            {isMobile ? (
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                <CategoryList 
                  categories={categories} 
                  selectedCategory={selectedCategory}
                  onSelectCategory={(category) => {
                    setSelectedCategory(category);
                    setMobileOpen(false);
                  }}
                  loading={loading}
                />
              </Drawer>
            ) : (
              <Box component="nav" sx={{ width: { sm: 250 }, flexShrink: { sm: 0 } }}>
                <CategoryList 
                  categories={categories} 
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  loading={loading}
                />
              </Box>
            )}
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 250px)` } }}>
              <Routes>
                <Route 
                  path="/:category" 
                  element={<ProductTable products={products} loading={loading} />} 
                />
                <Route 
                  path="/" 
                  element={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>Please select a category</Box>} 
                />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;