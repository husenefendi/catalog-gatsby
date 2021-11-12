import React from 'react'
import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { graphql } from "gatsby"
import FormEngine from '../components/FormEngine'
// const steps = [
//   'Step 1 ',
//   'Step 2 ',
//   'Step 3'
// ]

export default function SamplePage({ data }) {
  const { strapiFormWizards } = data
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNextClick = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBackClick = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleResetClick = () => {
    setActiveStep(0)
  }
  const newSchema = JSON.parse(strapiFormWizards.formString)
  const steps = newSchema


  return <Container>
    <FormEngine formSchema={newSchema} />
  </Container>
  // return (
  //   <Box sx={{ px: '139px', pb: 5 }}>
  //     <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 5 }}>
  //       <Stepper
  //         sx={{
  //           px: 0
  //         }}
  //         activeStep={activeStep}
  //       >
  //         {steps.map((label, index) => {
  //           const stepProps = {}
  //           const labelProps = {}
  //           return (
  //             <Step
  //               sx={{
  //                 color: '#fff',
  //                 p: 0,
  //                 mx: '1px',
  //                 '& .MuiSvgIcon-root': {
  //                   border: '2px solid #fff',
  //                   borderRadius: '50%',
  //                   fontSize: '30px'
  //                 },
  //                 '& .MuiSvgIcon-root.Mui-active': {
  //                   color: '#3271D2'
  //                 },
  //                 '& .MuiSvgIcon-root.Mui-completed': {
  //                   color: '#3271D2'
  //                 },
  //                 '& .MuiStepLabel-iconContainer': {
  //                   p: 0,
  //                   mr: '8px',
  //                   backgroundColor: '#fff',
  //                   borderRadius: '50%'
  //                 }
  //               }}
  //               key={label?.Title}
  //               {...stepProps}
  //             >
  //               <StepLabel
  //                 active
  //                 sx={{
  //                   backgroundColor: activeStep >= index ? '#3271D2' : '#B9BFCA',
  //                   p: 3,
  //                   px: 25,
  //                   '& .MuiStepLabel-label': {
  //                     color: '#fff'
  //                   },
  //                   '& .MuiStepLabel-label.Mui-active': {
  //                     color: '#fff'
  //                   },
  //                   '& .MuiStepLabel-label.Mui-completed': {
  //                     color: '#fff'
  //                   }
  //                 }}
  //                 {...labelProps}
  //               >
  //                 {label.Title}
  //               </StepLabel>
  //             </Step>
  //           )
  //         })}
  //       </Stepper>
  //     </Box>
  //     <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
  //       {activeStep === steps.length ? (
  //         <>
  //           <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
  //           <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
  //             <Box sx={{ flex: '1 1 auto' }} />
  //             <Button onClick={handleResetClick}>Reset</Button>
  //           </Box>
  //         </>
  //       ) : (
  //         <Box sx={{ width: '50%', justifyContent: 'center' }}>
  //           <MyFormik formSchema={newSchema[activeStep]?.Content.fields} />


  //           <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, px: 5 }}>
  //             {activeStep > 0 && (
  //               <Button
  //                 style={{ fontSize: '16px', fontWeight: 700, width: '240px' }}
  //                 color="inherit"
  //                 variant="contained"
  //                 disabled={activeStep === 0}
  //                 onClick={handleBackClick}
  //                 sx={{ mr: 1 }}
  //               >
  //                 Back
  //               </Button>
  //             )}
  //             <Box sx={{ flex: '1 1 auto' }} />

  //             <Button
  //               variant="contained"
  //               style={{ backgroundColor: '#3271D2', fontSize: '16px', fontWeight: 700, width: '240px' }}
  //               onClick={handleNextClick}
  //             >
  //               {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
  //             </Button>
  //           </Box>
  //         </Box>
  //       )}
  //     </Box>
  //   </Box>
  // )
}

export const query = graphql`
  query{
    strapiFormWizards(id: {eq: "Form-wizards_1"}) {
        id
        formString
      }
  }`