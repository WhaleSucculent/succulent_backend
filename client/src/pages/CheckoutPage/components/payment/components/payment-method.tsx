import { FormControlLabel, Radio } from '@mui/material';
import { Field } from 'formik';
import { RadioGroup } from 'formik-mui';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { PaymentMethod as PaymentMethodEnum } from './payment-method.enum';

export interface PaymentMethodProps {
  formName?: string;
}

export const PaymentMethod: FunctionComponent<PaymentMethodProps> = ({
  formName = 'paymentMethod',
}) => {
  const { t } = useTranslation();

  return (
    <Field component={RadioGroup} name={formName}>
      <FormControlLabel
        value={PaymentMethodEnum.creditcard}
        control={<Radio />}
        label={t('checkout.paymentMethod.creditcard')}
      />
      <FormControlLabel
        value={PaymentMethodEnum.wechat}
        control={<Radio />}
        label={t('checkout.paymentMethod.wechat')}
      />
      <FormControlLabel
        value={PaymentMethodEnum.paypal}
        control={<Radio />}
        label={t('checkout.paymentMethod.paypal')}
      />
    </Field>
  );
};