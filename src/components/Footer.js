import React from 'react'


const Footer = class extends React.Component {
  render() {
    return (
      <footer className="py-6">
        <div className="container cap-desktop">
          <div className="product-media has-text-centered">
            <div className="row">
              <div className="columns">
                <div className="column"> <span>This is not an official Lego® product. Lego® is a trademark of the Lego® Group, which does not sponsor, authorize or endorse this product.</span></div>
              </div>
            </div>
            <div className="row pt-6">
              <div className="columns">
                <div className="column"><img src="/img/logo.svg" alt="Marco & Bella Logo" /></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
