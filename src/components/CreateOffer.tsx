/* eslint-disable quotes */
'use client';

import { createOffer, OfferRequest } from '@/services/offersService';
import { fetchUsers, User } from '@/services/userService';
import { AttachMoney } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

// Styled Card Component
const StyledCard = styled(Card)({
  margin: '20px auto',
  maxWidth: '720px',
  background: '#FFFFFF',
  boxShadow:
    '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

// Styled Header
const Header = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  padding: '24px 16px 24px 24px',
  gap: '16px',
  width: '100%',
  height: '102px',
  borderBottom: '1px solid rgba(145, 158, 171, 0.2)',
});

// Styled Button
const StyledButton = styled(Button)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px 16px',
  gap: '8px',
  width: '111px',
  minWidth: '64px',
  height: '48px',
  background: '#1C252E',
  borderRadius: '8px',
  color: '#FFFFFF',
  fontWeight: 700,
  fontSize: '15px',
  lineHeight: '26px',
  textTransform: 'none',
  '&:hover': {
    background: '#161D26',
  },
});

// Form Data Interface
interface FormData {
  planType: 'monthly' | 'yearly' | 'pay_as_you_go';
  additions: ('refundable' | 'on_demand' | 'negotiable')[];
  user: string;
  expired: string;
  price: string;
}

const CreateOffer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { control, register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      planType: 'monthly',
      additions: [],
      user: '',
      expired: '',
      price: '',
    },
  });

  // Fetch users when component loads
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetchUsers(1, 20, '');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    loadUsers();
  }, []);

  // Handle Form Submission
  const onSubmit = async (data: FormData) => {
    try {
      const selectedUser = users.find(
        (user) => user.id.toString() === data.user,
      );
      if (!selectedUser) {
        alert('Please select a valid user.');
        return;
      }

      const offerData: OfferRequest = {
        plan_type: data.planType,
        additions: data.additions,
        user_id: parseInt(data.user),
        expired: data.expired,
        price: parseFloat(data.price),
      };

      const response = await createOffer(offerData);
      alert(response.message);
    } catch (error) {
      console.error('Error creating offer:', error);
      alert('Failed to create offer. Please try again.');
    }
  };

  return (
    <>
      <StyledCard>
        {/* Header */}
        <Header>
          <Box width="100%">
            <Typography variant="h6" fontWeight="600">
              Create Offer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Send onboarding offer to a new user
            </Typography>
          </Box>
        </Header>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          px={3}
          py={3}
          width="100%"
        >
          {/* Plan Type */}
          <Box mb={2}>
            <Typography fontWeight="600" mb={1}>
              Plan Type
            </Typography>
            <Controller
              name="planType"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} row>
                  <FormControlLabel
                    value="pay_as_you_go"
                    control={<Radio />}
                    label="Pay As You Go"
                  />
                  <FormControlLabel
                    value="monthly"
                    control={<Radio />}
                    label="Monthly"
                  />
                  <FormControlLabel
                    value="yearly"
                    control={<Radio />}
                    label="Yearly"
                  />
                </RadioGroup>
              )}
            />
          </Box>

          {/* Additions */}
          <Box mb={2}>
            <Typography fontWeight="600" mb={1}>
              Additions
            </Typography>
            <Box display="flex" gap={2}>
              <FormControlLabel
                control={
                  <Checkbox {...register('additions')} value="refundable" />
                }
                label="Refundable"
              />
              <FormControlLabel
                control={
                  <Checkbox {...register('additions')} value="on_demand" />
                }
                label="On demand"
              />
              <FormControlLabel
                control={
                  <Checkbox {...register('additions')} value="negotiable" />
                }
                label="Negotiable"
              />
            </Box>
          </Box>

          {/* User Selection */}
          <Box mb={2}>
            <Typography fontWeight="600" mb={1}>
              User
            </Typography>
            <Controller
              name="user"
              control={control}
              render={({ field }) => (
                <Select {...field} fullWidth>
                  <MenuItem value="">-- Select a User --</MenuItem>
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id.toString()}>
                      {user.name} ({user.email})
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </Box>

          {/* Expired Date */}
          <Box mb={2}>
            <Typography fontWeight="600" mb={1}>
              Expired
            </Typography>
            <Controller
              name="expired"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    sx={{ width: '100%' }}
                    value={field.value ? new Date(field.value) : null}
                    onChange={(newValue: Date | null) => {
                      if (newValue) {
                        field.onChange(format(newValue, 'yyyy-MM-dd'));
                      } else {
                        field.onChange(null);
                      }
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          </Box>

          {/* Price */}
          <Box mb={2}>
            <Typography fontWeight="600" mb={1}>
              Price
            </Typography>
            <TextField
              fullWidth
              placeholder="Price"
              type="number"
              {...register('price')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Submit Button */}
          <Box display="flex" justifyContent="flex-end">
            <StyledButton type="submit">Send Offer</StyledButton>
          </Box>
        </Box>
      </StyledCard>
    </>
  );
};

export default CreateOffer;
