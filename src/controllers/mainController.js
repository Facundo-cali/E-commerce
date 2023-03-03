const fs = require('fs');
const path = require('path');

const {Product} = require('../database/models')//esto funciona porque al haber un index.js busca ese archivo

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    index: async (req, res) => {
		try {
			const products = await Product.findAll({ where: { disponible: true } },{include:{all:true}})
			res.render('index', {products,toThousand})
		} catch (error) {
			console.log(error);
		}
	}
}