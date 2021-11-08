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
  const { product } = data
  console.log({ product });

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

  const formSchema = {
    name: {
      type: "text",
      label: "Name",
      required: true
    },
    email: {
      type: "email",
      label: "Email",
      required: true
    },
    role: {
      type: "select",
      label: "Role",
      required: true,
      options: [
        {
          label: "Admin",
          value: "admin"
        },
        {
          label: "User",
          value: "user"
        }
      ]
    }
  }

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
    <MyFormik formSchema={formSchema} />
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
  }
  
`