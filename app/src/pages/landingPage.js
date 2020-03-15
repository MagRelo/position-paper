import React, { useRef, useState } from 'react';
// import { Link } from '@reach/router';

import MapGL, { Source, Layer } from 'react-map-gl';
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer
} from './layers';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

function LandingPage() {
  const [viewport, setViewport] = useState({
    latitude: 40.67,
    longitude: -103.59,
    zoom: 3,
    bearing: 0,
    pitch: 0
  });

  const _sourceRef = useRef();
  const _onViewportChange = viewport => setViewport(viewport);
  const _onClick = event => {
    console.log(event);

    if (event.features && event.features[0]) {
      const feature = event.features[0];
      const clusterId = feature.properties.cluster_id;

      const mapboxSource = _sourceRef.current.getSource();

      mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) {
          return;
        }

        _onViewportChange({
          ...viewport,
          longitude: feature.geometry.coordinates[0],
          latitude: feature.geometry.coordinates[1],
          zoom,
          transitionDuration: 500
        });
      });
    } else {
      console.log('no features');
    }
  };

  return (
    <React.Fragment>
      <div style={{ width: '100vw', height: '100vh' }}>
        <MapGL
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/magrelo/ck7qhgqub16tc1ipazelj9io4"
          onViewportChange={_onViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          interactiveLayerIds={[clusterLayer.id]}
          onClick={_onClick}
        >
          <Source
            type="geojson"
            data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
            cluster={true}
            clusterMaxZoom={14}
            clusterRadius={50}
            ref={_sourceRef}
          >
            <Layer {...clusterLayer} />
            <Layer {...clusterCountLayer} />
            <Layer {...unclusteredPointLayer} />
          </Source>
          {/* <ControlPanel containerComponent={this.props.containerComponent} /> */}
        </MapGL>
      </div>
    </React.Fragment>
  );
}

export default LandingPage;
