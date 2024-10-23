const UserRouter = require('./UserRouter')
const AccountTypeRouter = require('./AccountTypeRouter');
const typeProRouter = require('./TypeProRouter');
const productsRouter = require('./ProductsRouter');
const voucherRouter = require('./VoucherRouter');
const categoryRouter = require('./CategoryRouter');
const CusRouter = require('./CusRouter'); // Import CusRouter
const AdminRouter = require('./AdminRouter'); 

const routes = (app)=>{
    app.use('/api/user',UserRouter) //user = account
    app.use('/api/account-type', AccountTypeRouter); // Thêm router cho AccountType
    app.use('/api/typepro', typeProRouter);
    app.use('/api/products', productsRouter);
    app.use('/api/vouchers', voucherRouter);
    app.use('/api/categories', categoryRouter);
    app.use('/api/customers', CusRouter);
    app.use('/api/admins', AdminRouter);
}

module.exports = routes
