'use client';

import { DashboardSummary } from '@/services/dashboardService';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MouseEvent, useState } from 'react';

// Styled button using MUI's styled API
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 'bold',
  color: theme.palette.text.primary,
  borderColor: 'rgba(145, 158, 171, 0.32)',
  '&:hover': { borderColor: 'rgba(145, 158, 171, 0.5)' },
}));

const DashboardHeader: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {/* Title */}
      <Typography variant="h5" fontWeight="bold" color="text.primary">
        Dashboard
      </Typography>

      {/* Dropdown Button */}
      <StyledButton
        variant="outlined"
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleClick}
      >
        This Week
      </StyledButton>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'dropdown-button' }}
      >
        <MenuItem onClick={handleClose}>Today</MenuItem>
        <MenuItem onClick={handleClose}>This Week</MenuItem>
        <MenuItem onClick={handleClose}>This Month</MenuItem>
      </Menu>
    </div>
  );
};

export default DashboardHeader;
