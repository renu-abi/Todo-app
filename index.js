import cors from "cors"
import dot from "dotenv"
import exp from "express"
import mon from "mongoose"

const app = exp()
dot.config();
app.use(exp.json())
app.use(cors())

const tSchema = new mon.Schema({
    title: {
        type: String
    },
    description: String
});

const todoCollection = mon.model('todo', tSchema);

app.post('/todos', async(req, res) => {
    const data = { title: req.body.title, description: req.body.description };
    try {
        const entry = new todoCollection(data);
        await entry.save();
        res.status(200).json(data);
        console.log("Added Successfully:", data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Add failed" });

    }
});

const middleware = (req, res, next) => {
    console.log("Middleware");
    const user = true;
    if (user) {
        next();
    } else {
        res.status(400).json("Invalid user")
    }
}
app.get('/todos', middleware, async(req, res) => {
    try {
        const data = await todoCollection.find({}).exec();
        console.log("Get Success", data);
        res.status(200).json(data);
    } catch (err) {
        console.log("Get failure", data);
        res.status(400).json(err);
    }

})

app.put('/todos/id', async(req, res) => {
    try {
        const entry = await todoCollection.findByIdAndUpdate(req.params.Id, req.body, { new: true });
        console.log("updated:", entry);
        res.status(200).json(entry);

    } catch (err) {
        console.log("update failure:", req.params.Id);
        res.status(400).json(err);
    }
})


app.delete('/todos:id', async(r, p) => {
    try {
        await todoCollection.findByIdAndDelete(r.params.Id);
        p.status(200).json({ message: `Deleted ${r.params.id} successfully` });
        console.log("Deleted successfully");
    } catch (err) {
        console.log("Deleted failure:");
        p.status(400).json(err);
    }
})

const connect = async() => {
    try {
        await mon.connect(process.env.MONGO);
        console.log("Connection to DB successfully");

    } catch (err) {
        console.log("Error while connecting to DB", err);
    }
}

app.listen(process.env.PORT, () => {
    connect();
    console.log("Server is running ....");
})