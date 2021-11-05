import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

import { StaticImage } from "gatsby-plugin-image"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const Category = (props) => {
  const { params } = props
  const slug = params?.slug || ''

  // const data = useStaticQuery(graphql(`query ($slug:String!){
  //       strapiCategories(slug: {eq: $slug}) {
  //         name
  //         id
  //         slug
  //         strapiId
  //         products {
  //           price
  //           slug
  //           status
  //           title
  //           description
  //         }
  //       }
  //     }
  //     `, { slug: slug }))
  console.log({ props });
  return <Layout>
    <Seo title="Category" />
    <h1>This Category {slug} </h1>
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

export default Category
