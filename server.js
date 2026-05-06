import myserver from 'express'
import mydb from 'mysql'
import cors from 'cors'
import bcrypt from 'bcryptjs'


const app = myserver();
const port = 5000;


app.use(myserver.json());
app.use(cors());

const db = mydb.createConnection({
    host: "localhost",
    password: "",
    user: "root",
    database: "usersmanagement"
})
db.connect((err) => {
    if (!err) {
        console.log("mysqlconnected")
    } else {
        console.log(err)
    }
})


//api's
app.get('/', (req, res) => {
    res.send("server is live");
})

app.get("/students", (req, res) => {
    res.send("hello my studennts");
})
const users = [
    { id: 101, name: "keza", age: 30 },
    { id: 102, name: "mario", age: 46 },
    { id: 103, name: "ania", age: 14 },
]
app.get("/users", (req, res) => {
    res.send(users);
})
app.get("/people", (req, res) => {
    const myquery = "select * from users";
    db.query(myquery, (error, results) => {
        if (!error) {
            res.send(results);
        }
        else {
            console.log(error);
        }
    })

})
app.post("/people", (req, res) => {
    const { id, name, email, age, password } = req.body;
    const myquery = "insert into users values(?,?,?,?,?)";
    db.query(myquery, [id, name, email, age, password], (error, results) => {
        if (!error) { res.send(results); }
        else { console.log(error); }
    })
}
)

app.get("/people/:id",(req,res)=>{
    const id = req.params.id;
    const myQuery = "Select * from users where id = ? "
    db.query(myQuery, [id],(error,results)=>{
        if(!error){
            res.send(results);
        }
        else{
            console.log(error)
        }
    })
})



app.put("/people/:id",(req,res)=>{
    const id =req.params.id;
    const {name, email, age, password}=req.body;
    const myQuery="UPDATE FROM USERS, SET name=?, email=?, age=?, WHERE id =?";
    db.query(myQuery,[name,email,age,password,id],
        (error,results)=>{
            if(!error){
                res.send(results);
            }
            else{
                console.log(error);
            }
        }
    )
})



app.listen(port, () => {
    console.log(`server is running on port http://localhost:${port}`);
});
