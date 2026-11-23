var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const db = require('./config/db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/api/cadastros', async (req, res) => {
    try {
        let sql = `
            SELECT
                j.id_jogador,
            j.nome,
            j.posicao,
            j.preco,
            j.foto,
            n.nacionalidade,
            c.nome_clube
            FROM jogador j
            INNER JOIN nacional n
             ON j.id_nacional = n.id_nacional
            INNER JOIN clube c
            ON j.id_clube = c.id_clube
        WHERE 1=1
        `;
        

        const parametros = [];

        if (req.query.pesquisa) {
            sql += ` AND (j.nome LIKE ? OR j.posicao LIKE ?)`;

            parametros.push(
                '%' + req.query.pesquisa + '%',
                '%' + req.query.pesquisa + '%'
            );
        }

        sql += ' ORDER BY j.preco';

        const [rows] = await db.query(sql, parametros);

        res.json(rows);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            erro: 'Erro ao buscar registro: ' + err.message
        });
    }
});

app.post('/api/cadastros', async (req, res) => {
    try {
        const { nome, posicao, preco, id_nacional, id_clube } = req.body;

        const sql = `
            INSERT INTO jogador
            (nome,posicao,preco,id_nacional,id_clube)
            VALUES (?, ?, ?, ?, ?)
        `;

        const [resultado] = await db.query(sql, [
            nome,
            posicao,
            preco,
            id_nacional,
            id_clube
        ]);

        res.status(201).json({
            mensagem: 'Registrado com sucesso, ' + nome + '.',
            id_jogador: resultado.insertId
        });

    } catch (erro) {
        console.error('Erro ao registrar jogador:', erro);

        res.status(500).json({
            erro: 'Erro ao registrar jogador.'
        });
    }
});

app.put('/api/cadastros/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const { nome, posicao, preco, id_nacional, id_clube } = req.body;

        if (!nome || !posicao || preco == null || preco === '' || !id_nacional || !id_clube) {
            return res.status(400).json({
                erro: 'Preencha todos os campos.'
            });
        }

        const [resultado] = await db.query(
            `UPDATE jogador
             SET nome = ?,
                 posicao = ?,
                 preco = ?,
                 id_nacional = ?,
                 id_clube = ?
             WHERE id_jogador = ?`,
            [nome, posicao, preco, id_nacional, id_clube, id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                erro: 'Registro não encontrado.'
            });
        }

        res.json({
            mensagem: 'Registro atualizado com sucesso, ' + nome + '.'
        });

    } catch (erro) {
        console.error('Erro ao atualizar registro:', erro);

        res.status(500).json({
            erro: 'Erro ao atualizar registro.'
        });
    }
});

app.delete('/api/cadastros/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const [resultado] = await db.query(
            'DELETE FROM jogador WHERE id_jogador = ?',
            [id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                erro: 'Registro não encontrado.'
            });
        }

        res.json({
            mensagem: 'Registro deletado com sucesso (ID: ' + id + ').'
        });

    } catch (erro) {
        console.error('Erro ao deletar registro:', erro);

        res.status(500).json({
            erro: 'Erro ao deletar registro.'
        });
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;