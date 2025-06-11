import express from 'express';

const app = express();
const PORT = 3000;
const arrResponse = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    { id: 3, name: 'Bob', age: 35 }
];

app.get("/", (req, res) => {
    res.json(arrResponse);
});

app.listen(PORT, () => { console.log(`O servidor está na porta ${PORT}`);})