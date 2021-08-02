const webtoken = require('jsonwebtoken');
const express = require('express');
const Fs = require('fs');

const rotas = require('./routes');

const server = express();
const SECRET = "jsonwebtoken"
const router = express.Router()

server.use(express.json({extended: true}))

function verifyWebToken(req, res, next){
    const token = req.headers['x-access-token']
    webtoken.verify(token, SECRET, (err, decoded)=>{
        if(err) return res.status(401).end()
        req.userid = decoded.userid
        next();
    })
}

router.post('/login',(req, res)=>{
    const {usuario, senha} = req.body
    const result = rotas.readUser({usuario, senha})

    if(result){
        const token = webtoken.sign({userid:1},SECRET,{ expiresIn:3600 })
        return res.json({token})
    }
    res.status(401).end()
})

router.get('/itens', verifyWebToken, (req, res)=>{ 
    const result = rotas.readFile()
    res.send(result)
})

router.get('/itens/searsh/:id', verifyWebToken, async (req, res)=>{
    const {id} = req.params
    const result = await rotas.searshID(id)
    res.send(result)
})

router.post('/itens', verifyWebToken, (req, res)=>{ 
    const data = req.body
    const result = rotas.create(data)
    res.send(result)
})

router.put('/itens/:id', verifyWebToken, (req, res)=>{ 
    const data = req.body
    const {id} = req.params
    const result = rotas.atualizar(id, data )
    res.send(result)
})

router.delete('/itens/:id', verifyWebToken, (req, res)=>{ 
    const {id} = req.params
    const result = rotas.deletar(id)
    res.send(result)
})

server.use(router)
server.listen(3000, ()=>{console.log('servidor online')})