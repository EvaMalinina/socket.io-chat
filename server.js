let express = require('express')
let bodyParser = require('body-parser')
let app = express()
let http = require('http').Server(app)
let io = require('socket.io')(http)
let mongoose = require('mongoose')

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const dbUrl = 'mongodb+srv://1234554321:1234554321@node-chat.ilkbi.mongodb.net/1234554321?retryWrites=true&w=majority'

let Message = mongoose.model('Message', {
    name: String,
    message: String,
})

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
})

app.post('/messages', async (req, res) => {

    try {
        let message = new Message(req.body);
        let savedMessage = await message.save();
        console.log('msg created', savedMessage)

        let censored = await Message.findOne({ message: 'badword'});
        if (censored)
           await Message.remove({_id: censored._id})
        else
            io.emit('message', req.body)

        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(500)
        return console.error(err)
    }
})

io.on('connection', (socket) => {
    console.log('a user connected')
})

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    console.log('mongo db connection', err)
})

let server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})
