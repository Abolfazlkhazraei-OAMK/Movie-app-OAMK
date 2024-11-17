import React from 'react';
import './footer.css';
import FooterNavItem from '../components/FooterNavItem';

function Footer() {
    const usefulLinks = [
        'Home',
        'About Us',
        'Services',
        'Terms of service',
        'Privacy policy',
    ];
    const locations = ['Helsinki', 'Espoo', 'Vantaa', 'Tampere', 'Oulu'];


  return (
    <footer id='footer' className='footer'>
        <div className="footer-top">
            <div className="container">
                <div className="row gy-4">
                    <div className="col-lg-5 col-md-12 footer-info">
                        <a href="/" className='logo d-flex align-items-center'>
                        <span>CINEMA</span>
                        </a>
                        <p>
                            craste efficitur, ex sit amet elementum elementum, 
                            erat ex elementum ex, vitae vehicula purus augue non enim. 
                            Nunc nec nisl ac nisi scelerisque tincidunt et sit amet nulla. 
                        </p>
                        <div className="social-links mt-3">
                            <a href="#" className='twitter'>
                                <ion-icon name="logo-twitter"></ion-icon>
                            </a>
                            <a href="#" className='facebook'>
                                <ion-icon name="logo-facebook"></ion-icon>
                            </a>
                            <a href="#" className='instagram'>
                                <ion-icon name="logo-instagram"></ion-icon>
                            </a>
                            <a href="#" className='youtube'>
                                <ion-icon name="logo-youtube"></ion-icon>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-2 col-6 footer-links">
                        <h4>Useful Links</h4>
                        <ul>
                            {
                                usefulLinks.map(link => (
                                    <FooterNavItem key={link} name={link} />
                                ))
                            }
                        </ul>
                    </div>
                    <div className="col-lg-2 col-6 footer-links">
                        <h4>Our Cinemas</h4>
                        <ul>
                            {
                                locations.map(link => (
                                    <FooterNavItem key={link} name={link} />
                                ))
                            }
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                        <h4>Contact Us</h4>
                        <p>
                            Address <br />
                            City <br />
                            Country <br />
                            <strong>Phone:</strong> +358 123 456 789
                            <br />
                            <strong>Email:</strong> info@example.com
                            <br />
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="copyright">
                &copy; 2021 <strong><span>CINEMA</span></strong>. All Rights Reserved
            </div>
            <div className="credits">
                Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
        </div>
    </footer>
  )
}

export default Footer