import React, { useEffect, useState } from 'react'
import { graphql } from "gatsby"
import MyFormik, { MyFormikStep } from '../components/MyFormik'

// const steps = [
//   'Step 1 ',
//   'Step 2 ',
//   'Step 3'
// ]

export default function SamplePage({ data }) {
  const [isStep, setIsStep] = useState(false)
  const { strapiFormWizards, form } = data

  useEffect(() => {
    setIsStep(strapiFormWizards.formString.length > 0)
  }, [strapiFormWizards])

  const newSchema = JSON.parse(strapiFormWizards.formString)

  if (isStep)
    return <MyFormikStep schema={newSchema} />
  const { fields } = JSON.parse(form.content_string)
  return <MyFormik formSchema={fields} />
}

export const query = graphql`
  query{
    strapiFormWizards(id: {eq: "Form-wizards_1"}) {
        id
        formString
      }
    form: strapiForm(id: {eq: "Form_2"}) {
      Title
      content_string
      id
    }
  }`