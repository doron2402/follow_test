var configApp = require('./config.json')
	, follow = require('follow')


var opts = {}; // Same options paramters as before
var feed = new follow.Feed(opts);

// You can also set values directly.
feed.db            = "https://" + configApp.auth.user + ":" + configApp.auth.pass + "@" + configApp.auth.url + ":" + configApp.auth.port + "/" + configApp.auth.db_name;
feed.since         = 3;
feed.heartbeat     = 30    * 1000
feed.inactivity_ms = 86400 * 1000;

feed.filter = function(doc, req) {
  // req.query is the parameters from the _changes request and also feed.query_params.
  console.log('Filtering for query: ' + JSON.stringify(req.query));
  console.log(doc);
  if(doc.stinky || doc.ugly)
    return false;
  return true;
}

feed.on('change', function(change) {
  console.log('change...');
  console.log(change);
})

feed.on('error', function(er) {
  console.error('Since Follow always retries on errors, this must be serious');
  throw er;
})

feed.follow();
