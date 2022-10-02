import connection from "../db/db.js";

async function listCustomers(req, res) {
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
    const queryCustomers = (await connection.query("SELECT * FROM customers;"))
      .rows;
    return res.send(queryCustomers);
  } catch (error) {
    console.log(error);
    return res.send(500);
  }
}

async function listCustomersById(req, res) {
  const { id } = req.params;

  try {
    const customer = (
      await connection.query(`SELECT * FROM customers WHERE customers.id=$1;`, [
        id,
      ])
    ).rows;

    if (customer.length === 0) {
      return res.sendStatus(404);
    }

    return res.send(customer);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function insertCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    //verifica se o cpf e phone contém somente números
    if (isNaN(cpf) || isNaN(phone)) {
      //Se true as strings não contém somente números
      return res.sendStatus(400);
    }
    //Procura por cpfs iguais
    const getCPF = (await connection.query("SELECT cpf FROM customers;")).rows;
    const findCpf = getCPF.find((customers) => customers.cpf === cpf);
    //retorna undefined se não encontrar o cpf
    if (findCpf !== undefined) {
      //se for diferente de undefined é porque já tem esse cpfd cadastrado
      return res.sendStatus(409);
    }

    const queryCustomer = await connection.query(
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);",
      [name, phone, cpf, birthday]
    );

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function updateCustomerInfo(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  const { id } = req.params;
  try {
    const customerId = (
      await connection.query(
        `SELECT * FROM customers WHERE customers.id = $1 ;`,
        [id]
      )
    ).rows;

    if (customerId.length === 0) {
      return res.sendStatus(400);
    }

    const customerCPF = (await connection.query(
      `SELECT * FROM customers WHERE cpf = $1;`,[cpf]
    )).rows;
    if (customerCPF.length !== 0) {
      return res.status(409).send("Esse cpf já foi cadastrado");
    }
    const queryUpdate = await connection.query('UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;',[name, phone, cpf, birthday, id ])
    return res.send(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export { insertCustomer, listCustomers, listCustomersById, updateCustomerInfo };
