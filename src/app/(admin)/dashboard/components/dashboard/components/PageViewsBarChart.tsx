/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { BarChart } from '@mui/x-charts/BarChart'
import { useTheme } from '@mui/material/styles'
import useSWR from 'swr'
import { fetcher } from '@/app/services/http'
import type { SaleChart } from '@/app/api/types/chart'

export default function PageViewsBarChart() {
  const { data: payload } = useSWR('/api/dashboard/chart', fetcher, {
    revalidateOnFocus: false,
  })
  const data = payload?.data as SaleChart[]

  const theme = useTheme() as any
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
  ]

  const [x, setX] = useState<Array<string>>([])
  const [y, setY] = useState<Array<number>>([])

  useEffect(() => {
    if (data) {
      const categories = data?.map((e) => {
        return e.category
      })
      const sales = data?.map((e) => {
        return e.totalSales ? parseFloat(e.totalSales) : 0
      })

      setX(categories)
      setY(sales)
    }
  }, [data])

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h4" variant="h4" gutterBottom>
          Sales by film category
        </Typography>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={
            [
              {
                scaleType: 'band',
                categoryGapRatio: 0.5,
                data: x,
              },
            ] as any
          }
          series={[{ data: y }]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  )
}
