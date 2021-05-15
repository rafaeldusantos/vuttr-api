import database from 'mongoose';

const stringRequired = { type: String, require: true };

const schema = new database.Schema({
  title: stringRequired,
  link: stringRequired,
  "description": String,
  tags: [ String ]
});

export default database.model('Tools', schema);
