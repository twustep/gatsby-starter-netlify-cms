import React from 'react'
import PreviewCompatibleImage from './PreviewCompatibleImage'

const ProductHero = class extends React.Component {
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
  heroType(product,bgclass, showDetailLink, referenceString){

    var detailLink = "";
    if(showDetailLink){
      detailLink = <a className="detail-link" href={product.fields.slug + "?ref=" + referenceString}>See more details</a>
    }
    if(this.originalImageSize(product.frontmatter.hero.image.childImageSharp.fluid.srcSet) > 500){

      return (<section className={bgclass} key={product.id}>
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
                  <a className="button is-large is-fullwidth" href={product.frontmatter.etsyurl + "?ref=landing_page&type=" + referenceString}>{product.frontmatter.buttontext}</a>
                  {detailLink}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>)

    }

    return (<section className={bgclass} key={product.id}>
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
                  <a className="button is-large is-fullwidth" href={product.frontmatter.etsyurl + "?ref=landing_page&type=" + referenceString}>{product.frontmatter.buttontext}</a>
                  {detailLink}
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

    var data = this.props;

    return (
      this.heroType(data.product,data.background, data.showDetail, data.referenceString)
    )
  }
}



export default ProductHero
