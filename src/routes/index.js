const UserRouter = require('./UserRouter')
const AccountTypeRouter = require('./AccountTypeRouter');

const routes = (app)=>{
    app.use('/api/user',UserRouter)
    app.use('/api/account-type', AccountTypeRouter); // Thêm router cho AccountType
}

module.exports = routes
