import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import ProductHero from '../components/ProductHero'

export const ProductTemplate = ({
  title,
  hero,
  buttontext,
  etsyurl,
  media,
  details,
  product
}) => {
  
  return (
    <div>
      <ProductHero product={product} background='purple' showDetail={false} referenceString = 'hero'/>
      <section>
        <div className="container cap-desktop">
          <div className="product-media has-text-centered">
            <h2 className="my-5">More Details</h2>
            {media.map((item,index) => (
                    <div key={index}>
                      <PreviewCompatibleImage
                          imageInfo={{
                            image: item.image,
                            alt: `${item.imagealt}`,
                          }}
                        />
                    </div>
                  ))}
          </div>
        </div>
      </section>
      <section>
        <div className="container cap-desktop">
          <div className="hero is-large product-details">
            <div className="hero-body">
              <div className="columns">
                <div className="column">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: details.image,
                      alt: `${details.imagealt}`,
                    }}
                  />
                </div>
                <div className="column is-half">
                  <ul>
                    {
                      details.bullets.map((detail, index) => (
                        <li key={index}>
                          {detail.text}
                        </li>
                      ))
                    }
                  </ul><a className="button is-large is-fullwidth" href={etsyurl + "?ref=landing_page&type=details"}>{buttontext}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
       
  )
}

ProductTemplate.propTypes = {
  title: PropTypes.string,
  hero: PropTypes.object,
  buttontext: PropTypes.string,
  etsyurl: PropTypes.string,
  media: PropTypes.array,
  details: PropTypes.object,
  product: PropTypes.object
}

const Product = ({ data }) => {
  const { markdownRemark: product } = data

  return (
    <Layout>
      <ProductTemplate
        title={product.frontmatter.title}
        hero={product.frontmatter.hero}
        buttontext={product.frontmatter.buttontext}
        etsyurl={product.frontmatter.etsyurl}
        media={product.frontmatter.media}
        details={product.frontmatter.details}
        product={product}
      />
    </Layout>
  )
}

Product.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Product

export const pageQuery = graphql`
  query ProductByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      fields {
        slug
      },
      frontmatter {
        title,
        buttontext,
        etsyurl,
        hero {
          image {
            childImageSharp {
              fluid( quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          },
          imagealt,
          bullets {
            text
          }
        },
        media {
          image {
            childImageSharp {
              fluid( quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        },
        details {
          image {
            childImageSharp {
              fluid( quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          },
          imagealt,
          bullets {
            text
          }
        },
      }
    }
  }
`
