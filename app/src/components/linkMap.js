import React from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import geographyObject from 'components/util/maps/map50.json';
const popScale = scaleLinear()
  .domain([0, 100000000, 1400000000])
  .range(['#fff', '#aaa', '#444']);

function LinkAdmin(props) {
  return (
    <div>
      <ComposableMap
        height={300}
        style={{
          width: '100%',
          height: 'auto'
        }}
      >
        <ZoomableGroup>
          <Geographies geography={geographyObject}>
            {(geographies, projection) =>
              geographies.map((geography, index) => (
                <Geography
                  key={index}
                  geography={geography}
                  projection={projection}
                  style={{
                    default: {
                      fill: popScale(geography.properties.pop_est),
                      stroke: '#aaa',
                      strokeWidth: 0.75,
                      outline: 'none'
                    },
                    hover: {
                      fill: '#007adb',
                      stroke: '#007adb',
                      strokeWidth: 0.75,
                      outline: 'none'
                    },
                    pressed: {
                      fill: '#263238',
                      stroke: '#607D8B',
                      strokeWidth: 0.75,
                      outline: 'none'
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}

export default LinkAdmin;
