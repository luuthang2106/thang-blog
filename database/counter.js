const {DataTypes} = require('sequelize')
const Counter = (sequelize) => sequelize.define('Counter', {
    views: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
}, {
    tableName: 'Counter',
    timestamps: false
})
module.exports = Counter