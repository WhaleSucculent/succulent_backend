import { FormControlLabel, Radio } from '@mui/material';
import { Field } from 'formik';
import { RadioGroup } from 'formik-mui';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import { ShippingCompany as ShippingCompanyEnum } from './shipping-company.enum';

export interface ShippingCompanyProps {
  formName?: string;
}

export const ShippingCompany: FunctionComponent<ShippingCompanyProps> = ({
  formName = 'shippingCompany',
}) => {
  const { t } = useTranslation();

  return (
    <Field component={RadioGroup} name={formName}>
      <FormControlLabel
        value={ShippingCompanyEnum.ups}
        control={<Radio />}
        label={t('checkout.shippingCompany.ups')}
      />
      <FormControlLabel
        value={ShippingCompanyEnum.fedex}
        control={<Radio />}
        label={t('checkout.shippingCompany.fedex')}
      />
      <FormControlLabel
        value={ShippingCompanyEnum.canadapost}
        control={<Radio />}
        label={t('checkout.shippingCompany.canadapost')}
      />
    </Field>
  );
};