const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


let guardar = (products)=>{fs.writeFileSync(path.join(__dirname, "../data/productsDataBase.json"),JSON.stringify(products, null, " "),"utf-8");
console.log(products);}	


module.exports = {
	index: (req, res) => {
		res.render('products', {products});
	},
    create: (req, res) => {
		res.render('product-create-form');
	},
	store: (req, res) => {
		const {name,price,discount,category,description} = req.body// Do the magic
		let newProduct = {
			id:products[products.length-1].id+1,    //busco el ultimo elemento del array y le sumo 1;
			name:name,
			price:price,                              //Tambien se puede hacer let NewProduct = { id:17, ...req}(...req toma todas las propiedades)
			discount:discount,
			category:category,
			description:description
		};
		
		products.push(newProduct);
		guardar(products);
		res.redirect('/');
	},
    edit: (req, res) => {
		for (let i = 0; i < products.length; i++) {
			if (products[i].id == req.params.id) {
				producto_encontrado = products[i];
			}
		}
		res.render('product-edit-form', {producto_encontrado});
	},
    detail: (req, res) => {

		for (let i = 0; i < products.length; i++) {
			if (products[i].id == req.params.id) {
				producto_encontrado = products[i];
			}
		}
		res.render('detail', {producto_encontrado});
		
	},

	destroy : (req, res) => {
		for (let i = 0; i < products.length; i++) {
			if (products[i].id == req.params.id) {
				producto_encontrado = products[i];
			}
		}
		
		products.splice(producto_encontrado-1,1);
		guardar(products);
		res.redirect('/');
	}
};