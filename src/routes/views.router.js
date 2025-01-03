import { Router} from "express";

const router = Router();

router.get("/",(req,res)=>{
    res.render("index");
})

//ejemplo ejercicio para la siguiuente pre entrega
//importas el product manager
//creas una instancia
//usas el metodo "getproducts"




router.get("/", async(req,res)=>{
    try {
        const productos = await LockManager.getProduct();
        res.render("home", {productos})
        
    } catch (error) {
        res.status(500).send("Error fatal")
        
    }

})



export default router;

