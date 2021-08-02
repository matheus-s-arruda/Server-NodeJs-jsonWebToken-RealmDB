const Fs = require('fs')

///////// USERS /////////

exports.readUser = ({usuario, senha})=>{
    const data = Fs.readFileSync('./data/users.json','utf-8')
    const users = JSON.parse(data)

    for(const user of users){
        if((user.usuario == usuario)&&(user.senha == senha)){ 
            return 'token'
        }
    }
    return null
}

writeUser = (currentFile)=>{
    const data = JSON.stringify(currentFile)
    Fs.writeFileSync('./data/users.json', data, 'utf-8')
}

exports.createUser = (data)=>{
    const current = this.readUser()
    current.push(data)
    writeUser(current)
}

exports.deleteUser = (usuario)=>{
    const data = this.readUser()
    const index = data.findIndex((item)=>item.usuario === usuario)
    data.splice(index,1)
    writeUser(data)
    return data
}

///////// FILES /////////

exports.readFile = ()=>{
    const data = Fs.readFileSync('./data/data.json','utf-8')
    return JSON.parse(data)
}

writeFile = (currentFile)=>{
    const data = JSON.stringify(currentFile)
    Fs.writeFileSync('./data/data.json', data, 'utf-8')
}

exports.create = (data)=>{
    const currentFile = this.readFile()
    currentFile.push(data)
    writeFile(currentFile)
    return data
}

exports.atualizar = (id, newData )=>{
    const data = this.readFile()
    const index = data.findIndex((item)=>item.id === id)
    
    data[index] = newData
    writeFile(data)
    return newData
}

exports.deletar = (id)=>{
    const data = this.readFile()
    const index = data.findIndex((item)=>item.id === id)
    const item = data[index]
    
    data.splice(index,1)
    writeFile(data)
    return item
}

exports.searshID = async (id)=>{
    const data = this.readFile()
    const result = await data.filter((item)=>item.id === id)

    if(result.length){ return result }
    return null
}