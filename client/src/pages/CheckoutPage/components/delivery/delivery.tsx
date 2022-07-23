import { Box, Button, FormControl, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ClearIcon from '@mui/icons-material/Clear';
import { Form, Formik } from 'formik';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AddressForm } from '../address/address-form';
import { CheckoutStepper } from '../checkout-stepper/checkout-stepper';

import { ShippingMethod } from '../delivery/components/shipping-method';
import { SignupForm } from '../signup/signup-form';
import { DeliveryFormValues } from './delivery-form-values.interface';
import { deliveryFormSchema } from './delivery-form.schema';
import {
  DeliveryFormProps,
  mapDispatchToProps,
  mapStateToProps,
} from './delivery.props';
import { ShippingCompany } from './components/shipping-company';

const DeliveryFormControl = styled(FormControl)(({ theme }) => ({
  display:'block',
  textAlign:'left',
  marginTop: theme.spacing(2),
}));

const Delivery: FunctionComponent<DeliveryFormProps> = ({
  deliveryForm,
  submitDeliveryForm,
  clearDeliveryForm,
}) => {
  const navigate = useNavigate();
  const submitForm = (values: DeliveryFormValues) => {
    submitDeliveryForm(values);
    // logic redirect
    navigate('/checkout/payment');
  };
  const { t } = useTranslation();

  return (
    <>
      <CheckoutStepper />
      <Formik
        enableReinitialize={true}
        validationSchema={deliveryFormSchema(t)}
        initialValues={deliveryForm}
        onSubmit={submitForm}
      >
        {({ errors, touched, values }) => (
          <Form>
            <DeliveryFormControl>
              <Button
                type="reset"
                variant="contained"
                endIcon={<ClearIcon />}
                size="large"
                onClick={clearDeliveryForm}
              >
                {t('checkout.clear')}
              </Button>
            </DeliveryFormControl>
            <DeliveryFormControl>
              <Typography variant="h5" component="legend" gutterBottom>
                {t('checkout.shippingAddress')}
              </Typography>
              <AddressForm
                formName="shippingAddress"
                errors={errors.shippingAddress}
                touched={touched.shippingAddress}
              />
            </DeliveryFormControl>
            <DeliveryFormControl>
              <Typography variant="h5" component="legend" gutterBottom>
                {t('checkout.shippingCompany.title')}
              </Typography>
              <ShippingCompany />
            </DeliveryFormControl>
            <DeliveryFormControl>
              <Typography variant="h5" component="legend" gutterBottom>
                {t('checkout.shippingMethod.title')}
              </Typography>
              <ShippingMethod />
            </DeliveryFormControl>
            <DeliveryFormControl>
              <Typography variant="h5" component="legend" gutterBottom>
                {t('checkout.customerInfo')}
              </Typography>
              <SignupForm
                formName="signup"
                errors={errors.signup}
                touched={touched.signup}
                values={values.signup}
              />
            </DeliveryFormControl>
            <Box textAlign="right" mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<ArrowRightAltIcon />}
                size="large"
              >
                Continue
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);