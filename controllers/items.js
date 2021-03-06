const Item = require('../models/item')

function indexRoute(req, res){
  Item
    .find()
    .populate([
      { path: 'creator', select: 'username image bio'},
      { path: 'averageRating' }
    ])
    .then(items => res.json(items))
    .catch(err => console.log(err.message))
}

function showRoute(req, res, next){
  Item
    .findById(req.params.id)
    .populate([
      { path: 'creator', select: 'username image bio'},
      { path: 'averageRating' }
    ])
    .then(item => res.json(item))
    .catch(next)
}

function createRoute(req, res, next){
  req.body.creator = req.currentUser
  Item
    .create(req.body)
    .then(item => res.status(201).json(item))
    .catch(next)
}

function commentCreateRoute(req, res, next){
  Item
    .findById(req.params.id)
    .then(item => {
      item.comments.unshift(req.body)
      return item.save()
    })
    .then(comment => res.status(201).json(comment))
    .catch(next)
}

function deleteRoute(req, res, next){
  Item
    .deleteOne({ _id: req.params.id })
    .then(() => res.status(204).send())
    .catch(next)
}

function updateRoute(req, res, next) {
  Item
    .findById(req.params.id)
    .then(item => item.set(req.body))
    .then(item => item.save())
    .then(item => res.status(200).json(item))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  delete: deleteRoute,
  update: updateRoute,
  create: createRoute,
  commentCreate: commentCreateRoute
}
