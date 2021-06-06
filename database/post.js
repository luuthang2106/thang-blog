const { DataTypes } = require('sequelize')
const Post = (sequelize) => sequelize.define('Post', {
    postTitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    postSlug: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isPublished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        tableName: 'Posts',
    }
)
module.exports = Post