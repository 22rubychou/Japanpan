import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectMongo from 'connect-mongo'
import cors from 'cors'
import session from 'express-session'

import routerUser from './routes/users.js'
import routerOrder from './routes/orders.js'
import routerAdmin from './routes/admins.js'
import routerProduct from './routes/products.js'

dotenv.config()

mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

const app = express()

app.use(bodyParser.json())

// 跨域設定
app.use(cors({
  origin (origin, callback) {
    // Postman, 允許
    if (origin === undefined) {
      callback(null, true)
    } else {
      if (process.env.DEV === 'true') {
        // 本機開發, 接受所有請求
        callback(null, true)
      } else if (origin.includes('github')) {
        // 不是本機開發, 但是是從 github 過來的請求, 允許
        callback(null, true)
      } else {
        // 不是本機開發, 也不是從 github 過來, 拒絕
        callback(new Error('Not allowed'), false)
      }
    }
  },
  credentials: true
}))

const MongoStore = connectMongo(session)

const sessionSettings = {
  secret: 'japanpan',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {
    maxAge: 1000 * 60 * 30
  },
  saveUninitialized: false,
  rolling: true,
  resave: true
}

if (process.env.DEV === 'false') {
  // 允許不同網域的認證
  sessionSettings.cookie.sameSite = 'none'
  // 如果是不同網域的認證，一定要設定 secure
  sessionSettings.cookie.secure = true
}

app.use(session(sessionSettings))

// 部署上 heroku
app.set('trust proxy', 1)

app.use('/users', routerUser)
app.use('/orders', routerOrder)
app.use('/admins', routerAdmin)
app.use('/products', routerProduct)

app.use((_, req, res, next) => {
  res.status(500).send({ success: false, message: '伺服器錯誤' })
})

app.listen(process.env.PORT, () => {
  console.log('server started')
})
