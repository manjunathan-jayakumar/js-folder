const express = require('express');
const app = express();
const PORT = 3000

app.get('/', (req, res) => {
    res.send("Yokoso, Watashi no server e!")
})

app.listen(PORT, ()=> {
    console.log(`server is running at port: ${PORT}`);
})