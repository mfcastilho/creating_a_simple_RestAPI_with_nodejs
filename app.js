//Criando servidor utilizando Express



//Importações
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const {v4:makeID} = require("uuid");


//Variáveis
const port = 4002;

//Banco de Dados fake
const dataBase = require("./data-base/dataBase.json");






//==== Middlewares =====
app.use(express.json());







app.post("/produtos/cadastrando", (req, res)=>{
  
  //Fazendo a desestruturação do req.body
  const {name, price}= req.body;

  
  //Novo produto
  const newProduct = {
    id:makeID(),
    name,
    price
  }

  //Inserindo o novo produto no dataBse.products
  dataBase.products.push(newProduct);


  //Convertendo para json e salvando em uma variável
  const dbJSON = JSON.stringify(dataBase);
  console.log(dbJSON);
  

  //Persistindo dados no banco de dados fake
  fs.writeFileSync(path.join("./data-base", "dataBase.json"),  dbJSON);


  return res.json(dbJSON);
});


app.get("/produtos", (req, res)=>{
  res.json(dataBase);
});






app.listen(port, ()=>{
  console.log(`Servidor está rodando na porta ${port}`);
})