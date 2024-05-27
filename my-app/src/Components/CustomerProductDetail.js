import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { styled, ThemeProvider } from '@mui/system'; 
import { createTheme } from '@mui/material/styles';

// Style the components using styled and sx prop
const ProductDetailContainer = styled('div')({
  flexGrow: 1,
  padding: theme => theme.spacing(2), // Using predefined spacing value
});

const ProductImage = styled('img')({
  maxWidth: '100%',
});

const ProductInfo = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginRight: theme.spacing(2), // Adding right margin
}));

const CustomerProductDetail = () => {
  const theme = createTheme();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [promotionId, setPromotionId] = useState(null);
  const token = useSelector(state => state.updateUserToken);
  const customerId =useSelector(state => state.updateUserId);
  ; // Assuming a fixed customer ID for demonstration

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/getProductByProductId?id=${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    const fetchPromotionId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/getPromotionId?productId=${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPromotionId(response.data);
      } catch (error) {
        console.error('Error fetching promotion ID:', error);
        setPromotionId(null);
      }
    };

    fetchProduct();
    fetchPromotionId();
  }, [productId, token]);

  const handleInterestedClick = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/promotion/interested?promotion_id=${promotionId}&customer_id=${customerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Interest registered:', response.data);
    } catch (error) {
      console.error('Error registering interest:', error);
    }
  };

  const handleOnClickBuy = async () => {
    try {
      if (promotionId) {
        const response = await axios.put(
          `http://localhost:8080/api/promotion/buy?promotion_id=${promotionId}&customer_id=${customerId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const response1 = await axios.put(
          `http://localhost:8080/api/promotion/interested?promotion_id=${promotionId}&customer_id=${customerId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Promotion bought:', response.data);
      } else {
        const response = await axios.post(
          `http://localhost:8080/api/buyProduct/${productId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Product bought:', response.data);
      }
    } catch (error) {
      console.error('Error buying product or promotion:', error);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <ProductDetailContainer>
        <br />
        {product ? (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <ProductImage src={product.imageUrl} alt={product.name} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ProductInfo>
                <Typography variant="h4" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Description: {product.description}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Price: {product.price}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Category: {product.category}
                </Typography>
                {/* Add more product details as needed */}
                {promotionId && (
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: '8px' }}
                    onClick={handleInterestedClick}
                  >
                    Interested
                  </Button>
                )}
                <Button variant="contained" color="primary" onClick={handleOnClickBuy}>
                  Buy
                </Button>
              </ProductInfo>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1" align="center">
            Loading product details...
          </Typography>
        )}
      </ProductDetailContainer>
    </ThemeProvider>
  );
};

export default CustomerProductDetail;