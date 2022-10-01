import connection from "../db/db.js";


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

export { insertCustomer }