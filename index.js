const express = require('express')
const mock = require('mockjs')

const app = express()

const data = mock.mock({
  ["list|100"]: [{
    "name": "@cname", // 中文名
    "id|+1": 1, // 自增，步长1
    "img": "@image(300x250)", // dataurl
    "price": "@natural(10,100)", // 随机10-100整数
    "number|10-100": 100, // 随机10-100整数
    "number2|1-100.1": 1, // 随机1-100之间的1位小数
    "number2|1-100.10": 100, // 随机1-100之间的10位小数
    "title": "@ctitle", // 随机中文标题
    "description": "@cparagraph", // 随机中文段落
    "email": "@email", // 随机邮箱
    "word": "@cword(250,400)", // 随机文字5-20 
    "start|1-10": "★", // 随机星星个数
    "province": "@province", // 随机省份
    "city": "@city", // 随机省份
  }]
})

app.get('/getList', (req, res) => {
  const limit = Number(req.query.limit) || 12
  const page = Number(req.query.page) || 1
  const offsetStart = (page - 1) * limit + 1
  const offsetEnd = offsetStart + limit
  const list = data.list.filter(e => e.id >= offsetStart && e.id <= offsetEnd)

  res.json({
    code: 1,
    message: 'success',
    list
  })
})

app.get('/getDetail', (req, res) => {
  const id = Number(req.query.id)
  const _data = data.list.find(e => e.id === id)
  res.json({
    code: 1,
    message: 'success',
    data: _data
  })
})


app.listen('3000', () => {
  console.log('项目已启动')
})