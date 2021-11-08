const path = require(`path`)

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const categoryTemplate = path.resolve(`src/pages/categories/category.slug.js`)
  const productDetailTemplate = path.resolve(`src/pages/products/product.detail.js`)

  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })

  const result = await graphql(`
  query{
    allStrapiCategories {
      edges {
        node {
          name,
          slug
        }
      }
    }
  }
`)

  result.data.allStrapiCategories.edges.forEach(edge => {
    createPage({
      path: `/categories/${edge.node.slug}`,
      component: categoryTemplate,
      context: {
        slug: edge.node.slug,
        title: edge.node.name,
      },
    })
  })

  const products = await graphql(`
  query{
    allStrapiProducts {
      edges {
        node {
          title
          slug
          id
        }
      }
    }
  }
  `)

  products.data.allStrapiProducts.edges.forEach(edge => {
    createPage({
      path: `/product/${edge.node.slug}`,
      component: productDetailTemplate,
      context: {
        slug: edge.node.slug,
        title: edge.node.name,
        id: edge.node.id
      },
    })
  })

}