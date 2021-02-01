import mongoose from 'mongoose'

const Schema = mongoose.Schema

const orderProductSchema = new Schema({
  productId: {
    type: mongoose.ObjectId,
    ref: 'products',
    required: [true, '缺少訂購品ID']
  },
  name: {
    type: String,
    required: [true, '缺少訂購品名稱']
  },
  amount: {
    type: Number,
    required: [true, '缺少訂購品數量']
  },
  price: {
    type: Number,
    required: [true, '缺少訂購品金額']
  }
})

const orderInfoSchema = new Schema({
  userName: {
    type: String,
    required: [true, '缺少訂購者名稱']
  },
  userEmail: {
    type: String,
    required: [true, '缺少訂購者信箱']
  },
  userTel: {
    type: String,
    required: [true, '缺少訂購者電話']
  },
  userAddress: {
    type: String,
    required: [true, '缺少訂購者地址']
  },
  payment: {
    type: String,
    required: [true, '缺少付款方式']
  },
  other: {
    type: String
  }
})

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, '缺少使用者id']
    },
    identification: {
      type: String,
      required: [true, '缺少訂單日期']
    },
    arriveDate: {
      type: String,
      required: [true, '缺少訂單日期']
    },
    date: {
      type: String,
      required: [true, '缺少訂單日期']
    },
    orderInfo: {
      type: [orderInfoSchema],
      required: [true, '缺少訂購人資訊']
    },
    cartInfo: {
      type: [orderProductSchema],
      required: [true, '缺少訂購商品']
    },
    orderStatus: {
      type: String,
      required: [true, '缺少現在狀態']
    }
  },
  {
    versionKey: false
  }
)

const orders = mongoose.model('orders', orderSchema)

export default orders
