var fs = require('fs');
var path = require('path');
const multer = require('multer');

const {check, body, validationResult} = require('express-validator');
const {Product, Categorie, Color, Condition, Size} = require('../database/models')//esto funciona porque al haber un index.js busca ese archivo


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

var admin = require("firebase-admin");

var serviceAccount = require('../path/to/e-commerce-d1475-firebase-adminsdk-2ilch-81584191f7.json');

const BUCKET = 'e-commerce-d1475.appspot.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET
});

const bucket = admin.storage().bucket();

const uploadImage = (req, res, next) => {
	if (!req.file) {
		return next();
	}
	const image = req.file
	const filename = Date.now() + "." + image.originalname.split('.').pop();

	file = bucket.file(filename);

	const stream = file.createWriteStream({
		metadata: {
			contentType: image.mimetype
		}
	});

	stream.on('error', (err) => {
		console.log(err);
	});

	stream.on('finish', async () => {
		//retornar archivo publico
		await file.makePublic();
		//obtener url publica
		req.body.image = `https://storage.googleapis.com/${BUCKET}/${filename}`;
		next();
	});

	stream.end(image.buffer);
}

module.exports = {
	// upload,

	all: async (req, res) => {
		try {
			const products = await Product.findAll({ where: { disponible: true } },{include:{all:true}})
			res.render('index', {products,toThousand})
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
					CategorieId:req.body.categorie_id,
					ConditionId:req.body.condition_id,
					ColorId:req.body.color_id,
					SizeId:req.body.size_id,
					image:req.body.image,
					disponible:true
				}
				// subir la imagen a firebase antes de guardar el producto
				uploadImage(req, res, async () => {
					// asignar la URL de la imagen a la propiedad de imagen del objeto info
					info.image = req.body.image;
					const newProduct = await Product.create(info);
					res.redirect('/products');
				});
			}else {
				res.render('product-create-form',{errors: resultado.errors,categories,conditions,colors,sizes});
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
		try {
		  const { id } = req.params;
		  const product = await Product.findByPk(id);
	  
		  if (!product) {
			return res.status(404).send("Producto no encontrado");
		  }
	  
		  // Actualiza el campo "disponible" a "false"
		  product.disponible = false;
		  await product.save();
	  
		  return res.status(204).redirect('/products');
		} catch (err) {
		  console.error(err);
		  return res.status(500).send("Error interno del servidor");
		}
	},

	categorie: async (req, res) => {
		try {
			const {id} = req.params;
			const products = await Product.findAll({ where: {
				CategorieId: id,
				disponible: true }
			})
			res.render('products', {products, toThousand})	
			
		} catch (error) {
			console.log(error);
		}
	}
};
