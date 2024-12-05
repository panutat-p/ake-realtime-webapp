/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Cloud from '@mui/icons-material/Cloud'
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs'
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'
import { usePathname } from 'next/navigation'
import io from 'socket.io-client'

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }: any) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}))

export default function NavbarBreadcrumbs() {
  const socketClient = io('http://localhost:4001')
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (socketClient.connected) {
      console.info('🟢 socket client already connected')
      setIsConnected(true)
    }

    socketClient.on('connect', () => {
      console.warn('🟡 socket client connected')
      setIsConnected(true)
    })

    socketClient.on('disconnect', () => {
      console.warn('🔴 socket client disconnected')
      setIsConnected(false)
    })

    return () => {
      socketClient.off('connect', () => {
        setIsConnected(true)
      })
      socketClient.off('disconnect', () => {
        setIsConnected(false)
      })
      socketClient.disconnect()
    }
  }, [])

  const pathname = usePathname()
  return (
    <StyledBreadcrumbs aria-label="breadcrumb" separator={<NavigateNextRoundedIcon fontSize="small" />}>
      {isConnected ? <Cloud color="success" fontSize="large" /> : <Cloud color="error" fontSize="large" />}
      <Typography variant="h5">ยินดีต้อนรับ</Typography>
      <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
        {pathname}
      </Typography>
    </StyledBreadcrumbs>
  )
}
