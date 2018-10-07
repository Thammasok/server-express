const multiparty = require('multiparty')

const parseForm = function (req) {
  return new Promise((resolve, reject) => {
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      resolve({
        fields,
        files
      })
    })
  })
}
module.exports = {
  parseForm
}