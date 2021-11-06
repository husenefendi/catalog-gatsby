import * as React from "react"
import { graphql, Link } from "gatsby"
import { Card, CardContent, Grid, Typography } from "@mui/material"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../../components/layout"
import Seo from "../../components/seo"


const CategorySlug = (props) => {

  const { data: { category } } = props

  console.log({ category });
  return <Layout>
    <Seo title="CategorySlug" />
    <h1>This Category Name : {category.name} </h1>
    <StaticImage
      src="../../images/gatsby-astronaut.png"
      width={300}
      quality={95}
      formats={["auto", "webp", "avif"]}
      alt="A Gatsby astronaut"
      style={{ marginBottom: `1.45rem` }}
    />
    <Grid container>
      <Grid item md={12}>
        <Typography>Category</Typography>
      </Grid>
      <Grid item container spacing={2}>
        {category.products.map((e, i) => {
          return <Grid item md={4} key={i}>
            <Card sx={{ border: '1px blue solid' }}>
              <CardContent >
                <Typography gutterBottom variant="h5" component={Link} to={`/product/${e.slug}`}>{e.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {e.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        })}
      </Grid>
    </Grid>
  </Layout>
}

export default CategorySlug

export const query = graphql`
query ($slug: String!){
 category: strapiCategories(slug: {eq: $slug}) {
    name
    id
    slug
    strapiId
    products {
      price
      slug
      status
      title
      description
    }
  }
}`