const Realm = require("realm");

const users = {
    name: "users",
    properties: {
      usuario: "string",
      password: "string",
    },
    primaryKey: "usuario",
}

const estoque = {
    name: "estoque",
    properties: {
        id: "string",
        nome: 'string',
        preco: "string",
        quant: "int",
        tags: 'string',
        val: 'string',
        create: 'string',
        update: 'string',
    },
    primaryKey: "id",
}

function realmDB(){
    return Realm.open(
        {
            path:"myrealm" ,
            schema: [users, estoque],
        }
    )
}

module.exports = realmDB;