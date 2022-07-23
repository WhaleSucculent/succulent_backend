import { Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { CheckoutRoutePath } from '../../routes/checkout-route-path';

export const CheckoutStepper: FunctionComponent = () => {
  const { t } = useTranslation();
  const path = useLocation();
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    if (path.pathname=='/checkout' || path.pathname=='/checkout/delivery') {
      setActiveStep(0);
    } else if (path.pathname=='/checkout/payment') {
      setActiveStep(1);
    } else {
      setActiveStep(2);
    }
  }, [path]);

  return (
    <Stepper alternativeLabel activeStep={activeStep}>
      <Step key={CheckoutRoutePath.Delivery}>
        <StepLabel>{t('checkout.delivery')}</StepLabel>
      </Step>
      <Step key={CheckoutRoutePath.Payment}>
        <StepLabel>{t('checkout.payment')}</StepLabel>
      </Step>
      <Step key={CheckoutRoutePath.Confirmation}>
        <StepLabel>{t('checkout.confirmation')}</StepLabel>
      </Step>
    </Stepper>
  );
};