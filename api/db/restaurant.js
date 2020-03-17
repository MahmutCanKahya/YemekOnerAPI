const knex = require('./conenction')

const Restaurant = {
    getAll: () => {
        return knex("restaurant")
    },
    getOnById: id => {
        return knex('restaurant').where('id', id).first();
    },
    getOnByRowGuid: row_guid => {
        return knex('restaurant').where('row_guid', row_guid).first();
    },
    create: async restaurant => {
        const ids = await knex('restaurant').insert(restaurant, 'id');
        try {
            return Restaurant.getOnById(ids[0]);
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
}
module.exports = Restaurant