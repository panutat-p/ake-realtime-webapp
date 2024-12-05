import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export default function DashboardPage() {
  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="subtitle1">/dashboard</Typography>
        <Typography variant="h2">Dashboard Page</Typography>
        <Box mt={6}>
          <Typography variant="h5">Hello</Typography>
        </Box>
      </Container>
    </>
  )
}
