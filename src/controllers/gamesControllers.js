import connection from "../db/db.js";

async function listGames(req, res) {
  try {
    const queryGames = await connection.query("SELECT * FROM games;");
    return res.send(queryGames.rows);
  } catch (error) {
    console.log(error);
    return res.send(500).send("Não foi possível listar os jogos");
  }
}

async function insertGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  console.log(req.body.categoryId);
  try {
    //Procura por Ids válidos
    const selectIds = (await connection.query('SELECT id FROM categories')).rows ;
    const findCatedory = selectIds.find(categories => categories.id === categoryId);
    if(findCatedory === undefined){
      return res.sendStatus(400);
    }
    //Procura por nomes de jogos iguais
    const getNames = (await connection.query('SELECT name FROM games;')).rows;
    const findName = getNames.find(games => games.name === name);
    if(findName !== undefined){
        return res.sendStatus(409);
    }
    //Insere o game na tabela
    const queryGames = await connection.query(
       'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',
       [name, image, stockTotal, categoryId, pricePerDay]
     );
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export { listGames, insertGame };
