import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
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
          {staffCount > 0 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {staffs.map((staff) => (
                    <TableRow key={staff.staffId}>
                      <TableCell>{staff.firstName}</TableCell>
                      <TableCell>{staff.lastName}</TableCell>
                      <TableCell>{staff.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Container>
    </>
  )
}
