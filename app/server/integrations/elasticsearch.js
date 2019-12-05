const fetch = require('node-fetch');

exports.getLinkTraffic = async function(linkId) {
  // setup http request
  const url = 'https://' + process.env.HOSTNAME + ':9200';
  const elasticIndex = '/logstash-*/_search';
  const headers = {
    'Content-Type': 'application/json'
  };

  // get dates & ISO strings
  const nowString = createDateString(0, 0, 0);
  const last24hours = createDateString(-1, 0, 0);
  const last7days = createDateString(-7, 0, 0);
  const last30days = createDateString(-30, 0, 0);

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

function createDateString(days, months, years) {
  var date = new Date();
  date.setDate(date.getDate() + days);
  date.setMonth(date.getMonth() + months);
  date.setFullYear(date.getFullYear() + years);
  return date.toISOString();
}

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
  return string;
}
