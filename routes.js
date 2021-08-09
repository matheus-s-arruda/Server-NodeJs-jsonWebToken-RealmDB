const realmDB = require('./realm')

//////////// USERS ////////////

exports.createUser = async ({usuario, senha})=>{
    try {
        const realm = await realmDB()
        realm.write(() => {
            realm.create(
                "users", 
                { 
                    usuario: usuario,
                    password: senha,
                }
            )
        })
        return 'created'
    } catch (error) {
        console.log(error)
        return 
    }
}

exports.readUser = async ({usuario, senha})=>{
    try {
        const realm = await realmDB()
        const user = realm.objectForPrimaryKey("users", usuario)
        
        if(user){
            if(user.password === senha){
                return 'token'
            }
        }
        return 'not found'
    } catch (error) {
        console.log(error)
        return 'error'
    }
}

exports.deleteUser = async (usuario)=>{
    try {
        const realm = await realmDB()
        realm.write(() => {
            var user = realm.objectForPrimaryKey("users", usuario)
            realm.delete(user)
            user = null
        })
        return `${usuario} deleted`
    } catch (error) {
        console.log(error)
        return 'error'
    }
    return usuario
}

exports.allUsers = async ()=>{
    try {
        const realm = await realmDB()
        const users = realm.objects('users')

        return users    

    } catch (error) {
        console.log(error)
        return 'error'
    }
}

exports.clearAll = async ()=>{
    try {
        const realm = await realmDB()
        realm.write(()=>{
            realm.deleteAll()
        })
        return 'clear'        
    } catch (error) {
        console.log(error)
        return 'error'
    }
}

//////////// FILES ////////////

exports.readFile = async () => {
    try {
        const realm = await realmDB()
        const itens = realm.objects("estoque")
        return itens

    } catch (error) {
        console.log(error)
        return 'error'
    }
}

exports.searchID = async (id)=>{
    try {
        const realm = await realmDB()
        const result = realm.objectForPrimaryKey("estoque", id)
        if(result){
            return result
        }
        return
    } catch (error) {
        console.log(error)
        return 'error'
    }
}

exports.create = async (data)=>{
    try {
        const realm = await realmDB()
        const result = realm.objectForPrimaryKey("estoque", data.id)
        if(result){
            return 'registered item'
        }
        realm.write(() => {
            realm.create('estoque', data)
        })
        return data
    } catch (error) {
        console.log(error)
        return 'error'
    }
}

exports.updateItem = async (id, newData )=>{
    try {
        const realm = await realmDB()
        const result = realm.objectForPrimaryKey("estoque", id)
        if(!result){
            return 'item not found'
        }
        realm.write(()=>{
            result.nome = newData.nome 
            result.preco = newData.preco
            result.val = newData.val
            result.tags = newData.tags
            result.quant = newData.quant
            result.update = newData.update
        })
        return 'update completed'
    } catch (error) {
        console.log(error)
        return 'error'
    }
}

exports.deletar = async (id)=>{
    try {
        const realm = await realmDB()
        realm.write(()=>{
            var item = realm.objectForPrimaryKey("estoque", id)
            realm.delete(item)
        })
        return `${id} deleted`
    } catch (error) {
        console.log(error)
        return 'error'
    }
    return item
}
