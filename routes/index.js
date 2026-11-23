var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
    try {
        const [alunos] = await db.query('SELECT * FROM aluno');

        res.render('index', {
            alunos: alunos
        });

    } catch (erro) {
        console.log(erro);
        res.status(500).send('Erro ao buscar alunos');
    }
});

module.exports = router;
