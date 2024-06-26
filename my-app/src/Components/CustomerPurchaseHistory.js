import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const CustomerPurchaseHistory = () => {
    const [products, setProducts] = useState([]);
    const token = useSelector(state => state.updateUserToken);
    const customerId = useSelector(state => state.updateUserId);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const [productsResponse, promotionsResponse] = await Promise.all([
                    axios.get('https://focused-reflection-production.up.railway.app/api/myPurchasedProducts', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }),
                    axios.get(`https://focused-reflection-production.up.railway.app/api/promotion/bought/${customerId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                ]);

                const combinedProducts = [...productsResponse.data, ...promotionsResponse.data];
                setProducts(combinedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [token, customerId]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell component="th" scope="row">
                                {product.name}
                            </TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell align="right">{product.category}</TableCell>
                            <TableCell align="right">{product.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CustomerPurchaseHistory;