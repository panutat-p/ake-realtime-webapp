import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { user } from '@/db/schema'
import db from '@/app/lib/mysql_connection'
import { asc } from 'drizzle-orm'

export default async function UserPage() {
  const userCount = await db.$count(user)
  const users = await db.select().from(user).orderBy(asc(user.fullName))

  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h2">User Page</Typography>
        <Box mt={6}>
          <Typography variant="h5">Total: {userCount}</Typography>
        </Box>
        <Box mt={2} ml={3}>
          {userCount > 0 && users.map((u) => <Typography key={u.id}>{u.fullName}</Typography>)}
        </Box>
      </Container>
    </>
  )
}
