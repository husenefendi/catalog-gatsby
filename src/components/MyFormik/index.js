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
            <Select {...rest} {...(label ? { label } : {})} onChange={(e)=> setData(e.target.value)} value={data}>
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
    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
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

        {formSchema.map((schema) => {
            {console.log("schema", schema)}
            for (var key of Object.keys(schema)) {
                _formData[key] = "";
    
                if (schema[key].type === "Text") {
                    _validationSchema[key] = Yup.string();
                } else if (schema[key].type === "Date") {
                    _validationSchema[key] = Yup.string().email()
                } else if (schema[key].type === "Select") {
                    _validationSchema[key] = Yup.string().oneOf(schema[key].options.map(o => o.value));
                }
    
                if (schema[key].required) {
                    _validationSchema[key] = _validationSchema[key].required('Required');
                }
            }
        })}
        

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
        console.log(values);
        setSubmitting(false);
    }

    return <Form
        enableReinitialize
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
    >
        {Object.keys(formSchema).map((key, ind) => (
            <div key={key}>
                {/* {console.log("key",formSchema[key])} */}
                {getFormElement(key, formSchema[key])}
            </div>
        ))}
    </Form>

}

export default MyFormik