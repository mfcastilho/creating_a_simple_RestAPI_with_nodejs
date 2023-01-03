//==========Criando servidor utilizando Express==========



//Importações
const express = require("express");
const { get } = require("express/lib/response");
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





//==== Rotas =====

//Rota da página Home
app.get("/", (req, res)=>{
  res.send("Página Home");
});


//Rota da página de produtos
app.get("/produtos", (req, res)=>{
  res.json(dataBase);
});


//Rota para retornar um produto
app.get("/produtos/produto/:id", (req, res)=>{

  const {id} = req.params;
  const product = dataBase.products.find(product=>product.id == id);
  if(product == undefined){
    return res.send("Produto não encontrado!");
  }
  return res.json(product);
});



//Rota para cadastrar um produto
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
  fs.writeFileSync(path.join(__dirname, "dataBase.json"),  dbJSON);

  return res.json(dbJSON);
});


app.put("/produtos/produto/:id/editar", (req, res)=>{

  const {id} = req.params;
  const {name, price} = req.body;

  
  const index = dataBase.products.findIndex(product=>product.id == id);
  const product = dataBase.products.find(product=>product.id == id);

  if(product == undefined){
    return res.send("Produto não encontrado!");
  }

  const updateProduct = {
    id,
    name,
    price
  }

  //Atualizando as infosd do produto no dataBase.products
  dataBase.products.splice(index, 1, updateProduct);

  //Convertendo para json e salvando em uma variável
  const dbJSON = JSON.stringify(dataBase);

  //Persistindo dados no banco de dados fake
  fs.writeFileSync(path.resolve("data-base", "dataBase.json"), dbJSON);

  return res.json(dbJSON);
});







app.listen(port, ()=>{
  console.log(`Servidor está rodando na porta ${port}`);
})