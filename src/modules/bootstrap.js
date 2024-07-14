import brandRouter from "./brand/brand.routes.js"
import categoryRouter from "./category/category.routes.js"
import subcategoryRouter from "./subCategory/subCategory.routes.js"
import userRouter from "./user/user.routes.js"
import { otpVerify } from './../middleware/verifyOTP.js';


export const bootstrap = (app) => { 
    app.use('/api/categories',categoryRouter)
    app.use('/api/subcategories',subcategoryRouter)
    app.use('/api/brands',brandRouter)
    app.use('/api/users',userRouter)
    app.post('/api/verify', otpVerify)
}