const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/categories', require('./routes/categories.routes'))
app.use('/api/goods', require('./routes/goods.routes'))

if (process.env.NODE_ENV === 'production') {
  const root = path.join(__dirname, 'client', 'build')
  app.use('/', express.static(root));

  app.get('*', (req, res) => {
    res.sendFile('index.html', { root });
  })
}

const PORT = process.env.PORT || config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log("Server Error: ", e.message)
    process.exit(1)
  }
}

start().then()
