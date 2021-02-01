import multer from 'multer'
// import FTPStorage from 'multer-ftp'
import axios from 'axios'
import path from 'path'
import fs from 'fs'

import products from '../models/products.js'

// let storage

// if (process.env.DEV === 'true') {
//   storage = multer.diskStorage({
//     destination (req, file, callback) {
//       callback(null, 'images/')
//     },
//     filename (req, file, callback) {
//       callback(null, Date.now() + path.extname(file.originalname))
//     }
//   })
// } else {
//   storage = new FTPStorage({
//     // FTP 登入設定
//     ftp: {
//       host: process.env.FTP_HOST,
//       user: process.env.FTP_USER,
//       password: process.env.FTP_PASSWORD,
//       secure: false
//     },
//     // 上傳的路徑含檔名
//     // 路徑為 FTP 的絕對路徑
//     destination (req, file, options, callback) {
//       callback(null, '/' + Date.now() + path.extname(file.originalname))
//     }
//   })
// }
const storage = multer.diskStorage({
  destination (req, file, callback) {
    callback(null, './images/')
  },
  filename (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage,
  fileFilter (req, file, callback) {
    if (!file.mimetype.includes('image')) {
      callback(new multer.MulterError('LIMIT_FORMAT'), false)
    } else {
      callback(null, true)
    }
  },
  limits: {
    fileSize: 1024 * 1024
  }
})

export const create = async (req, res) => {
  // 這個請求沒有登錄
  // if (req.session.user === undefined) {
  //  res.status(401).send({ success: false, message: '未登錄' })
  //  return
  // }
  // multipart/form-data 可以同時帶文字資料和檔案
  // 是 HTML form 標籤送出後的表單資料型態之一
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }
  // 只接受一個檔案接受上傳
  // 上傳的欄位名叫 file
  // 將 express 的 req res 傳入上傳動作
  // error 會是檔案上傳的錯誤
  // upload.single(欄位, )(req, res, 上傳完畢後的 function)
  upload.single('images')(req, res, async (error) => {
    // 如果是上傳錯誤
    if (error instanceof multer.MulterError) {
      let message = ''
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else if (error.code === 'LIMIT_FORMAT') {
        message = '檔案不符格式'
      } else {
        message = '發生錯誤'
      }
      res.status(400).send({ success: false, message })
    } else if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    } else {
      try {
        let file = ''
        if (process.env.DEV === 'true') {
          file = req.file.filename
        } else {
          file = path.basename(req.file.path)
        }
        const result = await products.create({
          name: req.body.name,
          images: file,
          price: req.body.price,
          sell: req.body.sell,
          description: req.body.description,
          ingredient: req.body.ingredient,
          allergy: req.body.allergy,
          period: req.body.period,
          category: req.body.category
        })
        res.status(200).send({ success: true, message: '', result })
      } catch (error) {
        if (error.name === 'ValidationError') {
          const key = Object.keys(error.errors)[0]
          const message = error.errors[key].message
          res.status(400).send({ success: false, message })
        } else {
          res.status(500).send({ success: false, message: '伺服器錯誤' })
        }
        console.log(error)
      }
    }
  })
}

export const getProducts = async (req, res) => {
  try {
    const result = await products.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '發生錯誤' })
  }
}

export const getOneProduct = async (req, res) => {
  try {
    const result = await products.findById(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '發生錯誤' })
  }
}

export const getImage = async (req, res) => {
  // 因為 sendFile 只用絕對路徑
  // 所以需要 process.cwd() 取得目前 node 執行的資料夾
  const path = process.cwd() + '/images/' + req.params.filename
  // 檢查路徑是否存在
  const exists = fs.existsSync(path)

  if (exists) {
    res.status(200).sendFile(path)
  } else {
    res.status(404).send({ success: false, message: '找不到檔案' })
  }
}

export const editIMG = (req, res) => {

}

export const edit = async (req, res) => {
  if (req.session.admin === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    let result = await products.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      result = await products.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const deletee = async (req, res) => {
  if (req.session.admin._id === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }

  try {
    let result = await products.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      result = await products.findByIdAndDelete(req.params.id)
      res.status(200).send({ success: true, message: '', result })

      // 刪除本機圖片檔
      if (process.env.DEV === 'true') {
        fs.unlink('images/' + result.images, () => {})
      }
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const user = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (req.session.user._id !== req.params.user) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }

  try {
    const result = await products.find({ user: req.params.user })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const file = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }

  // 開發環境回傳本機圖片
  if (process.env.DEV === 'true') {
    const path = process.cwd() + '/images/' + req.params.file
    const exists = fs.existsSync(path)

    if (exists) {
      res.status(200).sendFile(path)
    } else {
      res.status(404).send({ success: false, message: '找不到圖片' })
    }
  } else {
    axios({
      method: 'GET',
      url: 'http://' + process.env.FTP_HOST + '/' + process.env.FTP_USER + '/' + req.params.file,
      responseType: 'stream'
    }).then(ress => {
      ress.data.pipe(res)
    }).catch(error => {
      res.status(error.response.status).send({ success: false, message: '取得圖片失敗' })
    })
  }
}
