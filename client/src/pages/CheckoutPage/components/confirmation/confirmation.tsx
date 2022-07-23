import { Typography, Divider, Box, Button } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useEffect, FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AddressFormValues } from '../address/address-form-values.interface';
import { CheckoutStepper } from '../checkout-stepper/checkout-stepper';
import { Purchase } from '../../../PaymentPage/purchase';
import  getCart  from '../../store/cartStore';

import { ConfirmationProps, mapStateToProps } from './confirmation.props';

const AddressDisplay: FunctionComponent<{ address: AddressFormValues }> = ({
  address,
}) => {
  return (
    <>
      {address.firstName} {address.lastName} <br />
      {address.addressLine1} <br />
      {address.addressLine2 && (
        <>
          {address.addressLine2} <br />
        </>
      )}
      {address.city}, {address.provinceState}, {address.country}{' '}
      {address.zipPostalCode}
    </>
  );
};

const Confirmation: FunctionComponent<ConfirmationProps> = ({
  deliveryForm,
  paymentForm,
}) => {
  const navigate = useNavigate();
  const submitForm = () => {
    navigate('/payment');
  }
  const goBack = () => {
    navigate('/checkout/payment');
  };
  const { t } = useTranslation();
  
  return (
    <>
      <CheckoutStepper />
      <form onSubmit={submitForm}>
        <Typography variant="h3" gutterBottom textAlign={"left"}>
          {t('checkout.delivery')}
        </Typography>
        <Typography variant="h6" gutterBottom textAlign={"left"}>
          {t('checkout.shippingAddress')}
        </Typography>
        <Typography variant="body1" gutterBottom textAlign={"left"}>
          <AddressDisplay address={deliveryForm.shippingAddress} />
        </Typography>
        <Typography variant="h6" gutterBottom textAlign={"left"}>
          {t('checkout.shippingCompany.title')}
        </Typography>
        <Typography variant="body1" gutterBottom textAlign={"left"}>
          {t('checkout.shippingCompany.' + deliveryForm.shippingCompany)}
        </Typography>
        <Typography variant="h6" gutterBottom textAlign={"left"}>
          {t('checkout.shippingMethod.title')}
        </Typography>
        <Typography variant="body1" gutterBottom textAlign={"left"}>
          {t('checkout.shippingMethod.' + deliveryForm.shippingMethod)}
        </Typography>
        <Divider />

        <Typography variant="h3" gutterBottom textAlign={"left"}>
          {t('checkout.payment')}
        </Typography>
        <Typography variant="h6" gutterBottom textAlign={"left"}>
          {t('checkout.billingAddress')}
        </Typography>
        <Typography variant="body1" gutterBottom textAlign={"left"}>
          {paymentForm.sameAsShipping && t('checkout.sameAsShipping')}
        </Typography>
        {!paymentForm.sameAsShipping && (
          <Typography variant="body1" gutterBottom textAlign={"left"}>
            <AddressDisplay address={paymentForm.billingAddress} />
          </Typography>
        )}
        <Typography variant="h6" gutterBottom textAlign={"left"}>
          {t('checkout.paymentMethod.title')}
        </Typography>
        <Typography variant="body1" gutterBottom textAlign={"left"}>
          {t('checkout.paymentMethod.' + paymentForm.paymentMethod)}
        </Typography>
        {(paymentForm.paymentMethod == 'creditcard') && (
          <Typography variant="body1" gutterBottom textAlign={"left"}>
            {t('####-####-####-'+paymentForm.creditCard.cardNumber.substring(15,19))}
          </Typography>
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
          <Purchase price={getCart.cart.cartTotalAmount} tag={''}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<ArrowRightAltIcon />}
              size="large"
            >
              {t('checkout.paynow')}
            </Button>
          </Purchase>
        </Box>
      </form>
    </>
  );
};

export default connect(mapStateToProps)(Confirmation);