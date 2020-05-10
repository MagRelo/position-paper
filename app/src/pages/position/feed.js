import React from 'react';
import Teaser from 'pages/position/positionTeaser';

function FeedPage({ items }) {
  // const { callApi } = useContext(AuthContext);

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  // const [propsList, setPropsList] = useState([]);

  // useEffect(() => {
  //   setLoading(true);

  //   const method = 'GET';
  //   let endPoint = '/api/props';

  //   // limit by user
  //   if (userId) {
  //     endPoint = endPoint + '?user=' + userId;
  //   }

  //   callApi(method, endPoint)
  //     .then((body) => {
  //       setPropsList(body.props);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setError(error.toString());
  //       setLoading(false);
  //     });
  // }, [userId, callApi]);

  return (
    <div>
      {items && !items.length ? <p>No Props</p> : null}
      {items &&
        items.map((prop) => {
          return (
            <React.Fragment key={prop._id}>
              <Teaser position={prop} />
              <div className="mb-4"></div>
            </React.Fragment>
          );
        })}
    </div>
  );
}

export default FeedPage;
