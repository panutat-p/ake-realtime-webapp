import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import db from '@/app/lib/mysql_connection'
import { asc } from 'drizzle-orm'
import { staff } from '@/db/schema'

export default async function UserPage() {
  const staffCount = await db.$count(staff)
  const staffs = await db.select().from(staff).orderBy(asc(staff.staffId))

  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="subtitle1">/user</Typography>
        <Typography variant="h2">Staff Page</Typography>
        <Box mt={6}>
          <Typography variant="h5">Total: {staffCount}</Typography>
        </Box>
        <Box mt={2} ml={3}>
          {staffCount > 0 &&
            staffs.map((staff) => (
              <Typography key={staff.staffId}>
                {staff.firstName} {staff.lastName}
              </Typography>
            ))}
        </Box>
      </Container>
    </>
  )
}
