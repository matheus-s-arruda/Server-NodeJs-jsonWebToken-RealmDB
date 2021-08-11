const webtoken = require('jsonwebtoken');
const express = require('express');
const open = require('open');
const Fs = require('fs');

const rotas = require('./routes');

const server = express();
const router = express.Router()
server.use(express.json({extended: true}))

const SECRET = "jsonwebtoken"

function verifyWebToken(req, res, next){
    const token = req.headers['x-access-token']
    webtoken.verify(token, SECRET, (err, decoded)=>{
        if(err) return res.status(401).end()
        req.userid = decoded.userid
        next();
    })
}

//////////////////////////////

router.post('/users/login',(req, res)=>{
    const {usuario, senha} = req.body
    
    async function readUserFunction(){
        const result = await rotas.readUser({usuario, senha})
        
        if(result === 'token'){
            const token = webtoken.sign({userid:1},SECRET,{ expiresIn:3600 })
            return res.json({token})
        }
        res.send(result)
    }
    readUserFunction()
})

router.post('/users/create', (req, res)=>{ 
    const {usuario, senha} = req.body

    async function createUserFunc(){
        const result = await rotas.createUser({usuario, senha})
        if(result){
            return res.send(result)
        }
        res.status(401).end()
    }
    createUserFunc()
})

router.delete('/users/:user', verifyWebToken, (req, res)=>{
    const {user} = req.params

    async function deleteUserfunc(){
        const result = await rotas.deleteUser(user)
        res.send(result)
    }
    deleteUserfunc()
})

router.get('/users/clear', verifyWebToken, (req, res)=>{
    async function clearfunc(){
        const result = await rotas.clearAll()
        res.send(result)
    }
    clearfunc()
})

router.get('/users/allusers', verifyWebToken, (req, res)=>{

    async function allUsersfunc(){
        const result = await rotas.allUsers()
        res.json({result})
    }
    allUsersfunc()
})

//////////////////////////////

router.get('/itens', verifyWebToken, (req, res)=>{
    async function readFile(){
        const result = await rotas.readFile()
        res.send(result)
    }
    readFile()
})

router.get('/itens/searsh/:id', verifyWebToken, async (req, res)=>{
    const {id} = req.params
    async function searchFile(){
        const result = await rotas.searchID(id)
        res.send(result)
    }
    searchFile()
})

router.post('/itens', verifyWebToken, (req, res)=>{ 
    const data = req.body
    async function createItem(){
        const result = await rotas.create(data)
        res.send(result)
    }
    createItem()
})

router.put('/itens/:id', verifyWebToken, (req, res)=>{ 
    const data = req.body
    const {id} = req.params
    async function updateItem(){
        const result = await rotas.updateItem(id, data)
        res.send(result)
    }
    updateItem()
})

router.delete('/itens/:id', verifyWebToken, (req, res)=>{ 
    const {id} = req.params
    async function deleteItem(){
        const result = await rotas.deletar(id)
        res.send(result)
    }
    deleteItem()
})

//////////////////////////////

router.get('/',(req, res)=>{
    Fs.readFile('./src/main.html', null, function (error, data) {
        if (error) {
            res.writeHead(404);
            res.write('Whoops! File not found!');
        } else {
            res.write(data);
        }
        res.end();
    });
})

open('http://localhost:11213')
server.use(router)
server.listen(11213, ()=>{console.log('servidor online')})