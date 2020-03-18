var express = require('express');
var router = express.Router();

const path = require('path');
const fs = require('fs');

//
// MISC
//

// serve the frontend for all non-api requests
router.get('*', function(req, res) {
  // base route
  // console.log('base route');

  // get index page and replace meta values
  const filePath = path.resolve(__dirname, '../build', 'index.html');
  fs.readFile(filePath, 'utf8', async function(err, data) {
    if (err) {
      console.log('index not found - fallback...');
      res.sendFile('index.html', { root: './build' });
    }

    // replace values
    data = data.replace(/\$OG_TITLE/g, 'Local Connect');
    data = data.replace(/\$OG_DESCRIPTION/g, `Connecting communities together`);
    const result = data.replace(
      /\$OG_IMAGE/g,
      'https://' + req.hostname + '/logo_share.png'
    );

    // console.log(result);
    res.send(result);
  });
});
module.exports = router;
