const express = require('express')
const { Post, Tag } = require('../database/db')
const router = express.Router()

router.get('/tags', async (req, res) => {
  const tags = await Tag.findAll({
    attributes: ['tagName', 'tagSlug'],
    where: {
      isPublished: true
    }
  });
  return res.status(200).send(tags);
})

router.get('/admin/tags', async (req, res) => {
  const tags = await Tag.findAll({});
  return res.status(200).send(tags);
})

router.get('/admin/tag/:id', async (req, res) => {
  const id = req.params.id;
  const tag = await Tag.findByPk(id);
  return res.status(200).send(tag);
})

router.get('/admin/tag/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Tag.destroy({
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

router.post('/admin/tag', async (req, res) => {
  const tag = req.body
  const { createdAt, updatedAt, ...tagWithoutUnixDate } = tag
  try {
    await Tag.upsert(tagWithoutUnixDate)
    return res.status(204).send();
  } catch (error) {
    return res.status(400).send(error);
  }

})

module.exports = router;