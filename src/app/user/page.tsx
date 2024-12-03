import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { drizzle } from 'drizzle-orm/mysql2'
import { user } from '@/db/schema'

export default async function UserPage() {
  const db = drizzle(process.env.DATABASE_URL!)
  const users = await db.select().from(user)

  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h2">User Page</Typography>
        <Box mt={10} ml={5}>
          {users.map((u) => (
            <Typography key={u.id}>{u.fullName}</Typography>
          ))}
        </Box>
      </Container>
    </>
  )
}
