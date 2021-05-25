const { bootstrap } = require('./build/server/bootstrap');

if (process.env.MODE === 'production') {
  bootstrap();
}
