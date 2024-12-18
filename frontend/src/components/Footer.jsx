import React, { PureComponent } from 'react';
import backgroundImage from '../assets/img/gallery/section_bg03.png';
import Logo from '../assets/img/logo/logo.png'; 
import '../assets/css/footer.css'

export class Footer extends PureComponent {
  render() {
    return (
      <div
        className="footer-area section-bg"
      >
        <div className="container">
          <div className="footer-top footer-padding">
            <div className="row d-flex justify-content-between">
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6">
                <div className="single-footer-caption mb-50">
                  <div className="footer-tittle">
                    <h4>COMPANY</h4>
                    <ul>
                      <li><a href="#">About Us</a></li>
                      <li><a href="#">Company</a></li>
                      <li><a href="#">Press & Blog</a></li>
                      <li><a href="#">Privacy Policy</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div className="single-footer-caption mb-50">
                  <div className="footer-tittle">
                    <h4>Open hour</h4>
                    <ul>
                      <li><a href="#">Monday 11am-7pm</a></li>
                      <li><a href="#">Tuesday-Friday 11am-8pm</a></li>
                      <li><a href="#">Saturday 10am-6pm</a></li>
                      <li><a href="#">Sunday 11am-6pm</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="single-footer-caption mb-50">
                  <div className="footer-tittle">
                    <h4>RESOURCES</h4>
                    <ul>
                      <li><a href="#">Home Insurance</a></li>
                      <li><a href="#">Travel Insurance</a></li>
                      <li><a href="#">Car Insurance</a></li>
                      <li><a href="#">Business Insurance</a></li>
                      <li><a href="#">Health Insurance</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6">
                <div className="single-footer-caption mb-50">
                  <div className="footer-logo">
                    {/* Replacing hardcoded logo with imported Logo */}
                    <a href="index.html">
                      <img className='img-fluid' src={Logo} alt="Logo" />
                      </a>
                  </div>
                  <div className="footer-tittle">
                    <div className="footer-pera">
                      <p className="info1">The trade war currently ensuing between the US and several nations around the globe, most fiercely with...</p>
                    </div>
                  </div>
                  <div className="footer-social">
                    <a href="https://www.facebook.com/sai4ull"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fas fa-globe"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
