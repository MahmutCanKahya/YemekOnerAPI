const knex = require('./conenction')

const User = {
    getOnById: id => {
        return knex('users').where('id', id).first();
    },
    getOneByEmail: email => {
        return knex('users').where('email', email).first();
    },
    create: user => {
        return knex('users').insert(user, 'id').then(ids => {
            return User.getOnById(ids[0]);
        })
    }
}

module.exports = User;
