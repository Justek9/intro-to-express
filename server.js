const express = require('express')
const path = require('path')
const hbs = require('express-handlebars')

const app = express()

const multer = require('multer')
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	},
})
const upload = multer({ storage: storage })

app.engine('.hbs', hbs())
app.set('view engine', '.hbs')

app.use('/user', (req, res, next) => {
	res.send('<h1>You need to login first</h1>')
	next()
})

app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: false }))

const homePaths = ['/', '/home']
app.get(homePaths, (req, res) => {
	res.render('index')
})

app.get('/about', (req, res) => {
	res.render('about')
})

app.get('/history', (req, res) => {
	res.render('history')
})

app.get('/info', (req, res) => {
	res.render('info')
})

app.get('/contact', (req, res) => {
	res.render('contact')
})

app.get('/hello/:name', (req, res) => {
	res.render('hello', { name: req.params.name })
})

app.post('/contact/send-message', upload.single('design'), (req, res) => {
	const { author, sender, title, message } = req.body
	const design = req.file

	if (author && sender && title && design && message) {
		res.render('contact', { isSent: true, image: design.filename })
	} else {
		res.render('contact', { isError: true })
	}
})

app.use((req, res) => {
	res.status(404).render('notFound')
})

app.listen(8000, () => {
	console.log('Server is running on port 8000')
})
