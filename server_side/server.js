const PORT=3001;
const http=require("http");
const fs=require("fs");
const url=require("url");
const queryString=require("querystring");
const {MongoClient,ObjectId}=require("mongodb");
const { log } = require("console");
//connect mongodb
const client=new MongoClient("mongodb://127.0.0.1:27017/");
const app=http.createServer(async(req,res)=>{
    //create db
const db=client.db("project");
//create collection
const collection=db.collection("teachers");
const path=url.parse(req.url)
console.log(req.method);
console.log(path);
if(path.pathname=="/"){
    res.writeHead(200,{"Content-type":"text/html"});
    res.end(fs.readFileSync("../client_side/index.html"));
}else if(path.pathname=="/js/custom.js"){
    res.writeHead(200,{"Content-Type":"text/js"});
    res.end(fs.readFileSync("../client_side/js/custom.js"));
}else if(path.pathname=="/css/index.css"){
res.writeHead(200,{"Content-Type":"text/css"});
res.end(fs.readFileSync("../client_side/css/index.css"));
}else if(path.pathname=="/add"){
    res.writeHead(200,{"Content-Type":"text/html"});
    res.end(fs.readFileSync("../client_side/pages/form.html"));
}else if(path.pathname=="/css/form.css"){
    res.writeHead(200,{"Content-Type":"text/css"});
    res.end(fs.readFileSync("../client_side/css/form.css"));
}
if(req.method=="POST" && path.pathname=="/submit"){
    let body="";
    req.on("data",(chunks)=>{
        console.log(chunks);
        body+=chunks.toString();
        console.log(body);
    });
    req.on("end",async()=>{
        if (body !=null){
            const formData=queryString.parse(body);
            console.log(formData);
            collection.insertOne(formData).then(()=>{
                console.log("success");
                
            })
            .catch((error)=>{
                console.log(error);
                
            })
            
        }
    })
    res.writeHead(200,{"Content-type":"text/html"});
    res.end(fs.readFileSync("../client_side/index.html"));
}
if (path.pathname=="/getTeachers" && req.method=="GET"){
    const data=await collection.find().toArray();
    const jsonData=JSON.stringify(data);
    console.log(jsonData);
    res.writeHead(200,{"Content-Type":"text/json"});
    res.end(jsonData);
    

}
//delete
if(path.pathname=="/delete" && req.method=="DELETE"){
    console.log("reached delete route");
    let body="";
    req.on("data",(chunks)=>{
        body+=chunks.toString();
        console.log(body);
    })
    req.on("end",async()=>{
        let _id=new ObjectId(body);
        console.log(_id);
        collection.deleteOne({_id}).then(()=>{
            res.writeHead(200,{"Content-Type":"text/plain"});
            res.end("success")
        }).catch(()=>{
            res.writeHead(200,{"Content-Type":"text/plain"});
            res.end("fail")
        })
    })
}
//update or save
if(path.pathname=="/update" && req.method=="PUT")
{
    console.log("update on process");
    let body=""
    req.on("data",(chunk)=>{
        console.log(chunk);
        body+=chunk.toString();

        
    })
    req.on("end",async()=>{
        let gData=JSON.parse(body);
        console.log("======");
        
        console.log(gData);
        updateData={name:gData.name,Desig:gData.designation,salary:gData.salary,exp:gData.experience};//this query is used to update or insert data into the database
        console.log(gData.id);
        
        let _id=new ObjectId(gData.id);
        console.log(_id);

        await collection.updateOne({_id},{$set:updateData}).then(()=>{
            res.writeHead(200,{"Content-Type":"text/plain"});
            res.end("updated")
        }).catch(()=>{
            res.writeHead(404,{"Content-Type":"text/plain"})
            res.end("failed")
        })
        
        
    })
    
}

})
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
    
});