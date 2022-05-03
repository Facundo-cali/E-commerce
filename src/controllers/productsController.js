module.exports = {
    create: (req, res) => {
		res.render('product-create-form');
	},
    edit: (req, res) => {
		res.render('product-edit-form');
	},
    detail: (req, res) => {
		res.render('detail');
	}
};