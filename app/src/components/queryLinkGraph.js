import React, { Component } from 'react';
import { Graph } from 'react-d3-graph';

const graphOptions = {
  width: 640,
  nodeHighlightBehavior: true,
  node: {
    color: '#0079db',
    size: 320,
    highlightStrokeColor: '#00a96e',
    labelProperty: 'name',
    fontSize: '14',
    highlightFontSize: '14'
  },
  link: {
    highlightColor: '#00a96e',
    color: '#0079db'
  }
};

function shadeColor(color, percent) {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  var RR = R.toString(16).length === 1 ? '0' + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length === 1 ? '0' + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length === 1 ? '0' + B.toString(16) : B.toString(16);

  return '#' + RR + GG + BB;
}

function buildGraphData(links) {
  const graphData = {
    nodes: [],
    links: []
  };

  // loop through links
  links.forEach(link => {
    // formatting
    const size = 200 + link.views * 40;
    const lighteningFactor = link.generation * 20;
    const color = shadeColor('#0079db', lighteningFactor);

    // add link as node
    graphData.nodes.push({
      id: link.linkId,
      size: size,
      color: color,
      name: 'Views: ' + link.views,
      symbolType: link.parentLink ? null : 'square'
    });

    // link to parent
    if (link.parentLink) {
      graphData.links.push({
        source: link.linkId,
        target: link.parentLink.linkId
      });
    }
  });

  console.log(graphData);

  return graphData;
}

class LinkGraph extends Component {
  render() {
    return (
      <div>
        {this.props.links.length ? (
          <Graph
            id="graph-id"
            data={buildGraphData(this.props.links)}
            config={graphOptions}
            directed={true}
          />
        ) : null}
      </div>
    );
  }
}

export default LinkGraph;