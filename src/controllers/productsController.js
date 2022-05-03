const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));




module.exports = {
	index: (req, res) => {
		res.render('products', {products});
	},
    create: (req, res) => {
		res.render('product-create-form');
	},
    edit: (req, res) => {
		res.render('product-edit-form');
	},
    detail: (req, res) => {

		for (let i = 0; i < products.length; i++) {
			if (products[i].id == req.params.id) {
				producto_encontrado = products[i];
			}
		}
		res.render('detail', {producto_encontrado});
		
	},
};