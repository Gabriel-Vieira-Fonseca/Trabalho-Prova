const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'public/images/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get('/', async (req, res, next) => {
  try {
    const q = (req.query.q || '').trim();
    const like = `%${q}%`;
    const [jogadores] = q
      ? await pool.query(`SELECT * FROM jogadores WHERE nome LIKE ? OR posicao LIKE ?
                          OR nacionalidade LIKE ? OR clube LIKE ? ORDER BY id`, [like, like, like, like])
      : await pool.query('SELECT * FROM jogadores ORDER BY id');
    const [todos] = await pool.query('SELECT * FROM jogadores ORDER BY nome');
    res.render('index', { jogadores, todos, q });
  } catch (e) { next(e); }
});

router.post('/jogadores', upload.single('foto'), async (req, res, next) => {
  try {
    const b = req.body || {};
    await pool.query(
      'INSERT INTO jogadores (foto,nome,posicao,preco,nacionalidade,clube) VALUES (?,?,?,?,?,?)',
      [
        req.file ? `/images/${req.file.filename}` : null,
        (b.nome || '').trim(),
        b.posicao,
        Number(b.preco) || 0,
        (b.nacionalidade || '').trim() || null,
        (b.clube || '').trim() || null
      ]
    );
    res.redirect('/');
  } catch (e) { next(e); }
});

router.post('/jogadores/:id/editar', upload.single('foto'), async (req, res, next) => {
  try {
    const b = req.body || {};
    const fotoFinal = req.file ? `/images/${req.file.filename}` : (b.fotoAtual || null);
    await pool.query(
      'UPDATE jogadores SET foto=?,nome=?,posicao=?,preco=?,nacionalidade=?,clube=? WHERE id=?',
      [
        fotoFinal,
        (b.nome || '').trim(),
        b.posicao,
        Number(b.preco) || 0,
        (b.nacionalidade || '').trim() || null,
        (b.clube || '').trim() || null,
        req.params.id
      ]
    );
    res.redirect('/');
  } catch (e) { next(e); }
});

router.post('/jogadores/:id/deletar', async (req, res, next) => {
  try {
    await pool.query('DELETE FROM jogadores WHERE id=?', [req.params.id]);
    res.redirect('/');
  } catch (e) { next(e); }
});

module.exports = router;