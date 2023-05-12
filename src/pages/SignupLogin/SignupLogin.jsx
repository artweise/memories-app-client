import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TextField,
  IconButton,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Typography,
} from '@mui/material';
import { AuthContext } from '../../context/auth.context';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Navbar from '../../components/Navbar/Navbar';
import Button from '../../components/AppComponents/Button/Button';
import LinkTypography from '../../components/AppComponents/LinkTypography/LinkTypography';
import { signup, login } from '../../sevices/authService';
import { notifySuccess, notifyError } from '../../utilities/toastUtilities';
import { PageContainer } from '../style';
import { Container, StyledForm, FlexRow, textFieldStyled, submitButtonStyles } from './style';
import { PURPLE_SHADES } from '../../utilities/globalStyles';

const FormAuth = ({ title }) => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    showPassword: false,
    msg: '',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const clearState = () => {
    setValues({
      ...values,
      email: '',
      password: '',
      username: '',
      msg: '',
    });
  };

  const setMessageAndClearValues = (msg) => {
    setValues({
      ...values,
      username: '',
      email: '',
      password: '',
      msg,
    });
  };

  const handleError = (msg) => {
    setLoading(false);
    setMessageAndClearValues(msg);
    notifyError(msg);
  };

  const handleSubmit = async (title) => {
    let data = {
      email: values.email,
      password: values.password,
    };
    setLoading(true);
    if (title === 'Sign Up') {
      data = { ...data, username: values.username };
      try {
        const response = await signup(data);
        setMessageAndClearValues(response.data.message);
        setLoading(false);
        notifySuccess('Signed up successfully. Please log in');
        navigate('/login');
      } catch (e) {
        handleError(e.response.data.message);
      }
    } else if (title === 'Log In') {
      try {
        const response = await login(data);
        setValues({
          ...values,
          email: '',
          password: '',
        });
        // Save the token in the localStorage.
        storeToken(response.data.accessToken);
        // Verify the token by sending a request
        // to the server"s JWT validation endpoint.
        await authenticateUser();
        notifySuccess('Logged in successfully.');
        setLoading(false);
        navigate('/families');
      } catch (e) {
        handleError(e.response.data.message);
      }
    }
  };

  const renderLink = (title) => {
    return title === 'Sign Up' ? (
      <Link to='/login'>
        <LinkTypography color={PURPLE_SHADES[700]} text='Log In' />
      </Link>
    ) : (
      <FlexRow>
        <Typography>No account? </Typography>
        <Link to='/signup'>
          <LinkTypography color={PURPLE_SHADES[700]} text='Sign Up' />
        </Link>
      </FlexRow>
    );
  };

  const renderPasswordIcon = () => {
    return (
      <InputAdornment position='end'>
        <IconButton
          aria-label='toggle password visibility'
          onClick={handleClickShowPassword}
          onSubmit={(event) => event.preventDefault()}
          edge='end'
        >
          {values.showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    );
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <Container>
          <h2>{title}</h2>
          <StyledForm
            autoComplete='off'
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(title);
            }}
          >
            {title === 'Sign Up' && (
              <TextField
                required
                id='username'
                label='Username'
                type='text'
                value={values.username}
                sx={textFieldStyled}
                onChange={handleChange('username')}
              />
            )}
            <TextField
              id='email'
              label='Email'
              type='email'
              value={values.email}
              sx={textFieldStyled}
              required
              onChange={handleChange('email')}
            />
            <FormControl sx={textFieldStyled} variant='outlined'>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <OutlinedInput
                id='password'
                required
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                // showPassword icon at the end of the input field
                endAdornment={renderPasswordIcon()}
                label='Password'
              />
            </FormControl>
            <Button
              type='submit'
              sx={submitButtonStyles}
              loading={loading}
              disabled={
                loading ||
                (title === 'Sign Up' && !values.username && !values.email && !values.password) ||
                (title === 'Log In' && !values.email) ||
                !values.password
              }
            >
              {title === 'Sign Up' ? 'Sign Up' : 'Log In'}
            </Button>
            <div style={{ marginTop: '0.5rem' }} onClick={clearState}>
              {renderLink(title)}
            </div>
          </StyledForm>
        </Container>
      </PageContainer>
    </>
  );
};

export default FormAuth;
