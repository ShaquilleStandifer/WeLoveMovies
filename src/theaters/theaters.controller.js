const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");
const service = require("./theaters.service");

async function list(req, res) {
  const theaters = await service.list(); //assign list of theaters to variable
  const theatersAndMovies = [];
  for (let i = 0; i < theaters.length; i++) {    //loop through theaters
    const theater = theaters[i];   //set index of theater array to const
    const { theater_id } = theater;
    const movies = await service.getMovies(theater_id); 
    const TM = { ...theater, movies: movies };
    theatersAndMovies.push(TM);
  }
  res.status(200).json({ data: theatersAndMovies });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
};