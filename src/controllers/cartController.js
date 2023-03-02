const path = require('path');
const {validationResult} = require('express-validator'); 

const {Product, Cart, Item, User} = require('../database/models');

module.exports = {
    addCart: async (req,res) => {
        try {
            const errores = validationResult(req)
            console.log(errores);
            if (errores.isEmpty()) {
                let product = await Product.findByPk(req.body.productId, {include:{all:true}})
                console.log(product);
                let price = Number(product.price);
                Item.create({
                    salePrice:price,
                    quantity:req.body.cantidad,
                    subtotal: price * req.body.cantidad,
                    state: 1,
                    UserId:req.session.usuario.id,
                    ProductId:req.body.productId,
                    CartId:null
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
                    UserId: req.session.usuario.id,
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
                    ProductId: req.body.itemId,
                    UserId: req.session.usuario.id,
                    quantity: req.body.quantity
                }
            })
            res.redirect('/cart/cart');
        } catch (error) {
            console.log(error);
        }
    },

    buy: async (req,res) => {
        try {
            let items = await Item.findAll({
                where: {
                    UserId: req.session.usuario.id,
                    state: 1
                }
            })
            const random = (deepness = 10) => parseInt(Date.now() + Math.random()*deepness);
              
            let total = items.reduce((total, item) => (total = total + Number(item.subtotal)),0)
            let cart = await Cart.create({
                orderNumber: random(),
                UserId: req.session.usuario.id,
                total:total
            })
            await Item.update({
                state: 0,
                CartId:cart.id
            },{
                where: { 
                    UserId:  req.session.usuario.id,
                    state: 1
                }
            })
            res.redirect('/products')
        } catch (error) {
            console.log(error);
        }
    },

    bought: async (req,res) => {
        try {
            let items = await Item.findAll({
                where: {
                    UserId: req.session.usuario.id,
                    state: 0
                },
                include: {
                    all: true,
                    nested: true
                }
            })
            res.render('bought', {cartProducto: items})
        } catch (error) {
            console.log(error);
        }
    }

}