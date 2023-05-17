import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DatePickerComponent = ({ date, setDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        id='date'
        label='Date'
        onChange={(newValue) => setDate(newValue)}
        value={date}
        format='dd/MMMM/yyyy'
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
