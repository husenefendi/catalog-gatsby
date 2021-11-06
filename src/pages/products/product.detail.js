import * as React from "react"
import { graphql, Link } from "gatsby"
import { Card, CardContent, Grid, Typography } from "@mui/material"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const ProductDetail = ({ data }) => {
    const { product } = data

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
    }
  }
  
`