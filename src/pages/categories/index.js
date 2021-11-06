import * as React from "react"
import { graphql, Link } from "gatsby"

import { StaticImage } from "gatsby-plugin-image"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const IndexPage = ({ data }) => {

  return <Layout>
    <Seo title="Category" />

    <StaticImage
      src="../../images/gatsby-astronaut.png"
      width={300}
      quality={95}
      formats={["auto", "webp", "avif"]}
      alt="A Gatsby astronaut"
      style={{ marginBottom: `1.45rem` }}
    />

    <p>
      {data.allStrapiCategories.edges.map((e, i) => {
        return <Link to={`/categories/${e.node.slug}`} style={{ display: 'block' }} key={i}>Go to "{e.node.name}"</Link>
      })}
    </p>
  </Layout>
}

export default IndexPage

export const query = graphql`
query AllCategories {
    allStrapiCategories {
      edges {
        node {
          name
          id
          slug
        }
      }
    }
  }  
`