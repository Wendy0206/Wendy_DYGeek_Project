import React, { useContext, useState, useEffect } from "react";
import "../../styles/faq.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../layout";

export const Faq = () => {
    const navigate = useNavigate();

    const { currentUser } = useContext(AppContext);





    return (

        <>

            <section class="faq-section">

                <div class="row">

                    <div class="col-md-6 offset-md-3">

                        <div class="faq-title text-center pb-2 pt-3">
                            <h2>FAQ</h2>
                        </div>
                    </div>
                    <div class="col-md-6 offset-md-3">
                        <div class="faq mb-5" id="accordion">

                            <div class="card">
                                <div class="card-header" id="faqHeading-1">
                                    <div class="mb-0">
                                        <h5 class="faq-title" data-bs-toggle="collapse" data-bs-target="#faqCollapse-1" data-aria-expanded="true" data-aria-controls="faqCollapse-1">
                                            <span class="badge">1</span>What is Dygeek?
                                        </h5>
                                    </div>
                                </div>
                                <div id="faqCollapse-1" class="collapse" aria-labelledby="faqHeading-1" data-parent="#accordion">
                                    <div class="card-body">
                                        <p class="card-body">Welcome to <strong>Dygeek</strong>, your ultimate destination for all things Marvel! Dive into a universe where superheroes and villains collide, where iconic characters like Spider-Man, Iron Man, and the Avengers come to life. Explore in-depth analyses of beloved comics, stay updated on the latest Marvel events and series, and discover exclusive insights into the Marvel Cinematic Universe  </p>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header" id="faqHeading-2">
                                    <div class="mb-0">
                                        <h5 class="faq-title" data-bs-toggle="collapse" data-bs-target="#faqCollapse-2" data-aria-expanded="false" data-aria-controls="faqCollapse-2">
                                            <span class="badge">2</span> How do I sign in?
                                        </h5>
                                    </div>
                                </div>
                                <div id="faqCollapse-2" class="collapse" aria-labelledby="faqHeading-2" data-parent="#accordion">
                                    <div class="card-body ">
                                        <p class="card-body">The process of joining <strong> Dygeek</strong> couldn't be easier.  Just <a role="button" onClick={() => navigate('/login')}><strong>Apply here</strong></a></p>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header" id="faqHeading-3">
                                    <div class="mb-0">
                                        <h5 class="faq-title" data-bs-toggle="collapse" data-bs-target="#faqCollapse-3" data-aria-expanded="false" data-aria-controls="faqCollapse-3">
                                            <span class="badge">3</span>How often do you update?
                                        </h5>
                                    </div>
                                </div>
                                <div id="faqCollapse-3" class="collapse" aria-labelledby="faqHeading-3" data-parent="#accordion">
                                    <div class="card-body">
                                        <p class="card-body"> Your payment on Spotless is available within 72 hours after a cleaning session was completed, from the moment you apply, you'll have the opportinuty to set up your preferred method of getting paid. </p>
                                    </div>
                                </div>
                            </div>

                            <div class="card">
                                <div class="card-header" id="faqHeading-4">
                                    <div class="mb-0">
                                        <h5 class="faq-title" data-bs-toggle="collapse" data-bs-target="#faqCollapse-4" data-aria-expanded="false" data-aria-controls="faqCollapse-3">
                                            <span class="badge">4</span>What are the requirements?
                                        </h5>
                                    </div>
                                </div>
                                <div id="faqCollapse-4" class="collapse" aria-labelledby="faqHeading-4" data-parent="#accordion">
                                    <div class="card-body">
                                        <p class="card-body">It is a long content of layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here.</p>
                                    </div>
                                </div>
                            </div>



                            <div class="card">
                                <div class="card-header" id="faqHeading-5">
                                    <div class="mb-0">
                                        <h5 class="faq-title" data-bs-toggle="collapse" data-bs-target="#faqCollapse-5" data-aria-expanded="false" data-aria-controls="faqCollapse-3">
                                            <span class="badge">5</span>Terms and Policies
                                        </h5>
                                    </div>
                                </div>
                                <div id="faqCollapse-5" class="collapse" aria-labelledby="faqHeading-5" data-parent="#accordion">
                                    <div class="card-body">
                                        <p class="card-body">It is a long. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here.</p>
                                    </div>
                                </div>
                            </div>

                      

                        </div>
                    </div>
                    <div class="col-md-6 offset-md-3 text-center">
                        {currentUser.id ? <span className="button-24"
                            onClick={() => navigate("/")}
                        >Go Home</span>
                            :
                            <span className="button-24"
                                onClick={() => navigate("/login")}
                            >Go to Login</span>
                        }
                    </div>
                </div>

            </section>
        </>


    );
};