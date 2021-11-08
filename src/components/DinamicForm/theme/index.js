import { createTheme } from '@mui/material'

import palette from './palette'
import Button from './Button'
import MyTyphographi from './MyTypography'

const theme = createTheme({
    palette,
    components: {
        MuiButton: Button,
        MuiButtonBase: {
            defaultProps: {
                color: 'green'
            }
        }
    },
    typography: { ...MyTyphographi }
})

export default theme