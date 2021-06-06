const express = require('express')
const fs = require('fs')
const slugify = require('slugify')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  const upload = multer({storage: storage})
const router = express.Router()


router.get('/image-gallery', (req, res) => {
    const files = fs.readdirSync('public/images')
    const gallery = files.map(image => ({ src: `/images/${image}` }))
    res.send({
        statusCode: 200,
        result: gallery
    })
})

router.post('/upload', upload.array('images', 12), (req, res, next) => {
    const files = req.files
    if (!files) {
        const error = new Error('Please choose files')
        return next(error)
    }
    res.send(files)
})

module.exports = router;