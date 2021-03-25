import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useTheme } from '@material-ui/core/styles';
import FuseAnimate from '../../../../../@fuse/core/FuseAnimate';
import FusePageCarded from '../../../../../@fuse/core/FusePageCarded';
import FuseLoading from '../../../../../@fuse/core/FuseLoading';
import { useForm } from '../../../../../@fuse/hooks';
import _ from '../../../../../@lodash';
import withReducer from '../../../../store/withReducer';
import reducer from '../store';
import { saveUser, newUser, getUser } from '../store/userSlice';
import FuseChipSelect from '../../../../../@fuse/core/FuseChipSelect';

function User(props) {
  const dispatch = useDispatch();
  const user = useSelector(({ userApp }) => userApp.user);
  const theme = useTheme();
  const routeParams = useParams();

  const [tabValue, setTabValue] = useState(0);
  const { form, handleChange, setForm } = useForm(null);
  const genders = [
    {
      value: 'male',
      label: 'Male',
    },
    {
      value: 'female',
      label: 'Female',
    },
    {
      value: 'other',
      label: 'Other',
    },
  ];

  useEffect(() => {
    function updateUserState() {
      const { userId } = routeParams;

      if (userId === 'new') {
        dispatch(newUser());
      } else {
        dispatch(getUser(routeParams));
      }
    }

    updateUserState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if ((user && !form) || (user && form && user._id !== form._id)) {
      setForm(user);
    }
  }, [form, user, setForm]);

  function handleChangeTab(event, mTabValue) {
    setTabValue(mTabValue);
  }

  function handleChipChange(value, name) {
    setForm(
      _.set(
        { ...form },
        name,
        value,
      ),
    );
  }

  function canBeSubmitted() {
    // return form.name.length > 0 && !_.isEqual(user, form);
    return !_.isEqual(user, form);
  }

  if ((!user || (user && routeParams.userId !== user.id)) && routeParams.userId !== 'new') {
    return <FuseLoading />;
  }

  return (
    <FusePageCarded
      classes={{
        toolbar: 'p-0',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={
        form && (
          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full">
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Typography
                  className="normal-case flex items-center sm:mb-12"
                  component={Link}
                  role="button"
                  to="/users"
                  color="inherit"
                >
                  <Icon className="text-20">
                    {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                  </Icon>
                  Users
                </Typography>
              </FuseAnimate>

              <div className="flex items-center max-w-full">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                  {form.image ? (
                    <img
                      className="w-32 sm:w-48 mr-8 sm:mr-16 rounded"
                      src={form.image}
                      alt={form.name}
                    />
                  ) : (
                    <img
                      className="w-32 sm:w-48 mr-8 sm:mr-16 rounded"
                      src="assets/images/ecommerce/product-image-placeholder.png"
                      alt={form.name}
                    />
                  )}
                </FuseAnimate>
                <div className="flex flex-col min-w-0">
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="text-16 sm:text-20 truncate">
                      {form.name ? form.name : 'New User'}
                    </Typography>
                  </FuseAnimate>
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography variant="caption">User Detail</Typography>
                  </FuseAnimate>
                </div>
              </div>
            </div>
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
              <Button
                className="whitespace-no-wrap normal-case"
                variant="contained"
                color="secondary"
                disabled={!canBeSubmitted()}
                onClick={() => {
                  dispatch(saveUser(form)).then(() => {
                    props.history.push('/users');
                  });
                }}
              >
                Save
              </Button>
            </FuseAnimate>
          </div>
        )
      }
      contentToolbar={(
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          classes={{ root: 'w-full h-64' }}
        >
          <Tab className="h-64 normal-case" label="Basic Info" />
          <Tab className="h-64 normal-case" label="Personal Information" />
          <Tab className="h-64 normal-case" label="Notification Settings" />
          <Tab className="h-64 normal-case" label="Pricing" />
          <Tab className="h-64 normal-case" label="Inventory" />
          <Tab className="h-64 normal-case" label="Shipping" />
        </Tabs>
      )}
      content={
        form && (
          <div className="p-16 sm:p-24 max-w-2xl">
            {tabValue === 0 && (
              <div>
                <TextField
                  className="mt-8 mb-16"
                  label="Name"
                  autoFocus
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  className="mt-8 mb-16"
                  error={form.email === ''}
                  required
                  label="Email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  className="mt-8 mb-16"
                  id="ge"
                  name="description"
                  onChange={handleChange}
                  label="Description"
                  type="text"
                  value={form.description}
                  multiline
                  rows={5}
                  variant="outlined"
                  fullWidth
                />

                <FuseChipSelect
                  className="mt-8 mb-24"
                  value={form.gender}
                  options={genders}
                  onChange={(value) => handleChipChange(value, 'gender')}
                  placeholder="Select gender"
                  textFieldProps={{
                    label: 'Gender',
                    InputLabelProps: {
                      shrink: true,
                    },
                    variant: 'outlined',
                  }}
                />

              </div>
            )}
            {tabValue === 1 && (
              <div>
                <TextField
                  className="mt-8 mb-16"
                  label="Tax Excluded Price"
                  id="priceTaxExcl"
                  name="priceTaxExcl"
                  value={form.priceTaxExcl}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  type="number"
                  variant="outlined"
                  autoFocus
                  fullWidth
                />

                <TextField
                  className="mt-8 mb-16"
                  label="Tax Included Price"
                  id="priceTaxIncl"
                  name="priceTaxIncl"
                  value={form.priceTaxIncl}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  type="number"
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  className="mt-8 mb-16"
                  label="Tax Rate"
                  id="taxRate"
                  name="taxRate"
                  value={form.taxRate}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  type="number"
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  className="mt-8 mb-16"
                  label="Compared Price"
                  id="comparedPrice"
                  name="comparedPrice"
                  value={form.comparedPrice}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  type="number"
                  variant="outlined"
                  fullWidth
                  helperText="Add a compare price to show next to the real price"
                />
              </div>
            )}
            {tabValue === 2 && (
              <div>
                <TextField
                  className="mt-8 mb-16"
                  required
                  label="SKU"
                  autoFocus
                  id="sku"
                  name="sku"
                  value={form.sku}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  className="mt-8 mb-16"
                  label="Quantity"
                  id="quantity"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  variant="outlined"
                  type="number"
                  fullWidth
                />
              </div>
            )}
            {tabValue === 3 && (
              <div>
                <div className="flex">
                  <TextField
                    className="mt-8 mb-16 mr-8"
                    label="Width"
                    autoFocus
                    id="width"
                    name="width"
                    value={form.width}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />

                  <TextField
                    className="mt-8 mb-16 mr-8"
                    label="Height"
                    id="height"
                    name="height"
                    value={form.height}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />

                  <TextField
                    className="mt-8 mb-16 mr-8"
                    label="Depth"
                    id="depth"
                    name="depth"
                    value={form.depth}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </div>

                <TextField
                  className="mt-8 mb-16"
                  label="Weight"
                  id="weight"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  className="mt-8 mb-16"
                  label="Extra Shipping Fee"
                  id="extraShippingFee"
                  name="extraShippingFee"
                  value={form.extraShippingFee}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  fullWidth
                />
              </div>
            )}
          </div>
        )
      }
      innerScroll
    />
  );
}

export default withReducer('userApp', reducer)(User);
