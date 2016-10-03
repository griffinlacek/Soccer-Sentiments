var Hapi = require('hapi');
var env = require('env2')('.env');
var snoowrap = require('snoowrap');

var server = new Hapi.Server();

var r = new snoowrap({
  userAgent: process.env.USER_AGENT,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.SECRET_ID,
  refreshToken: process.env.REFRESH_TOKEN
});

server.connection({
  host: 'localhost',
  port: 8000
});

server.route({
  method: 'GET',
  path: '/thread',
  handler: function(request, reply) {
    var gunners = r.getSubreddit('gunners');
    gunners.search({query: 'Match Thread', time: 'week'}).then(console.log);
  }
});

server.start((err) => {
  if(err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
