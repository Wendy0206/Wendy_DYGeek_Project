import React from "react";

import "../../styles/footer.css";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();

  return (
  <div class="footer-dark mt-3">
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-sm-6 col-md-3 item">
            <h3>Services</h3>
            <ul>
              <li><a href="#">Comics</a></li>
              <li><a href="#">Events</a></li>
              <li><a href="#">Characters</a></li>
             

            </ul>
          </div>
          <div class="col-sm-6 col-md-3 item">
            <h3>About</h3>
            <ul>
              <li><a href="#" onClick={()=>navigate('/faq')}>Faq</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
          <div class="col-md-6 item text">
            <h3>Dygeek</h3>
            <p>Welcome to <strong>Dygeek</strong>, your ultimate destination for all things Marvel! Dive into a universe where superheroes and villains collide, where iconic characters like Spider-Man, Iron Man, and the Avengers come to life. Explore in-depth analyses of beloved comics, stay updated on the latest Marvel events and series, and discover exclusive insights into the Marvel Cinematic Universe  </p>
           
          </div>
          <div class="col item social"><a href="#"><i class="fa-brands fa-facebook"></i></a><a href="#"><i class="fa-brands fa-linkedin"></i></a><a href="#"><i class="fa-brands fa-github"></i></a></div>
        </div>
        <p class="copyright">Dygeek © 2024</p>
      </div>
    </footer>
  </div>
  )

};
