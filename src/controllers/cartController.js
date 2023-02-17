const path = require('path');
const {validationResult} = require('express-validator'); 

const {Product, Cart, Item, User} = require('../database/models');

module.exports = {
    addCart: async (req,res) => {
        try {
            const errores = validationResult(req)
            if (errores.isEmpty()) {
                let product = await Product.findByPk(req.body.productId, {include:{all:true}})
                let price = Number(product.price);
                Item.create({
                    sale_price:price,
                    quantity:req.body.cantidad,
                    subtotal: price * req.body.cantidad,
                    state: 1,
                    userId:req.session.usuario.id,
                    productId:req.body.productId,
                    cartId:null
                })
                res.redirect('/')
            } else {
                console.log('error');
            }
            
        } catch (error) {
            console.log(error);
        }
    },

    cart: async (req,res) => {
        try {
            let items = await Item.findAll({
                where: {
                    userId: req.session.usuario.id,
                    state: 1
                },
                include: {
                    all: true,
                    nested: true
                }
            })
            let total = items.reduce((total, item) => (total = total + Number(item.subtotal)),0)
            res.render('cart', {cartProducto: items,total})
            
        }catch (error) {
            console.log(error);
        }
    },

    deleteCart: async (req,res) => {
        try {
            await Item.destroy({
                where: {
                    productId: req.body.itemId,
                    userId: req.session.usuario.id,
                    quantity: req.body.quantity
                }
            })
            res.redirect('/cart/cart');
        } catch (error) {
            console.log(error);
        }

        
    }

}