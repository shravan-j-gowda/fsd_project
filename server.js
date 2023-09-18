const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");
const path=require('path')

const app = express();

app.use(cors());
app.use(express.json());
mongoose.set('strictQuery', false)
mongoose
  .connect("mongodb+srv://Shravan:fsd_123@cluster0.uqo0djd.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/user", userRoutes);


//static files
app.use(express.static(path.join(__dirname,"./client/build")))


app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,"./client/build/index.html"))
})

app.listen(5000, () => {
  console.log("server started on port 5000");
});
