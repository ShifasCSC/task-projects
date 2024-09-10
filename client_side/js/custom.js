

async function getTeachers(){
const res=await fetch("http://localhost:3001/getTeachers")
const teachers=await res.json();
str=""
teachers.map((teacher)=>{
    str+=` <div class="form-container" id="main">
        <form>
            <div class="form-row">
                <input type="text" class="ty" value=${teacher.name} id="name-${teacher._id}" placeholder="Name" disabled="true">
                <input type="text" class="ty" value=${teacher.Desig} id="desig-${teacher._id}" placeholder="Designation" disabled="true">
                </div>
            <div class="form-row">
                <input type="text" class="ty" value=${teacher.salary} id="salary-${teacher._id}" placeholder="Salary" disabled="true">
                <input type="text" class="ty" value=${teacher.exp} id="exp-${teacher._id}" placeholder="Experience" disabled="true">
           </div>
           
            <div class="form-actions">
                <button type="button" onclick="handleSave('${teacher._id}')" class="btn">Save</button>
                <button type="button" onclick="handleDelete('${teacher._id}')" class="btn" onclick>Delete</button>
                <button type="button" onclick="handleEdit('${teacher._id}')" class="btn">Edit</button>
            </div>
        </form>
    </div> `
})
   document.getElementById("main").innerHTML=str;
}
getTeachers()


//filter or search

document.getElementById("search").addEventListener("keyup",async(e)=>{
    console.log(e.target.value);
    try{
        const res=await fetch("http://localhost:3001/getTeachers");
        const data=await res.json();
        let Ddata=data.filter((teacher)=>teacher.name.toLowerCase().startsWith(e.target.value.toLowerCase()));
        str=""
        Ddata.map((teacher)=>{
            str+=`<div class="form-container" id="main">
            <form>
            <div class="form-row">
            <input type="text" class="ty" value=${teacher.name} placeholder="Name">
            <input type="text" class="ty" value=${teacher.Desig} placeholder="Designation">
            </div>
            <div class="form-row">
            <input type="text" class="ty" value=${teacher.salary} placeholder="Salary">
            <input type="text" class="ty" value=${teacher.exp} placeholder="Experience">
            </div>
            
            <div class="form-actions">
            <button type="button" onclick="handleSave('${teacher._id}')" class="btn">Save</button>
            <button type="button" onclick="handleDelete('${teacher._id}')" class="btn" onclick>Delete</button>
            <button type="button" onclick="handleEdit('${teacher._id}')" class="btn">Edit</button>
            </div>
            </form>
            </div>`
        })
        document.getElementById("main").innerHTML=str;
    }catch(error){
        console.log(error);
        
    }
    
})

//save
async function handleSave(id){
    let name=document.getElementById(`name-${id}`).value
    let designation=document.getElementById(`desig-${id}`).value
    let salary=document.getElementById(`salary-${id}`).value
    let experience=document.getElementById(`exp-${id}`).value

    console.log(name,designation,salary,experience);
    let data={id,name,designation,salary,experience}
    console.log(data);
    
    let jsonData=JSON.stringify(data)
    console.log(jsonData);
    
    const res=await fetch("http://localhost:3001/update",{
        method:"put",
        headers:{"Content-type":"text/json"},
        body:jsonData
    });
    const resData=await res.text()
    res.status==200?alert(resData):alert(resData);
    getTeachers()


    
}


async function handleDelete(id){

    //request
    const res= await fetch("http://localhost:3001/delete",{
        method:"delete",
        headers:{"Content-Type":"type/plain"},
        body:id

    });
console.log(res);

    //get response from the server

     //one way
    // // ---------------------------------------------------
    const datas =await res.text()
    console.log(datas);
    // getData()
    // // ---------------------------------------------------
    // //second way
    res.status==200?alert(datas):alert(datas);
    getTeachers()
    // // ---------------------------------------------------
    // // ---------------------------------------------------
}

//edit
function handleEdit(id){
    //to get the id of each input field and make it disabled to false
    document.getElementById(`name-${id}`).disabled=false
    document.getElementById(`desig-${id}`).disabled=false
    document.getElementById(`salary-${id}`).disabled=false
    document.getElementById(`exp-${id}`).disabled=false
}