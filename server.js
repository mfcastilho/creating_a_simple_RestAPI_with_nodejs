//Criando servidor com módulo nativo HTTP do nodejs


const http = require("http");


http.createServer((req, res)=>{
  res.writeHead(200, {"Content-Type": "application/json"});

  if(req.url === "/produto"){
    res.end(JSON.stringify({
      message:"Rota de produto"
    }));
  }
    
  if(req.url === "/usuarios"){
    res.end(JSON.stringify({
      message: "Rota de usuário"
    }));
  }
    
    res.end(JSON.stringify({
      message: "Hello World!"
    }));

    // res.end("Hello World");
  }).listen(4200, ()=> console.log("Servidor está rodando na porta 4200!"));