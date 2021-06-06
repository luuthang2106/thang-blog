const { Sequelize } = require('sequelize')



const sequelize = new Sequelize({
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'blog',
    dialect: 'mysql',
})

const Tag = require('./tag')(sequelize)
const Post = require('./post')(sequelize)
const Counter = require('./counter')(sequelize)


Counter.hasOne(Post, {
    foreignKey: 'counterId',
    as: 'post'
})
Post.belongsTo(Counter, {
    foreignKey: 'counterId',
    as: 'counter'
})

Tag.hasMany(Post, {
    foreignKey: 'tagId',
    as: 'posts'
})
Post.belongsTo(Tag, {
    foreignKey: 'tagId',
    as: 'tag',
})

module.exports = {
    Tag,
    Post,
    Counter,
    sequelize,
}

