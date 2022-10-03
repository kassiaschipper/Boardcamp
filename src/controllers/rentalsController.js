import connection from "../db/db.js";

async function insertRentals (req, res){
const {customerId, gameId, daysRented} = req.body;


try {
    
    //Procura por cliente
    const customer = (await connection.query(`SELECT * FROM customers WHERE id = $1;`,[customerId])).rows;
    if(customer.length === 0){
       return res.sendStatus(400);
    }
    //Procura por jogos
    const games = (await connection.query(`SELECT * FROM games WHERE id = $1;`,[gameId])).rows;
    if(games.length === 0){
        return res.sendStatus(400);
    }

    //Verifica a disponibilidade de aluguel
    const stockTotal = (await connection.query('SELECT "stockTotal" FROM games WHERE id = $1;',[gameId])).rows[0].stockTotal;
    const rentals = (await connection.query('SELECT * FROM rentals WHERE "gameId" = $1;',[gameId])).rows;
    if(rentals.length === stockTotal){
       return res.sendStatus(400);
    }
    
    const dailyCost = games[0].pricePerDay;
    const originalPrice = daysRented*dailyCost;
    const rentalQuery = await connection.query('INSERT INTO rentals ("customerId", "gameId","rentDate" ,"daysRented","returnDate","originalPrice","delayFee" ) VALUES ($1, $2, CURRENT_DATE, $3, $4, $5, $6);',[customerId, gameId, daysRented, null, originalPrice, null]);
    
    return res.sendStatus(201);

} catch (error) {
    console.log(error);
    return res.sendStatus(500);
}


}

export { insertRentals }