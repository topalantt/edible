import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import styled from 'styled-components';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Button, Box } from '@mui/material';
import { Restaurant, List, FoodBank } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Nav = styled.nav`
  background-color: #f0f0f0;
  padding: 1rem;
`;

export const Navbar = () => {
  const theme = useTheme();
  // @ts-ignore
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
      <ButtonGroup
        variant="contained"
        orientation={isSmallScreen ? 'vertical' : 'horizontal'}
        fullWidth={isSmallScreen}
      >
        <Button href="/" variant="contained">
          <Restaurant />
          Edible
        </Button>
        <Button href="/products" variant="contained">
          <FoodBank />
          Products
        </Button>
        <Button href="/history" variant="contained">
          <List />
          History
        </Button>
      </ButtonGroup>
    </Box>
  );
};
