// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

import './scrape.fb.js' ;

// [START gae_node_request_example]
import express from 'express';
import * as scrape from "./scrape.fb.js";

export const app = express();

const SCRAPE_TIME = 8 * 60 * 60 * 1000;

var lastScrape = 0

var result;
app.get('/2xx', async (req, res) => {
    const template = req.query.t
    if (Date.now() - lastScrape > SCRAPE_TIME) {
      var r = await scrape.doRetrieveTotw();
      if (r)
        result = r;
      lastScrape = Date.now();
    }
    res.set("content-type","text/javascript")
    res.set("cache-control","max-age="+SCRAPE_TIME/2)

    res.send("document.write('"+scrape.doReplacement(template,result).replaceAll("'","\'").replaceAll("\\","\\\\")
    +"')");
  }
)
app.use(express.static('dist/pepartech'))

// Start the server
const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

