
import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import privacy from "docs/privacy.md"


function Privacy() {
  return (
    <div>
      <Container>
        <Box>
        <Typography variant="h3" gutterBottom marked="center" align="center">
        Privacy Policy 
        </Typography>
    
     <ReactMarkdown>{privacy}</ReactMarkdown>
   
     
        </Box>
      </Container>
     
    </div>
  )
}

export default Privacy
