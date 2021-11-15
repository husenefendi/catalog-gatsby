import React, { useState, useEffect } from 'react';
import {
    Formik,
    Form as FormikForm,
    // Field,
    ErrorMessage,
    useFormikContext,
    // useField,
    // useFormik
} from 'formik';
import * as Yup from 'yup'
import { Typography, FormControl, InputLabel, Select, MenuItem, TextField, Radio, RadioGroup, FormControlLabel, FormLabel, Box, Step, Stepper, StepLabel, Button, Fade } from '@mui/material'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

export const Form = (props) => {
    return (
        <Formik
            {...props}
        >
            <FormikForm className="needs-validation" novalidate="">
                {props.children}
            </FormikForm>
        </Formik>)
}

export const MyTextField = (props) => {
    const { name, label, placeholder, ...rest } = props
    return <TextField
        style={{ marginTop: '20px' }}
        fullWidth
        id={name}
        {...(label ? { label } : {})}
        placeholder={placeholder || ""}
        {...rest}
        name={name}
        helperText={<ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />}
    />
}

export const SelectField = (props) => {
    const { name, label, options, ...rest } = props
    const [data, setData] = useState()

    return (
        <FormControl variant="outlined" fullWidth style={{ marginTop: "20px" }}>
            {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
            <Select {...rest} {...(label ? { label } : {})} onChange={(e) => setData(e.target.value)} value={data}>
                {/* <MenuItem value=""><em>None</em></MenuItem> */}
                {options.map((opt, i) => <MenuItem value={opt.value} key={i}>{opt.label || opt.value}</MenuItem>)}
            </Select>
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
        </FormControl>
    )
}

export const DatePicker = (props) => {
    const { name, label, options, ...rest } = props
    const [value, setValue] = React.useState(new Date('2021-11-12T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} {...rest}>
            <div style={{ marginTop: "20px" }}>
                <DesktopDatePicker
                    label={label}
                    inputFormat="MM/dd/yyyy"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </div>
        </LocalizationProvider>
    )
}

export const RadioButton = (props) => {
    const { name, label, options, ...rest } = props
    return (
        <FormControl component="fieldset" style={{ marginTop: "20px" }} {...rest}>
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
        </FormControl>
    )
}

export const SubmitButton = (props) => {
    const { title, ...rest } = props;
    const { isSubmitting } = useFormikContext();

    return (
        <button type="submit" {...rest} disabled={isSubmitting}>{title}</button>
    )
}

const MyFormik = ({ formSchema }) => {
    const [formData, setFormData] = useState({});
    const [validationSchema, setValidationSchema] = useState({});

    // console.log({formData, validationSchema})
    useEffect(() => {
        initForm(formSchema);
    }, [formSchema]);

    const initForm = (formSchema) => {
        let _formData = {};
        let _validationSchema = {};

        formSchema.map((schema) => {
            _formData[schema.id] = "";
            if (schema.type === "Text") {
                _validationSchema[schema.id] = Yup.string();
            } else if (schema.type === "Date") {
                _validationSchema[schema.id] = Yup.string().email()
            } else if (schema.type === "Select") {
                _validationSchema[schema.id] = Yup.string().oneOf(schema.options.map(o => o.value));
            }
            if (schema.required) {
                _validationSchema[schema.id] = _validationSchema[schema.id].required('Required');
            }
            return null
        })

        setFormData(_formData);
        setValidationSchema(Yup.object().shape({ ..._validationSchema }));
    }

    const getFormElement = (elementName, elementSchema) => {
        const props = {
            name: elementSchema.name,
            label: elementSchema.name,
            options: elementSchema.options
        };

        if (elementSchema.type === "Text" || elementSchema.type === " ") {
            return <MyTextField {...props} />
        }

        if (elementSchema.type === "Select") {
            return <SelectField  {...props} />
        }

        if (elementSchema.type === "Date") {
            return <DatePicker  {...props} />
        }
        if (elementSchema.type === "Radio") {
            return <RadioButton  {...props} />
        }

    }

    const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
        console.log({ onsubmit: values });
        setSubmitting(false);
    }

    console.log({ formData, validationSchema });
    return <Form
        enableReinitialize
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
    >
        {Object.keys(formSchema).map((key, ind) => (
            <div key={key}>
                {getFormElement(key, formSchema[key])}
            </div>
        ))}
    </Form>

}

export default MyFormik


export const MyFormikStep = ({ schema }) => {
    console.log({ schema });
    const [activeStep, setActiveStep] = useState(0)

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
            {schema.map((e, index) => {
                // const { Content: { description, fields, name } } = e
                return <Step key={e.id}
                    sx={{
                        color: '#fff',
                        p: 0,
                        mx: '1px',
                        '& .MuiSvgIcon-root': {
                            border: '2px solid #fff',
                            borderRadius: '50%',
                            fontSize: '30px'
                        },
                        '& .MuiSvgIcon-root.Mui-active': {
                            color: '#3271D2'
                        },
                        '& .MuiSvgIcon-root.Mui-completed': {
                            color: '#3271D2'
                        },
                        '& .MuiStepLabel-iconContainer': {
                            p: 0,
                            mr: '8px',
                            backgroundColor: '#fff',
                            borderRadius: '50%'
                        }
                    }}
                >
                    <StepLabel
                        sx={{
                            backgroundColor: activeStep >= index ? '#3271D2' : '#B9BFCA',
                            p: 3,
                            px: 25,
                            '& .MuiStepLabel-label': {
                                color: '#fff'
                            },
                            '& .MuiStepLabel-label.Mui-active': {
                                color: '#fff'
                            },
                            '& .MuiStepLabel-label.Mui-completed': {
                                color: '#fff'
                            }
                        }}
                    >{e.Title}</StepLabel>
                </Step>
            })}
        </Stepper>
        <Box sx={{ display: 'flex', pt: 2 }}>
            {schema.map((e, i) => {
                const { Content: { description, fields, name } } = e
                return (i === activeStep && <Fade in={i === activeStep} key={i}>
                    <Box sx={{ border: '1px red solid', width: '100%' }}>
                        <Typography variant="subtitle1">Step: {name}</Typography>
                        {description && <Typography variant="caption">{description}</Typography>}
                        <MyFormik formSchema={fields} />
                    </Box>
                </Fade>)
            })}
            {activeStep === schema.length && <Box sx={{ border: '1px red solid', width: '100%' }}>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Reset</Button>
                </Box>
            </Box>
            }
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
            >
                Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext}>
                {activeStep === schema.length - 1 ? 'Finish' : 'Next'}
            </Button>
        </Box>
    </Box>
}
