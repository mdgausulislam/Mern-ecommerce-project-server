const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors')


const AuthRouter = require("./src/routes/authRoutes");
const categoryRouter = require("./src/routes/categoryRoutes");
const adminRouter = require("./src/routes/admin/adminAuthRoutes");
const productRouter = require("./src/routes/productsRoutes");
const cartRouter = require("./src/routes/cartRoutes");
const initialDataRouter = require("./src/routes/admin/initialData");
const pageRouter = require("./src/routes/admin/pageAdminRoutes");
const addressRouter = require("./src/routes/addressRoutes");
const orderRouter = require("./src/routes/orderRoutes");
const orderAdminRouter = require("./src/routes/admin/orderRoutes");
// Environment setup
env.config();


// Connect to MongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.yrorxmn.mongodb.net/${process.env.MONGODB_DATABASE_URL}?retryWrites=true&w=majority`)
    .then(() => console.log('Database connected!'))
    .catch((err) => console.error('Database connection error:', err));



// Middleware to parse incoming request bodies
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use(express.urlencoded({ extended: true }));
app.use(cors());



//routes
app.use('/api', AuthRouter);
app.use('/api', adminRouter);
app.use('/api', categoryRouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use('/api', initialDataRouter);
app.use('/api', pageRouter);
app.use('/api', addressRouter);
app.use('/api', orderRouter);
app.use('/api', orderAdminRouter);




app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Server is Working"
    });
});



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`MERN e-commerce project server port: ${port}`);
});
