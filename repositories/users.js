const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
  async comparePasswords(saved, supplied) {
    // Saved -> password saved in our database. 'hashed.salt'
    // Supplied -> password given to us by a user trying sign in
    const [hashed, salt] = saved.split('.');

    const suppliedHashedBuf = await scrypt(supplied, salt, 64);

    return hashed === suppliedHashedBuf.toString('hex');
  }

  async create(attributes) {
    attributes.id = this.randomID();

    const salt = crypto.randomBytes(8).toString('hex');
    const buf = await scrypt(attributes.password, salt, 64);

    const records = await this.getAll();
    const record = {
      ...attributes,
      password: `${buf.toString('hex')}.${salt}`,
    };
    records.push(record);

    await this.writeAll(records);

    return record;
  }
}

module.exports = new UsersRepository('users.json');

// const test = async () => {
//   const repo = new UsersRepository('users.json');

//   await repo.create({ email: 'test@test.com', password: 'password' });

//   const user = await repo.getOneBy({ email: 'test@test.com', password: 'mypassword' });
//   console.log(user);
// };

// test();
