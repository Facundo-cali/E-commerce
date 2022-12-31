var fs = require('fs');
var path = require('path');
const multer = require('multer');

const {check, body, validationResult} = require('express-validator');
const {Product, Categorie, Color, Condition, Size} = require('../database/models')//esto funciona porque al haber un index.js busca ese archivo


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//subir imagen
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,'../../public/images'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ 
    storage: storage,
    limits: { fileSize: '10000000'},
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

		if (mimeType && extname) {
			return cb(null, true)
		}
		cb('Dar el formato de archivos adecuado para cargar')
    }
}).single('image')

module.exports = {
	upload,

	all: async (req, res) => {
		try {
			const products = await Product.findAll({include:{all:true}})
			res.render('index', {products,toThousand})
			// res.json(products)
		} catch (error) {
			console.log(error);
		}
	},

	detail: async(req,res) =>{
		try {
			const productId = req.params.id;
			const products = await Product.findAll({include:{all:true}});
			const categorie = await Categorie.findAll();
			const color = await Color.findAll();
			const condition = await Condition.findAll();
			const size = await Size.findAll();
			const producto_encontrado = await Product.findByPk(productId);
			res.render('detail', {products, producto_encontrado, categorie, color, condition, size, toThousand})
			
		} catch (error) {
			console.log(error);	
		}
    },
	
    create: async (req, res) => {
		const categories = await Categorie.findAll();
		const conditions = await Condition.findAll();
		const colors = await Color.findAll();
		const sizes = await Size.findAll();

		res.render('product-create-form',{categories,conditions,colors,sizes});
	},

	store: async (req, res) => {
		try {
			const categories = await Categorie.findAll();
			const conditions = await Condition.findAll();
			const colors = await Color.findAll();
			const sizes = await Size.findAll();
			const resultado = validationResult(req);
			if(resultado.isEmpty()){
				let info = {
					name: req.body.name,
					price:req.body.price,        //Tambien se puede hacer let NewProduct = { id:17, ...req}(...req toma todas las propiedades)
					amount:req.body.amount,
					categorie_id:req.body.categorie_id,
					condition_id:req.body.condition_id,
					color_id:req.body.color_id,
					size_id:req.body.size_id,
					image:req.file.filename
				}
				const newProduct = await Product.create(info)
				res.redirect('/products');	
				console.log(newProduct);
			}else {
				res.render('product-create-form',{errors: resultado.errors,categories,conditions,colors,sizes});
				//Esto hace que si salta algun error (ej no poner titulo), la imagen que se sube no se suba
				const direc = path.join(__dirname,'../../public/images');
				let file = req.file.filename
				let pathh = String(`${direc}/${file}`);
				fs.unlink(pathh, (err => {
					if (err) console.log(err);
				}));
			}
		} catch (error) {
			console.log(error);
		}
	},

    edit: async (req, res) => {
		const categories = await Categorie.findAll();
		const conditions = await Condition.findAll();
		const colors = await Color.findAll();
		const sizes = await Size.findAll();
		const productId = req.params.id;
		const producto_encontrado = await Product.findByPk(productId)
		res.render('product-edit-form', {producto_encontrado,categories,conditions,colors,sizes});
	},


	change: async (req,res)=>{
		const productId = req.params.id;
		const changedProduct = await Product.findByPk(productId)
		await changedProduct.update(req.body)
		
		res.redirect('/products');
	},

	destroy: async (req, res) => {
		const productId = req.params.id;
		const toDelete = await Product.findByPk(productId)
		await toDelete.destroy();
		res.redirect('/products');
	}
	
};
