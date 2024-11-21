const express = require("express");
const app = express();
const cors = require("cors");
const { retriveData, retriveDataById } = require("./service");
const port = 5500;

app.use(cors());
app.use(express.json());

app.get("/api/product", async (req, res) => {
  const datas = await retriveData("products");
  res.send({ status: true, statusCode: 200, data: datas });
});

app.get("/api/product/:id", async (req, res) => {
  const { id } = req.params;
  const data = await retriveDataById("products", id);
  if (data.id === id) {
    res.send({ status: true, statusCode: 200, data: data });
  } else {
    res.status(404).send({
      status: false,
      statusCode: 404,
      message: "Data not found",
      data: data,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
