const Joi = require('joi')

const uploadFileValidate = function (tags) {
  return new Promise((resolve, reject) => { 
    const schema = Joi.object().keys({
      tags: Joi.array().items(Joi.string()).min(1).required()
    })

    Joi.validate({
      tags: tags
    }, schema, function (err, value) {
      if (err) {
        reject(err.details[0])
        // return res.status(403).json(err.details[0])
      }

      resolve(value)
    })
  })
}

module.exports = {
  uploadFileValidate
}