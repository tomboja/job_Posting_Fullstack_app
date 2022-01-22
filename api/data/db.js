const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL)

mongoose.connection.on('connected', () => {
  console.log('Database connected to ' + process.env.DB_URL)
})

mongoose.connection.on('disconnected', () => {
  console.log('Db disconnected from ' +  process.env.DB_URL)
})

mongoose.connection.on('error', () => {
  console.log('Db connection error')
})

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('DB Connection closed')
    process.exit(0)
  })
})

process.on('SIGTERM', () => {
  mongoose.connection.close(() => {
    console.log('DB connection closed')
    process.exit(0)
  })
})