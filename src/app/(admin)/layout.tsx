import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import adminTheme from '@/app/(admin)/theme'
import Dashboard from './dashboard/components/dashboard/Dashboard'

export const metadata: Metadata = {
  title: process.env.APP_NAME,
  description: 'Dashboard layout',
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={adminTheme}>
            <Dashboard>{children}</Dashboard>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
