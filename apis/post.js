const express = require('express')
const { Post, Tag, Counter, sequelize } = require('../database/db')
const router = express.Router()

router.get('/posts', async (req, res) => {
  const itemsPerPage = 8;
  const { page, tag } = req.query || {}
  try {
    const data = await Post.findAndCountAll({
      attributes: ['postTitle', 'postSlug', 'updatedAt', 'imageUrl'],
      offset: itemsPerPage * (page - 1),
      limit: itemsPerPage,
      where: {
        isPublished: true,
      },
      include: [
        {
          model: Tag,
          as: 'tag',
          attributes: ['tagSlug', 'tagName'],
          where: !!tag ? {
            tagSlug: tag
          } : {}
        }
      ]
    });
    return res.status(200).send({ posts: data.rows, total: data.count });
  } catch (error) {
    return res.status(404).send(error);
  }
})

router.get('/posts/:condition', async (req, res) => {
  const condition = req.params.condition
  switch (condition) {
    case 'popular':
      try {
        const data = await Post.findAll({
          attributes: ['postTitle', 'postSlug'],
          where: {
            isPublished: true,
          },
          limit: 5,
          include: [
            {
              model: Counter,
              as: 'counter',
            },
            {
              model: Tag,
              as: 'tag',
              attributes: ['tagSlug', 'tagName'],
            }
          ],
          order: [
            [sequelize.literal('views'), 'desc']
          ]
        })
        return res.status(200).send(data);
      } catch (error) {
        return res.status(404).send(error);
      }

    default:
      res.sendStatus(404)
      break;
  }
})

router.get('/post/:slug', async (req, res) => {
  const slug = req.params.slug;
  if (slug === undefined) {
    return res.sendStatus(404)
  }
  try {
    const post = await Post.findOne({
      attributes: ['postTitle', 'content', 'imageUrl', 'counterId'],
      where: {
        isPublished: true,
        postSlug: slug
      },
    })
    await Counter.update({ views: sequelize.literal('views + 1') }, { where: { id: post.counterId } });
    return res.status(200).send(post)
  } catch (error) {
    return res.status(404).send(error)
  }
})

router.get('/admin/posts', async (req, res) => {
  const posts = await Post.findAll({
    include: [
      {
        model: Tag,
        as: 'tag',
        attributes: ['tagName']
      }
    ]
  });
  return res.status(200).send(posts);
})

router.get('/admin/post/:id', async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByPk(id);
  return res.status(200).send(post);
})

router.get('/admin/post/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Post.destroy({
      where: {
        id
      }
    });
    return res.sendStatus(204);
  } catch (error) {
    console.log(error)
    return res.status(400).send(error);
  }
})

router.post('/admin/post', async (req, res) => {
  const data = req.body
  const { createdAt, updatedAt, ...post } = data
  try {
    if (post.id) {
      await Post.update(post, { where: { id: post.id } })
      return res.status(204).send();
    } else {
      const counter = await Counter.create({})
      const newPost = { ...post, counterId: counter.id }
      await Post.create(newPost)
      return res.status(204).send();
    }
  } catch (error) {
    return res.status(400).send(error);
  }
})

module.exports = router;