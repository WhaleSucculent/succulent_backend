import React, { Suspense } from "react";
import { Container, CircularProgress, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import StepRoutes from "./routes/CheckoutRoutes";
import { Provider } from "react-redux";
import { rootStore } from "../../store/root.store";
import { changeLanguage, initI18n } from '../../services/i18n';

const theme = createTheme();
const defaultLanguage = 'en-GB';
initI18n(process.env.PUBLIC_URL + '/i18n/{{lng}}.json', defaultLanguage);
changeLanguage(defaultLanguage);

export default function Checkout() {
  return (
    <ThemeProvider theme={theme}>
      <Typography component="h1" variant="h1" align="center">
        &nbsp;
      </Typography>
      {/* <Container maxWidth="lg"> */}
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Suspense fallback={<CircularProgress />}>
          <Provider store={rootStore}>
            <StepRoutes />
          </Provider>
        </Suspense>
      </Container>
    </ThemeProvider>
  );
}
