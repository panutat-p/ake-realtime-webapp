'use client'

import { createTheme } from '@mui/material/styles'
import { K2D } from 'next/font/google'

const k2d = K2D({
  weight: ['300', '400', '500', '700'],
  subsets: ['thai'],
})

const adminTheme = createTheme({
  palette: {},
  cssVariables: true,
  typography: {
    fontFamily: k2d.style.fontFamily,
    fontSize: 14,
  },
})

export default adminTheme
