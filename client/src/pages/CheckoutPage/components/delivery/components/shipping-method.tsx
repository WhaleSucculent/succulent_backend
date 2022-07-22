import { FormControlLabel, Radio } from '@mui/material';
import { Field } from 'formik';
import { RadioGroup } from 'formik-mui';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import { ShippingMethod as ShippingMethodEnum } from './shipping-method.enum';

export interface ShippingMethodProps {
  formName?: string;
}

export const ShippingMethod: FunctionComponent<ShippingMethodProps> = ({
  formName = 'shippingMethod',
}) => {
  const { t } = useTranslation();

  return (
    <Field component={RadioGroup} name={formName}>
      <FormControlLabel
        value={ShippingMethodEnum.standard}
        control={<Radio />}
        label={t('checkout.shippingMethod.standard')}
      />
      <FormControlLabel
        value={ShippingMethodEnum.expedited}
        control={<Radio />}
        label={t('checkout.shippingMethod.expedited')}
      />
    </Field>
  );
};