const routes = require('express').Router();

/* 
    @mesmo que o servidor não forneça nenhum conteúdo HTML, 
    @precisaremos de uma rota muito simples para ouvir qualquer 
    @conexão de entrada.
*/

routes.get('/test', async (req, res) => {
    return res.send({ mensagem: "Tudo numa boa ." }).status(200);
});


module.exports = routes;


