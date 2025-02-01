import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { keyframes } from '@mui/system';

// Keyframes for background animation
const fade = keyframes`
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
`;

export default function ComingSoonPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: `${fade} 5s infinite ease-in-out`,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: 'center',
            p: 4,
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: 3,
          }}
        >
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
            Coming Soon
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            We&apos;re working hard to bring you something amazing. Stay tuned!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
