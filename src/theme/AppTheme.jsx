
import { CssBaseline, ThemeProvider } from '@mui/material'
import { purpleTheme } from './purple'


export const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme ={ purpleTheme }>
      <CssBaseline />
      { children }
    </ThemeProvider>
  )
}
