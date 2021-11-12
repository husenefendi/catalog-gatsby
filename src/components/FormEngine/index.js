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
import { FormControl, InputLabel, Select, MenuItem, TextField, Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Button } from '@material-ui/core';

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
    console.log({ name, label, rest });
    return <><TextField
        style={{ marginTop: '20px' }}
        fullWidth
        id={name}
        {...(label ? { label } : {})}
        placeholder={placeholder || ""}
        {...rest}
        name={name}
        helperText={<ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />}
    />
        <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
    </>
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
        <FormControl component="fieldset" style={{ marginTop: "20px" }}>
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

const FormEngine = ({ formSchema }) => {
    const [formData, setFormData] = useState({});
    const [validationSchema, setValidationSchema] = useState({});
    const [isStep, setStep] = useState(false)

    // console.log({ formData, validationSchema })
    useEffect(() => {
        if (formSchema.length > 0) {
            setStep(true)
            initStepSchema(formSchema)
        } else {
            initForm(formSchema);
        }
    }, [formSchema]);

    const initStepSchema = (formSchema) => {
        let _formData = {}
        let _validationSchema = {}

        formSchema.map((schema, i) => {
            const { rawForm, rawValidationSchema } = initForm(schema.Content.fields, true)
            _formData = { ..._formData, ...rawForm }
            _validationSchema = { ..._validationSchema, ...rawValidationSchema }
        })

        console.log({ _formData, _validationSchema });
    }

    const initForm = (formSchema, cb = false) => {
        let _formData = {};
        let _validationSchema = {};

        formSchema.map((schema) => {
            for (var key of Object.keys(schema)) {
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
            }
        })
        if (cb)
            return { rawForm: _formData, rawValidationSchema: _validationSchema }

        setFormData(_formData);
        setValidationSchema(Yup.object().shape({ ..._validationSchema }));
    }

    const getFormElement = (elementName, elementSchema) => {
        const props = {
            name: elementSchema.id,
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
        console.log(values);
        setSubmitting(false);
    }
    // console.log({ formSchema });
    // return <Form
    //     enableReinitialize
    //     initialValues={formData}
    //     validationSchema={validationSchema}
    //     onSubmit={onSubmit}

    // >
    //     {Object.keys(formSchema).map((key, ind) => {
    //         return <div key={key}>
    //             {getFormElement(key, formSchema[key])}
    //         </div>
    //     })}
    //     <Button >
    //         Save
    //     </Button>
    // </Form>

    const handlingRenderStep = () => {

    }

    const handlingRenderForm = () => {

    }

    return <Form
        enableReinitialize
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={onSubmit}

    >
        <h3>ok</h3>
    </Form>

}

export default FormEngine