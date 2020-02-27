import React from 'react';

import JobForm from 'pages/jobs/jobForm';

function AddJobPage() {
  return (
    <div className="page-container">
      <div className="container">
        <div
          style={{
            maxWidth: '52em',
            margin: '0 auto'
          }}
        >
          <h1>Post a Job</h1>
          <p>
            Talent Relay is the fastest way to connect with the best available
            candidates.
          </p>
        </div>

        <JobForm isEditing={false} />
      </div>
    </div>
  );
}

export default AddJobPage;

// async function getLink(linkId, clearSession) {
//   return await fetch('/api/link/' + linkId).then(response => {
//     if (response.status === 200) {
//       return response.json();
//     }

//     // some type of error has occured...
//     console.log(response.status, response.message);

//     if (response.status === 404) {
//       console.log('notfound');
//       navigate('/notfound');
//     }

//     // clearSession if 401
//     if (response.status === 401) {
//       console.log('logging out...');
//       clearSession();
//     }

//     return {};
//   });
// }
