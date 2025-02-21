'use client';

import { getOffers, Offer, OfferApiResponse } from '@/services/offersService';
import { Edit, MoreVert, Search } from '@mui/icons-material';
import {
  Box,
  Card,
  Chip,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

// Styled Card Component
const StyledCard = styled(Card)({
  padding: '24px',
  borderRadius: '16px',
  boxShadow:
    '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  marginTop: '20px',
});

// Styled Table Header Cell
const StyledTableCell = styled(TableCell)({
  fontWeight: 600,
  color: '#1C252E',
  backgroundColor: '#F9FAFB',
});

// Offer Status Colors
const getStatusChip = (status: string) => {
  switch (status) {
    case 'accepted':
      return (
        <Chip
          label="Accepted"
          sx={{ backgroundColor: '#D1FAE5', color: '#065F46' }}
        />
      );
    case 'rejected':
      return (
        <Chip
          label="Rejected"
          sx={{ backgroundColor: '#FEE2E2', color: '#B91C1C' }}
        />
      );
    case 'pending':
      return (
        <Chip
          label="Pending"
          sx={{ backgroundColor: '#FEF3C7', color: '#B45309' }}
        />
      );
    default:
      return <Chip label={status} />;
  }
};

const OfferList: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalOffers, setTotalOffers] = useState(0);

  // Fetch Offers from API
  const fetchOffers = async () => {
    try {
      const response: OfferApiResponse = await getOffers(
        page,
        rowsPerPage,
        search,
        filterType !== 'All' ? filterType : undefined,
        tab === 1 ? 'accepted' : undefined,
      );
      setOffers(response.data);
      setTotalOffers(response.meta.total);
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [page, rowsPerPage, search, filterType, tab]);

  // Handle Tab Change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) =>
    setTab(newValue);

  // Handle Pagination
  const handleChangePage = (_event: unknown, newPage: number) =>
    setPage(newPage + 1);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <StyledCard>
      {/* Header */}
      <Typography variant="h6" fontWeight="600" py={3}>
        Offer List
      </Typography>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={handleTabChange}
        sx={{ borderBottom: '1px solid #E5E7EB', mb: 2 }}
      >
        <Tab label="All" />
        <Tab label="Accepted" />
      </Tabs>

      {/* Search & Filter */}
      <Box display="flex" gap={2} mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
        </Select>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Phone number</StyledTableCell>
              <StyledTableCell>Company</StyledTableCell>
              <StyledTableCell>Job Title</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell>
                  <Typography fontWeight={600}>{offer.user_name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {offer.email}
                  </Typography>
                </TableCell>
                <TableCell>{offer.phone}</TableCell>
                <TableCell>{offer.company}</TableCell>
                <TableCell>{offer.jobTitle}</TableCell>
                <TableCell>{offer.type}</TableCell>
                <TableCell>{getStatusChip(offer.status)}</TableCell>
                <TableCell align="right">
                  <IconButton>
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton>
                    <MoreVert fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalOffers}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </StyledCard>
  );
};

export default OfferList;
