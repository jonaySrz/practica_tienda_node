var express = require('express');
var router = express.Router();
var upload = require('../multer')

var controller = require('../controller/articulos_controller')

/* GET home page. */
router.get('/', controller.list);

// POST home page con filtro
router.post('/filtrado', controller.filtrado);

router.get('/show/:id', controller.show)
router.get('/show', controller.show)

router.post('/guardar', upload.single('imagen_fichero'), controller.guardar)

router.post('/borrar', controller.borrar)

module.exports = router;
