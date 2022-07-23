import { Box, Button, FormControl, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { FunctionComponent } from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';
import { CheckboxWithLabel } from 'formik-mui';
import { useNavigate } from 'react-router-dom';

import { AddressForm } from '../address/address-form';
import { PaymentMethod } from './components/payment-method';
import { CheckoutStepper } from '../checkout-stepper/checkout-stepper';

import { paymentFormSchema } from './payment-form.schema';
import { CreditCard } from '../credit-card/credit-card';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import {
  mapDispatchToProps,
  mapStateToProps,
  PaymentFormProps,
} from './payment.props';
import { PaymentFormValues } from './payment-form-values.interface';

const PaymentFormControl = styled(FormControl)(({ theme }) => ({
  display:'block',
  textAlign:'left',
  marginTop: theme.spacing(2),
}));

export const Payment: FunctionComponent<PaymentFormProps> = ({
  paymentForm,
  submitPaymentForm,
  clearPaymentForm,
}) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/checkout/delivery');
  };
  const submitForm = (values: PaymentFormValues) => {
    submitPaymentForm(values);
    navigate('/checkout/confirmation');
  }
  const { t } = useTranslation();

  return (
    <>
    <CheckoutStepper />
    <Formik
      validationSchema={paymentFormSchema(t)}
      initialValues={paymentForm}
      onSubmit={submitForm}
    >
      {({ errors, touched, values, handleChange, setFieldTouched }) => (
        <Form>
          <PaymentFormControl>
              <Button
                type="reset"
                variant="contained"
                endIcon={<ClearIcon />}
                size="large"
                onClick={clearPaymentForm}
              >
                {t('checkout.clear')}
              </Button>
          </PaymentFormControl>
          <PaymentFormControl>
            <Typography variant="h5" component="legend" gutterBottom>
              {t('checkout.billingAddress')}
            </Typography>
            <Field
              component={CheckboxWithLabel}
              type="checkbox"
              name="sameAsShipping"
              Label={{ label: t('checkout.sameAsShipping') }}
            />
            {!values.sameAsShipping && (
              <AddressForm
                formName="billingAddress"
                errors={errors.billingAddress}
                touched={touched.billingAddress}
              />
            )}
          </PaymentFormControl>
          <PaymentFormControl>
            <Typography variant="h5" component="legend" gutterBottom>
                  {t('checkout.paymentMethod.title')}
            </Typography>
            <PaymentMethod />
          </PaymentFormControl>
          {(values.paymentMethod == 'creditcard') && (
            <CreditCard
              formName="creditCard"
              errors={errors.creditCard}
              touched={touched.creditCard}
              values={values.creditCard}
              handleChange={handleChange}
            />
          )}
          <Box
            textAlign="right"
            display="flex"
            justifyContent="space-between"
            mt={2}
          >
            <Button
              type="button"
              variant="contained"
              color="secondary"
              endIcon={<ArrowBackIcon />}
              size="large"
              onClick={goBack}
            >
              {t('checkout.previous')}
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<ArrowRightAltIcon />}
              size="large"
            >
              {t('checkout.continue')}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);