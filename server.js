const express = require('express')
const path = require('path')
const hbs = require('express-handlebars')

const app = express()
app.engine('.hbs', hbs())
app.set('view engine', '.hbs')

// app.use((req, res, next) => {
// 	res.show = name => {
// 		res.sendFile(path.join(__dirname, `/views/${name}`))
// 	}
// 	next()
// })

app.use('/user', (req, res, next) => {
	res.send('<h1>You need to login first</h1>')
	next()
})

app.use(express.static(path.join(__dirname, '/public')))

const homePaths = ['/', '/home']
app.get(homePaths, (req, res) => {
	res.render('index', { layout: false })
})

app.get('/about', (req, res) => {
	res.render('about', { layout: false })
})

app.get('/hello/:name', (req, res) => {
	res.render('hello', { layout: false, name: req.params.name })
})

app.use((req, res) => {
	res.status(404).render('notFound', { layout: false })
})

app.listen(8000, () => {
	console.log('Server is running on port 8000')
})
