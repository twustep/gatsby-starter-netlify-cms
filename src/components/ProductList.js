import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import ProductHero from './ProductHero'

class ProductList extends React.Component {
  originalImageSize(size) {

    var allSizes = size.split(",");
    var biggestSize = allSizes[allSizes.length-1];
    
    var newTxt = biggestSize.split(' ');
    var finalSize = 0;
    for (var i = 1; i < newTxt.length; i++) {
      finalSize = newTxt[i].split('w')[0];
    }

    if(Number.isInteger(parseInt(finalSize))){
      return finalSize;
    }else{
      return 0;
    }
    
  }
  heroType(product,index){

    if(this.originalImageSize(product.frontmatter.hero.image.childImageSharp.fluid.srcSet) > 500){

      return (<section className={(index%2 === 0 )?'purple':'green'} key={product.id}>
        <div className="container cap-desktop">
          <div className="hero is-large product-hero">
            <div className="hero-body">
              <div className="row">
                <div className="column">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: product.frontmatter.hero.image,
                      alt: `${product.frontmatter.hero.imagealt}`,
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="column is-three-quarters">
                  <h1>{product.frontmatter.title}</h1>
                  <ul>
                  {
                    product.frontmatter.hero.bullets.map((bullet,index) => (
                      <li key={index}>
                        {bullet.text}
                      </li>
                    ))
                  }
                  </ul>
                  <a className="button is-large is-fullwidth" href={product.frontmatter.etsyurl + "?ref=landing_page&type=homepage"}>{product.frontmatter.buttontext}</a>
                  <a className="detail-link" href={product.fields.slug + "?ref=homepage"}>See more details</a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>)

    }

    return (<section className={(index%2 === 0 )?'purple':'green'} key={product.id}>
        <div className="container cap-desktop">
          <div className="hero is-large product-hero">
            <div className="hero-body">
              <div className="columns">
                <div className="column is-half">
                  <h1>{product.frontmatter.title}</h1>
                  <ul>
                  {
                    product.frontmatter.hero.bullets.map((bullet,index) => (
                      <li key={index}>
                        {bullet.text}
                      </li>
                    ))
                  }
                  </ul>
                  <a className="button is-large is-fullwidth" href={product.frontmatter.etsyurl + "?ref=landing_page&type=homepage"}>{product.frontmatter.buttontext}</a>
                  <a className="detail-link" href={product.fields.slug + "?ref=homepage"}>See more details</a>
                </div>
                <div className="column">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: product.frontmatter.hero.image,
                      alt: `${product.frontmatter.hero.imagealt}`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>)

   
  }
  render() {
    const { data } = this.props
    const { edges: products } = data.allMarkdownRemark
    

    var result = products && products.map(({ node: product }, index) => (

      <ProductHero product={product} background={(index%2 === 0 )?'purple':'green'} key={index} showDetail={true} referenceString = 'homepage'/>
    ))

    
      
    return (result)
  }
}

ProductList.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query ProductListQuery {
        allMarkdownRemark(
          sort: { order: ASC, fields: [frontmatter___title] }
          filter: { frontmatter: { templateKey: { eq: "product" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
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
                }
                
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <ProductList data={data} count={count} />}
  />
)
