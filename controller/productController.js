const db = require("../connection/Connection")

const getAllProducts = (req,res) => {
    db.query('SELECT * FROM product', (err,result) => {
        try {
            if(err) throw err

            res.status(200).send({
                result
            })
        } catch (error) {
            res.status(500).send({
                error: true,
                message: 'Failed to fetch products'
            })
        }
    })
}

const addProduct = (req,res) => {
    let newProduct = {
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock
    }
    
    try {
        if(!newProduct.name || !newProduct.category || !newProduct.description || !newProduct.price || !newProduct.stock) throw {message: 'All fields must be filled'}
    } catch (error) {
        res.status(402).send({
            error: true,
            error_message: error.message
        })
        return
    }
    console.log('newproduct', newProduct);

    db.query('INSERT INTO product SET?', newProduct, (err,result) => {
        try {
            if(err) throw err

            res.status(200).send({
                error: false,
                message: "Successfully add new data"
            })
        } catch (error) {
            res.status(500).send({
                error: true,
                message: 'Failed to insert data'
            })
        }
    })
}

const editProduct = (req,res) => {
    let idProduct = req.params.idProduct
    let editedProduct = {
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock
    }

    try {
        if(!editedProduct.name || !editedProduct.category || !editedProduct.description || !editedProduct.price || !editedProduct.stock) throw {message: 'All fields must be filled'}
    } catch (error) {
        res.status(402).send({
            error: true,
            error_message: error.message
        })
        return
    }
    console.log('editedProduct', editedProduct);
    console.log('idProduct:', idProduct);

    db.query('SELECT * FROM product WHERE id=?', idProduct, (err,result) => {
        try {
            if(err) throw err

            if(result.length === 0){
                res.status(200).send({
                    error: false,
                    message: `Product with id ${idProduct} not found`
                })
            }else{
                // edit
                db.query('UPDATE product SET? where id=?', [editedProduct, idProduct], (err, result) => {
                    try {
                        if(err) throw err

                        res.status(200).send({
                            error: false,
                            message: 'Successfully edit data'
                        })
                    } catch (error) {
                        res.status(500).send({
                            error: true,
                            message: 'Failed to edit data'
                        })
                    }
                })
            }
        } catch (error) {
            res.status(500).send({
                error: true,
                error_message: error.message
            })
        }
    })
}

const deleteProduct = (req,res) => {
    let idProduct = req.params.idProduct

    db.query('SELECT * FROM product where id=?', idProduct, (err,result) => {
        try {
            if(err) throw err

            if(result.length === 0){
                res.status(200).send({
                    error: false,
                    message: `Product with id ${idProduct} not found`
                })
            }else{
                // delete product
                db.query('DELETE FROM product WHERE id=?', idProduct, (err,result) => {
                    try {
                        if(err) throw err
                        
                        res.status(200).send({
                            error: false,
                            message: 'Successfully delete data'
                        })
                    } catch (error) {
                        res.status(500).send({
                            error: true,
                            message: 'Failed to delete data'
                        })
                    }
                })
            }
        } catch (error) {
            res.status(500).send({
                error: true,
                error_message: error.message
            })
        }
    })
}

module.exports = {
    getAllProducts: getAllProducts,
    addProduct: addProduct,
    editProduct: editProduct,
    deleteProduct: deleteProduct
}