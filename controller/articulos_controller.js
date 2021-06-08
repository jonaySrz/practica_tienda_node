var Articulo = require('../models/articulos');
var mongoose = require('mongoose')
var fs = require('fs')



var articulos_controller = {};

articulos_controller.list = async function(req,res) {

    let count = await Articulo.find({}).countDocuments().exec();

    let pagina = parseInt(req.body.pagina)

    let skipy;

    if(pagina == 1){
        skipy = 0;
    }

    if (pagina > 1){
        skipy = (pagina - 1)*10;
    }

    let familias = await Articulo.find({}).distinct('familia').exec();

    Articulo.find().sort({familia: 1, descripcion: 1}).skip(skipy).limit(10).exec(function(err,articulos){

        if(err) {console.log('Error al listar Articulos:',err);return;}

        res.render('../views/index', {articulos: articulos, familias: familias, paginas: Math.ceil(count/10)});
    });
};

articulos_controller.filtrado = async function(req,res) {
    console.log(req.body);

    if (req.body.filtro == 'todos'){
        let count = await Articulo.find({}).countDocuments().exec();

        let pagina = parseInt(req.body.pagina)

        let skipy;

        if(pagina == 1){
            skipy = 0;
        }

        if (pagina > 1){
            skipy = (pagina - 1)*10;
        }

        let familias = await Articulo.find({}).distinct('familia').exec();

        Articulo.find().sort({familia: 1, descripcion: 1}).skip(skipy).limit(10).exec(function(err,articulos){

        if(err) {console.log('Error al listar Articulos:',err);return;}

        res.render('../views/index', {articulos: articulos, familias: familias, paginas: Math.ceil(count/10), pagina: pagina});
        });
    }
    else {
        let count = await Articulo.find({familia : [req.body.filtro]}).countDocuments().exec();

        let pagina = parseInt(req.body.pagina)

        let skipy;

        if(pagina == 1){
            skipy = 0;
        }

        if (pagina > 1){
            skipy = (pagina - 1)*10;
        }

        let familias = await Articulo.find({}).distinct('familia').exec();

        Articulo.find({familia : [req.body.filtro]}).sort({familia: 1, descripcion: 1}).exec(function(err,articulos){

        if(err) {console.log('Error al listar Articulos:',err);return;}

        res.render('../views/index', {articulos: articulos, familias: familias, option: req.body.filtro, paginas: Math.ceil(count/10), pagina: pagina});
        });
    }    
};

articulos_controller.show = async function(req, res){
    if (req.params.id){
        let id = req.params.id

        let articulo = await Articulo.findOne({_id : [id]}).exec()

        res.render('../views/show', {articulo: articulo});
    }
    
    else {
        let count = await Articulo.findOne({}).sort({codigo :-1}).exec();

        let code = parseInt(count.codigo)+1

        res.render('../views/show', {code: code});
    }
}

articulos_controller.guardar = function(req, res){
    console.log('body:',req.body);

    if(req.body.proceso == 'editar'){
        Articulo.findByIdAndUpdate(req.body._id,{$set: {
            codigo : req.body.codigo,
            descripcion: req.body.descripcion,
            familia : req.body.familia,
            impuesto : req.body.impuesto,
            precio: req.body.precio,
            stock: req.body.stock
        }},
        {new: false, runValidators: true},

        (err, done)=>{

            if (err){
                console.log('ERROR: ',err);
            }

            else {

                if (fs.existsSync(`public/temp/${req.body.codigo}.jpg`)){
                    fs.rename(`public/temp/${req.body.codigo}.jpg`, `public/articulos/${req.body.codigo}.jpg`, function (err) {
                        if (err) throw err;
                        console.log('File Renamed!');
                    });
                }

                res.redirect('/')
            }
        })
    }

    if(req.body.proceso == 'crear'){
        let articulo_nuevo = new Articulo(req.body)

        articulo_nuevo._id = mongoose.Types.ObjectId();

        articulo_nuevo.save((err)=>{
            if (err){
                console.log(err);

                fs.unlink(`public/temp/${req.body.codigo}.jpg`, (err) => {
                    if (err) {
                    console.error(err)
                    return
                    }
                
                    console.error('file removed')
                })
            }
            else {

                if (fs.existsSync(`public/temp/${req.body.codigo}.jpg`)){
                    fs.rename(`public/temp/${req.body.codigo}.jpg`, `public/articulos/${req.body.codigo}.jpg`, function (err) {
                        if (err) throw err;
                        console.log('File Renamed!');
                    });
                }

                res.redirect('/')
            }
        })
    }
}

articulos_controller.borrar = function(req,res) {
    
    Articulo.deleteOne({codigo:[req.body.dato]}).exec(function(err,done){
        if(err) {console.log('Error al borrar:',err);return;}
        
        fs.unlink(`public/articulos/${req.body.dato}.jpg`, (err) => {
            if (err) {
            console.error(err)
            return
            }
        
            console.error('file removed')
        })
        res.redirect('/');
    });
};

module.exports = articulos_controller;