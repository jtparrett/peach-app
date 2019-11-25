const { client, q } = require('../helpers/db');
const { makeIndex } = require('../helpers/updateOrCreate');

module.exports = async () => {
  console.log('Creating "all_message" index');

  await client.query(
    makeIndex({
      name: 'all_message',
      source: q.Collection('Message'),
    })
  );
};
