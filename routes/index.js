var express = require('express');
var router = express.Router();
var express = require('express');
var router = express.Router();
const db = require('../config/db');
/* GET home page. */
router.get(['/', '/itens', '/fibbauru'], async (req, res, next) => {
    try {
        const pesquisa = req.query.pesquisa || '';

        let sql = `
            SELECT
               j.id_jogador,
                j.nome ,
                j.posicao,
                j.preco,
                j.id_nacional ,
                j.id_clube,
                j.foto,
                n.nacionalidade,
                c.nome_clube
            FROM jogador j, nacional n, clube c
            WHERE  j.id_nacional = n.id_nacional AND j.id_clube = c.id_clube
        `;

        const parametros = [];

        if (pesquisa) {
            sql += ` AND (j.nome LIKE ? OR j.posicao LIKE ?)`;

            parametros.push(
                '%' + pesquisa + '%',
                '%' + pesquisa + '%'
            );
        }

        sql += ' ORDER BY j.preco';

        const [registros] = await db.query(sql, parametros);

        res.render('index', {
        registros,
        jogadores: registros,
         pesquisa,
        cadastrado: req.query.cadastrado === '1'
        });

    } catch (erro) {
        next(erro);
    }
});

router.post('/itens', async (req, res, next) => {
    try {
        const { nome, posicao, preco, id_nacional, id_clube,foto } = req.body;

        const sql = `
            INSERT INTO jogador
            (nome, posicao, preco, id_nacional, id_clube,foto)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        await db.query(sql, [
            nome,
            posicao,
            preco,
            id_nacional,
            id_clube,
            foto
        ]);

        res.redirect(303, '/?cadastrado=1');

    } catch (erro) {
        next(erro);
    }
});

module.exports = router;
