const {DataTypes} = require('sequelize')
const Tag = (sequelize) => sequelize.define('Tag', {
    tagName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tagSlug: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isPublished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
}, {
    tableName: 'Tags'
})
module.exports = Tag