module.exports = {
  siteMetadata: {
    title: 'Maker UI',
    description: 'The official doc site for Maker UI',
    siteUrl: 'https://maker-ui.com',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout.js`),
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
      },
    },
  ],
}

// Yarn version 1.17.3
