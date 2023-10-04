const express = require('express')
const path = require('path')

const app = express()

app.use((req, res, next) => {
	res.show = name => {
		res.sendFile(path.join(__dirname, `/views/${name}`))
	}
	next()
})

app.use('/user', (req, res, next) => {
	res.send('<h1>You need to login first</h1>')
	next()
})

app.use(express.static(path.join(__dirname, '/public')))

const homePaths = ['/', '/home']
app.get(homePaths, (req, res) => {
	res.show('index.html')
})

app.get('/about', (req, res) => {
	res.show('about.html')
})

app.use((req, res) => {
	res.status(404).show('notFound.html')
})

app.listen(8000, () => {
	console.log('Server is running on port 8000')
})
