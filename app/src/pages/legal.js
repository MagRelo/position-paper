import React from 'react';

// import background from 'images/01.png';

function LegalPage(props) {
  return (
    <React.Fragment>
      <section
        className="page-title o-hidden pos-r md-text-center"
        data-bg-color="#d2f9fe"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-12">
              <h1 className="title">
                <span>Terms</span> And Conditions
              </h1>
              <p>We're Build With Latest And Modern Code</p>
            </div>
            <div className="col-lg-5 col-md-12 text-lg-right md-mt-3">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Terms And Conditions
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h2 className="title mb-0">
                Terms and <span>Conditions</span>
              </h2>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-12 col-md-12">
              <h4>
                <span className="text-theme">1.</span> Description of Service
              </h4>
              <p className="mb-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Sapiente, distinctio iste praesentium totam quasi tempore,
                magnam ipsum cum animi at fuga alias harum quo quibusdam odit
                eum reprehenderit consectetur suscipit!
              </p>
              <h4 className="mt-5">
                <span className="text-theme">2.</span> Your Registration
                Obligations
              </h4>
              <p className="mb-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Distinctio nesciunt officia culpa nostrum maxime vero
                architecto, corporis placeat repudiandae minima facere animi,
                pariatur fugit dignissimos qui error est nulla. Doloribus.Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
                nesciunt officia culpa nostrum maxime vero architecto, corporis
                placeat repudiandae minima facere animi, pariatur fugit
                dignissimos qui error est nulla. Doloribus.
              </p>
              <h4 className="mt-5">
                <span className="text-theme">3.</span> User Account, Password,
                and Security
              </h4>
              <p className="mb-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Sapiente, distinctio iste praesentium totam quasi tempore,
                magnam ipsum cum animi.
              </p>
              <h4 className="mt-5">
                <span className="text-theme">4.</span> User Conduct
              </h4>
              <p className="mb-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Sapiente, distinctio iste praesentium totam quasi tempore,
                magnam ipsum cum animi. Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Laudantium vel recusandae ad impedit ipsum,
                vitae facere expedita! Voluptatem iure dolorem dignissimos nisi
                magni a dolore, et inventore optio, voluptas, obcaecati.
              </p>
              <ul className="list-unstyled list-icon mb-3">
                <li className="mb-3">
                  {' '}
                  <i className="la la-check"></i> Lorem ipsum dolor sit amet,
                  consectetur
                </li>
                <li className="mb-3">
                  {' '}
                  <i className="la la-check"></i> Quidem error quae illo
                  excepturi nostrum blanditiis laboriosam
                </li>
                <li className="mb-3">
                  {' '}
                  <i className="la la-check"></i> Molestias, eum nihil expedita
                  dolorum odio dolorem
                </li>
                <li className="mb-3">
                  {' '}
                  <i className="la la-check"></i> Eum nihil expedita dolorum
                  odio dolorem
                </li>
                <li>
                  {' '}
                  <i className="la la-check"></i> Explicabo rem illum magni
                  perferendis
                </li>
              </ul>
              <h4 className="mt-5">
                <span className="text-theme">5.</span> International Use
              </h4>
              <p className="mb-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Sapiente, distinctio iste praesentium totam quasi tempore,
                magnam ipsum cum animi. Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Laudantium vel recusandae ad impedit ipsum,
                vitae facere expedita! Voluptatem iure dolorem dignissimos nisi
                magni a dolore, et inventore optio, voluptas, obcaecati. Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
                incidunt aliquam sint, magnam excepturi quas a, id doloremque
                quasi iusto quo consequuntur dolorum neque optio ipsum, rerum
                nesciunt illo iure.
              </p>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default LegalPage;
