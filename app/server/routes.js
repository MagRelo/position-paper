var express = require('express');
var router = express.Router();

const path = require('path');
const fs = require('fs');

const LinkModel = require('./models').LinkModel;

//
// MISC
//

router.get('/link/:linkId', function(req, res) {
  // get index page and replace meta values
  const filePath = path.resolve(__dirname, '../build', 'index.html');
  fs.readFile(filePath, 'utf8', async function(err, data) {
    if (err) {
      res.sendFile('index.html', { root: './build' });
    }

    // get link
    const link = await LinkModel.findOne({
      linkId: req.params.linkId
    });
    if (!link) return res.status(404).send({ error: 'not found' });

    data = data.replace(
      /\$OG_TITLE/g,
      link.data.jobTitle + ' – ' + link.data.employer
    );
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      `Apply now and get ${link.target_bonus} when you get the job, OR promote this position and collect up to ${link.network_bonus} if the candidate applies through your link.`
    );
    const result = data.replace(
      /\$OG_IMAGE/g,
      'https://' + req.hostname + '/logo_share.png'
    );
    res.send(result);
  });
});

// serve the frontend for all non-api requests
router.get('*', function(req, res) {
  // base route
  console.log('base route');

  // get index page and replace meta values
  const filePath = path.resolve(__dirname, '../build', 'index.html');
  fs.readFile(filePath, 'utf8', async function(err, data) {
    if (err) {
      console.log('index not found - fallback...');
      res.sendFile('index.html', { root: './build' });
    }

    // replace values
    data = data.replace(/\$OG_TITLE/g, 'Talent Relay');
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      `Talent Relay super-charges your talent search. We combine cash incentives, social networking, and human judgement to provide a steady stream of high-quality, pre-screened candidates`
    );
    const result = data.replace(
      /\$OG_IMAGE/g,
      'https://' + req.hostname + '/logo_share.png'
    );

    console.log(result);
    res.send(result);
  });
});
module.exports = router;
