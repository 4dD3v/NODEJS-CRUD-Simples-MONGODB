//importando o nosso express

const express = require('express')
const app = express()
var path = require('path');
const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb://localhost:27017'
const ObjectId = require('mongodb').ObjectId

/*MongoDB endereço
local: 'mongodb://localhost:27017'

*/

//Configurando o EJS
app.set('view engine', 'ejs')
app.use('/views', express.static(path.join(__dirname, 'views')))
app.set('views', path.join(__dirname, '/views'))
//Configurando o EJS-FIM

app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
    res.render('index.ejs')
})

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err)
    //colocando o nosso banco
    db = client.db('testebd')

    app.listen(3000, () => {
        console.log("Servidor rodando tranquilo")
    })

})



app.get('/', (req, res) => {
    let cursor = db.collection('crud').find()

})

app.post('/show', (req,res) => {
    db.collection('crud').insertOne(req.body, (err, result) => {
    if(err) return console.log(err)
    console.log('salvo no mongodb')
    res.redirect('/')
    db.collection('crud').find().toArray((err, results) => {
    console.log(results)
})
})
})

app.get('/', (req, res) => {
    var cursor = db.collection('crud').find
})

app.get('/show', (req, res) => {
    db.collection('crud').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { crud: results })

    })

})

//criando a rota para editar

app.route('/edit/:id')
.get((req,res) => {
    var id = req.params.id
    db.collection('crud').find(ObjectId(id)).toArray((err,result) =>{
        if(err) return res.send(err)
        res.render('edit.ejs', {crud: result})


    })


})

.post((req,res) => {
    var id = req.params.id
    var name = req.body.name
    var surname = req.body.surname


    db.collection('crud').updateOne({_id: ObjectId(id)}, {
        $set: {
            name: name,
            surname: surname

        }


    }, (err,result) => {
        if(err) return res.send(err)
        res.redirect('/')
        console.log('Banco de dados atualizado')
    })




})
// criando nossa rota de deletar dados
app.route('/delete/:id')
.get((req,res) => {
    var id = req.params.id
    db.collection('crud').deleteOne({_id: ObjectId(id)}, (err, result) => {
        if(err) return res.send(500,err)
        console.log('Dados deletados!')
        res.redirect('/show')
    });
})
















//criando

/*permite o servidor se comunicar com o navegador
app.listen(3000, function(){
    console.log("O nosso servidor está rodando na porta 3000")
})
*/
/*app.use(bodyParser.urlencoded({extended: true}))
app.post('/show', (req, res) =>{
    console.log(req.body)
})
*/

/*
app.post('/show', (req, res) => {
    db.collection('crud').save(req.body, (err, result) => {
        if(err) return console.log(err)
        console.log('salvo no mongodb')
        res.redirect('/')

    })

})
*/