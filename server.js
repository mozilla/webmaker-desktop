var Hapi = require('hapi');
var Path = require('path');
var qs = require('querystring');
var bunyan = require('bunyan');

var bsd = require('./src/util/bsd');
var archiveRedirect = require('./archive-redirect');

// Create server
var server = new Hapi.Server({
  connections: {
    router: { stripTrailingSlash: true },
    routes: {
      files: { relativeTo: Path.join(__dirname, 'build') }
    }
  }
});

server.connection({
  port: process.env.PORT || 8000
});

// Bunyan Logging
server.register({
  register: require('hapi-bunyan'),
  options: {
    logger: bunyan.createLogger({
      name: 'webmaker-desktop',
      level: process.env.LOG_LEVEL || 'debug'
    })
  }
}, function(err) {
  if ( err ) {
    throw err;
  }
});

// Route handlers
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply.file('index.html');
  }
});

server.route({
  method: 'GET',
  path: '/users/{user}/projects/{project}',
  handler: function (request, reply) {
    // TODO: Replace with desktop player
    reply.redirect('/#/project?' + qs.stringify(request.params));
  }
});

server.route({
  method: 'GET',
  path: '/favicon.ico',
  handler: function (request, reply) {
    reply.file('favicon.ico');
  }
});

server.route({
  method: 'POST',
  path: '/signup',
  handler: function (request, reply) {
    bsd(request.payload.email, function (err, body) {
      if (err) {
        return reply({ok:false});
      }
    });

    reply({ok:true});
  }
});

server.route({
  method: 'GET',
  path: '/{path}/{param*}',
  handler: {
    directory: {
      path: [
        'css',
        'favicons',
        'fonts',
        'img',
        'js'
      ]
    }
  }
});

archiveRedirect.redirectMap.forEach(function(redirect) {
  redirect.from.forEach(function(path) {
    server.route({
      method: 'GET',
      path: path,
      handler: function (request, reply) {
        if (path.match(/events/) && request.params.event) {
          reply.redirect(redirect.to + request.params.event);
        } else {
          reply.redirect(redirect.to);
        }
      }
    });
  });
});

server.ext('onPreResponse', function (request, reply) {
  if (request.response.isBoom) {
    return reply.redirect('/#'+request.path);
  }
  return reply.continue();
});

// Start listening
server.start(function () {
  console.log('Server running at:', server.info.uri);
});
