import Alert from '@mui/material/Alert'
import CheckIcon from '@mui/icons-material/Check'

export default function About() {
  return (
    <>
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="info">
        Welcome
      </Alert>
      <p>About Page</p>
    </>
  )
}
