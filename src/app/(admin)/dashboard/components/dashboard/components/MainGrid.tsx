/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Copyright from '../internals/components/Copyright'
import ChartUserByCountry from './ChartUserByCountry'
import CustomizedTreeView from './CustomizedTreeView'
import CustomizedDataGrid from './CustomizedDataGrid'
import HighlightedCard from './HighlightedCard'
import PageViewsBarChart from './PageViewsBarChart'
import SessionsChart from './SessionsChart'
import StatCard, { StatCardProps } from './StatCard'
import { fetcher } from '@/app/services/http'
import io from 'socket.io-client'

export default function MainGrid() {
  const socketClient = io('http://localhost:4001')

  const { data, isLoading } = useSWR('/api/dashboard', fetcher, { revalidateOnFocus: false })
  const [statsArray, setStatsArray] = useState<StatCardProps[]>([])

  useEffect(() => {
    socketClient.on('update_dashboard', () => {
      console.info('socket event: update_dashboard')
    })

    return () => {
      socketClient.off('update_dashboard')
    }
  }, [])

  useEffect(() => {
    if (data) {
      setStatsArray([
        {
          title: 'Total Customers',
          value: data?.data.countCustomer.toString() || 'Loading...',
          interval: 'xxx',
          trend: 'up',
          data: [data?.data.countCustomer],
        },
        {
          title: 'Total Staff',
          value: data?.data.countStaff.toString() || 'Loading...',
          interval: 'xxx',
          trend: 'up',
          data: [data?.data.countStaff],
        },
        {
          title: 'Total Films',
          value: data?.data.countFilm.toString() || 'Loading...',
          interval: 'xxx',
          trend: 'up',
          data: [data?.data.countFilm],
        },
      ])
    }
  }, [data])

  if (isLoading) {
    return (
      <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
        {data &&
          statsArray.map((card, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
              <StatCard {...card} />
            </Grid>
          ))}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  )
}
