import brandRouter from "./brand/brand.routes.js"
import categoryRouter from "./category/category.routes.js"
import subcategoryRouter from "./subCategory/subCategory.routes.js"


export const bootstrap = (app) => { 
    app.use('/api/categories',categoryRouter)
    app.use('/api/subcategories',subcategoryRouter)
    app.use('/api/brands',brandRouter)
}