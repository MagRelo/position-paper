const fetch = require('node-fetch');

const testURL = 'https://incentive.exchange:9200';

exports.getLinkTraffic = async function(linkId) {
  // setup http request
  const url = testURL;
  const elasticIndex = '/logstash-*/_search';
  const headers = {
    'Content-Type': 'application/json'
  };

  // get dates & ISO strings
  const now = new Date();
  const nowString = now.toISOString();
  const last24hoursDate = now.getDate() - 1;
  const last24hours = last24hoursDate.toISOString();
  const last7daysDate = now.getDate() - 7;
  const last7days = last7daysDate.toISOString();
  const last30daysDate = now.getDate() - 30;
  const last30days = last30daysDate.toISOString();

  // run three queries (hack)
  const results = await Promise.all([
    fetch(url + elasticIndex, {
      method: 'POST',
      headers: headers,
      body: buildElasticQuery(linkId, last24hours, nowString)
    }).then(response => response.json()),
    fetch(url + elasticIndex, {
      method: 'POST',
      headers: headers,
      body: buildElasticQuery(linkId, last7days, nowString)
    }).then(response => response.json()),
    fetch(url + elasticIndex, {
      method: 'POST',
      headers: headers,
      body: buildElasticQuery(linkId, last30days, nowString)
    }).then(response => response.json())
  ]);

  return {
    last1days: results[0].hits.total.value,
    last7days: results[1].hits.total.value,
    last30days: results[2].hits.total.value,
    topReferrers: [
      { label: 'facebook.com', last7days: 41, type: 'desktop' },
      { label: '(direct)', last7days: 19, type: 'mobile' },
      { label: 'instagram.com', last7days: 8, type: 'mobile' }
    ],
    geoip: {}
  };
};

function buildElasticQuery(linkId, startDateTime, endDateTime) {
  const string = `
  {    
    "aggs": {
      "2": {
        "date_histogram": {
          "field": "@timestamp",
          "interval": "3h",
          "time_zone": "America/New_York",
          "min_doc_count": 1
        }
      }
    },
    "query": {
      "bool": {
        "must": [
          {
            "range": {
              "@timestamp": {
                "format": "strict_date_optional_time",
                "gte": "${startDateTime}",
                "lte": "${endDateTime}"
              }
            }
          }
        ],
        "filter": [
          {
            "multi_match": {
              "type": "best_fields",
              "query": "${linkId}",
              "lenient": true
            }
          }
        ],
        "should": [],
        "must_not": []
      }
    }
  }`;

  console.log(string);
  return string;
}
