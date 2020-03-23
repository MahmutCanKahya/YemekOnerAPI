import Sequelize from 'sequelize';
import {sequelize} from '../database/database';

const Role = sequelize.define('role_type',{
    id:{
        type:Sequelize.INTEGER,
        primartKey:true
    },
    name:{
        type:Sequelize.STRING
    }

},{
    timetamps:false
})

export default Role;