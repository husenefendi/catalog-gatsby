import React from 'react'
import Form from '@rjsf/material-ui'
import { ThemeProvider } from '@mui/material/styles';

import theme from './theme';

const MainForm = (schema) => {
    console.log({ schema });
    return <ThemeProvider theme={theme}><Form {...schema} /></ThemeProvider>
}
export default MainForm