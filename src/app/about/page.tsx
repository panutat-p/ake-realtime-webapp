import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'
import CheckIcon from '@mui/icons-material/Check'
import Typography from '@mui/material/Typography'

export default function AboutPage() {
  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="subtitle1">/about</Typography>
        <Typography variant="h2">About Page</Typography>
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="info">
          Welcome
        </Alert>
      </Container>
    </>
  )
}
