const { json, urlencoded } = require('body-parser');
const express = require('express');
const {createTodo, getAllTodoList, updateTodoList, deleteTodolist} = require('./db');


const app = express();
const port = 3000;

app.use(json());
app.use(urlencoded({ extended: true }))


app.post('/', async (req,res)=>{
    res.writeHead(200,{'content-Type':'application/json'});
    let response = {"response": "This is a post Method"};
    console.log(response);
    console.log(req.body);
    const _data = req.body.data;
    const _status = req.body.status;
    let createData;
    try {
        createData = await createTodo(_data, _status);
    } catch (error) {
        return res.status(400).json({msg: 'Data not created'});
    }
    
    res.end(JSON.stringify(response));
})


app.get('/', async(req, res)=>{
    
    try {
        let result = await getAllTodoList();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
    
})

app.put('/:id', async(req, res)=>{
    try {
        const uId = req.params.id;
        const uData_ = req.body.data;
        const uStatus_ = req.body.status;
        const uResult = await updateTodoList(uId, uData_, uStatus_);
        res.send(uResult);

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
    
})

app.delete('/:id', async(req, res)=>{
    try {
        const uId_ = req.params.id;
        const dResult = await deleteTodolist(uId_);
        if (dResult == 1) {
            res.json(dResult);
            res.send("Deleted");
        } else {
            res.json("Invalid Id")
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
} )


app.listen(port, () => {
    console.log(`Port listening on port ${port}`);
})