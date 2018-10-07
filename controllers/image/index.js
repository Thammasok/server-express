const { parseForm } = require('./func')
// const { uploadFileValidate } = require('./validate')
/**
 * ADD IMAGE UPLOAD
 * image, path
 */
exports.uploadFile = async function (req, res, next) {
  const reqData = await parseForm(req)
  // const tags = reqData.fields.tags !== undefined ? JSON.parse(reqData.fields.tags[0]) : undefined

  return res.status(200).json(reqData.files)
  // const userToken = req.headers.authorization
  // const userId = await getUserIdByAuthToken(userToken)

  // await uploadFileValidate(tags).catch(err => { return res.status(403).json(err) })

  // const imagePath = await uploadImage2Server(reqData.files, 'image')
  
  // saveToDatabase(imagePath, userId, tags).then(result => {
  //   return res.status(200).json(result)
  // })
  // .catch(err => {
  //   return res.status(403).json(err)
  // })
}