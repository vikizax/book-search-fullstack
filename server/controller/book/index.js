const axios = require("axios");

const getAllBooks = async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${
        req.query.keyword ? `"${req.query.keyword}"` : `""`
      }&startIndex=${req.query.startIndex ?? 0}&maxResults=${
        req.query.maxResults ?? 10
      }`
    );
    return res.status(200).send({ data: data.items, total: data.totalItems });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong. Please try again." });
  }
};

const getBooksDetailsByBookId = async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${req.params.id}`
    );
    return res.status(200).send({ data: data, total: data.totalItems });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something went wrong. Please try again." });
  }
};

module.exports = {
  getAllBooks,
  getBooksDetailsByBookId,
};
