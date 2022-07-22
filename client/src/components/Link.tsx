//Custom Link component, combined MUI Link and React Router Link component together

import React from 'react'
import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";
import { Link as RouterLink, LinkProps as RouterLinkProps} from "react-router-dom";

export type LinkProps = MuiLinkProps & Pick<RouterLinkProps, "to" | "replace">;

const Link = (props: LinkProps) => {
  return <MuiLink {...props} component={RouterLink} />;
};

export default Link