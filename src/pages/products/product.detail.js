import * as React from "react"
import { graphql, Link } from "gatsby"
import { Typography, Chip } from "@mui/material"
import { StaticImage } from "gatsby-plugin-image"
// import Form from '@rjsf/material-ui'

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import MainForm from "../../components/DinamicForm"
import MyFormik from "../../components/MyFormik"

const curencyFormat = (val) => {
  return `US $${val.toLocaleString('en-US')}`
}

const ProductDetail = ({ data }) => {
  const { product, formData } = data
  console.log({ product, data });

  const schema = {
    "title": "My title",
    "description": "My description",
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
      },
      "age": {
        "type": "number"
      }
    }
  };
  const newSchema = JSON.parse(formData.content_string)

  return <Layout>
    <Seo title={`Product ${product.title}`} />
    <h1>Product : {product.title}</h1>
    <StaticImage
      src="../../images/gatsby-astronaut.png"
      width={300}
      quality={95}
      formats={["auto", "webp", "avif"]}
      alt="A Gatsby astronaut"
      style={{ marginBottom: `1.45rem` }}
    />
    <Typography variant="h4">Price : {curencyFormat(product.price)}</Typography>
    <Typography>Description: {product.description}</Typography>
    <Typography>Category:</Typography>
    <p>
      {product.categories.map((e, i) => {
        // return <Link to={`/categories/${e.slug}`} key={i}>{e.name}</Link>
        return <Chip key={i} component={Link} to={`/categories/${e.slug}`} clickable label={`${e.name}`} color="primary" />
      })}
    </p>
    {/* <Form schema={schema} /> */}
    <MainForm schema={schema} />
    <MyFormik formSchema={newSchema} />
  </Layout>
}

export default ProductDetail

export const query = graphql`
query($slug:String){
   product: strapiProducts(slug:{eq:$slug}) {
      description
      id
      price
      slug
      status
      strapiId
      title
      updated_at
      categories {
        name
        slug
      }
    }
    formData:strapiForm(id: {eq: "Form_1"}) {
      Title
      content_string
      id
    }
  }
  
`