import React, { useState, useEffect } from 'react';
import {
    Formik,
    Form as FormikForm,
    Field,
    ErrorMessage,
    useFormikContext,
    useField,
    useFormik
} from 'formik';
import * as Yup from 'yup'
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material'

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
    return (
        <FormControl variant="outlined" fullWidth>
            {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
            <Select {...rest} {...(label ? { label } : {})}>
                <MenuItem value=""><em>None</em></MenuItem>
                {options.map((opt, i) => <MenuItem value={opt.value} key={i}>{opt.label || opt.value}</MenuItem>)}
            </Select>
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
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

    useEffect(() => {
        initForm(formSchema);
    }, []);

    const initForm = (formSchema) => {
        let _formData = {};
        let _validationSchema = {};

        for (var key of Object.keys(formSchema)) {
            _formData[key] = "";

            if (formSchema[key].type === "text") {
                _validationSchema[key] = Yup.string();
            } else if (formSchema[key].type === "email") {
                _validationSchema[key] = Yup.string().email()
            } else if (formSchema[key].type === "select") {
                _validationSchema[key] = Yup.string().oneOf(formSchema[key].options.map(o => o.value));
            }

            if (formSchema[key].required) {
                _validationSchema[key] = _validationSchema[key].required('Required');
            }
        }

        setFormData(_formData);
        setValidationSchema(Yup.object().shape({ ..._validationSchema }));
    }

    const getFormElement = (elementName, elementSchema) => {
        const props = {
            name: elementName,
            label: elementSchema.label,
            options: elementSchema.options
        };

        if (elementSchema.type === "text" || elementSchema.type === "email") {
            return <MyTextField {...props} />
        }

        if (elementSchema.type === "select") {
            return <SelectField  {...props} />
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
                {getFormElement(key, formSchema[key])}
            </div>
        ))}
    </Form>

}

export default MyFormik