//import pg from "pg";
import connection from "../db/db.js";

async function listCategories(req, res){

    try {
        const queryCategories = await connection.query('SELECT * FROM categories;');
        return res.send(queryCategories.rows);
    } catch (error) {
        console.log(error);
        return res.send(500).send("Não foi possível listar as categorias");
        
    }

}

async function insertCategories(req, res){
const { name }  = req.body;
console.log(name)
    try {
        await connection.query('INSERT INTO categories (name) VALUES ($1)', [name]);
        return res.sendStatus(201); 

    } catch (error) {
        console.log(error);
        return res.status(500).send("Não foi possível incluir a categoria");        
    }
}

export {listCategories, insertCategories}