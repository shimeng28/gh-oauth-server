const app = require('express')()
const request = require('request')
const bodyParser = require('body-parser')
const upload = require('multer')()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Content-Type', 'application/json')
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('*', upload.array(), (req, res) => {
  console.log(`${req.url} -- ${Date.now()}`)
  request.post({
    url: 'https://github.com/login/oauth/access_token',
    form: req.body,
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'gh-oauth-server',
    },
  }, (error, r, body) => {
    if (!error) {
      console.log(JSON.stringify(body));
      res.send(body)
    } else {
      console.log(error);
      res.json({ error })
    }
  })
})

const port = process.env.PORT || 3000;
console.log(port);
app.listen(port, () => console.log(`gh-oauth-server listening on port ${port}`))
