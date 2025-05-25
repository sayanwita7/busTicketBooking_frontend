import React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function CustomDatePicker({ date, setDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select date"
        value={date}
        onChange={(newValue) => setDate(newValue)}
        minDate={dayjs()}
        sx={{
          backgroundColor: 'white',
          borderRadius: '8px',
          input: {
            padding: '10px',
          },
        }}
      />
    </LocalizationProvider>
  );
}
