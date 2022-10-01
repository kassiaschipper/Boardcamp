import connection from "../db/db.js";

async function listCustomers (req, res){
const { cpf } = req.query;

    try {

        if (cpf) {
            const queryCustomers = (
              await connection.query(
                `SELECT * FROM customers WHERE customers.cpf ILIKE '${cpf}%' ;`
              )
            ).rows;
            return res.send(queryCustomers);
          }
        const queryCustomers = (
            await connection.query(
              'SELECT * FROM customers;'
            )
          ).rows;
          return res.send(queryCustomers);
    } catch (error) {
        console.log(error);
        return res.send(500);
    }

}

async function listCustomersById (req, res){
const id = req.params.id;

try {
    const cutomersIds = (await connection.query('SELECT * FROM customers;')).rows; 
    const isValid = cutomersIds.find(elemet => elemet.id === id);
    
    if(isValid !== undefined){
        return res.sendStatus(404);
    }

    const customerById = (await connection.query(`SELECT * FROM customers WHERE customers.id=$1;`,[id])).rows;
    
    return res.send(customerById);
} catch (error) {
    console.log(error);
    return res.sendStatus(500);
}


}



async function insertCustomer (req, res){
const { name, phone, cpf, birthday } = req.body;

try {
    //verifica se o cpf e phone contém somente números
     if(isNaN(cpf) || isNaN(phone)){ //Se true as strings não contém somente números 
        return res.sendStatus(400);
     }   
     //Procura por cpfs iguais
     const getCPF = (await connection.query("SELECT cpf FROM customers;")).rows;
     const findCpf = getCPF.find((customers) => customers.cpf === cpf);
     if (findCpf !== undefined) {
       return res.sendStatus(409);
     }

    const queryCustomer = await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);',[name, phone, cpf, birthday ]);
    
    return res.sendStatus(201);

} catch (error) {
    console.log(error);
    res.sendStatus(500);
}

}

export { insertCustomer, listCustomers, listCustomersById }