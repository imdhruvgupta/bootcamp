const {Sequelize} = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'data.db',
})


const Users = db.define('users', {
   id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       primaryKey: true
   },
   name: {
       type: Sequelize.STRING,
       allowNull: false
   },
   age: {
       type: Sequelize.INTEGER,
       allowNull: false
   },
   country: {
       type: Sequelize.STRING
   }
})

module.exports = {
    db, Users
}