const Order = require('../Models/orders.model');

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate('customer', 'name email').populate('items.product', 'name price');
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
};

exports.getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('customer', 'name email').populate('items.product', 'name price');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
};

exports.createOrder = async (req, res, next) => {
    try {
        const order = new Order({
            customer: req.body.customer,
            items: req.body.items,
            total: req.body.total,
            status: req.body.status,
        });
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        next(err);
    }
};

exports.updateOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.customer = req.body.customer;
        order.items = req.body.items;
        order.total = req.body.total;
        order.status = req.body.status;
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } catch (err) {
        next(err);
    }
};

exports.deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // await order.remove();
        res.status(200)
    }
    catch(err) {
        next(err)
    }
};