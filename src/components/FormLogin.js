import React, {useState , useEffect} from 'react'
import { Link } from "react-router-dom";

const FormLogin = props => {
    const [data,setData] = useState('')
    const { islogin } = props
    const getDatauser = async function(){
        const url = 'https://login-dfba3.firebaseio.com/users.json'
        let data = await fetch(url).then((data)=>{
            return data.json();
        })
          let aData  = []; 
         let dataKey = Object.keys(data);
        dataKey.forEach( (element , index) => {
            aData.push(data[element])
        });
       setData(aData);
       
    }
    useEffect(getDatauser,[])
    const handlerPasswordChange = (e)=>{
        let password  =  e.target.value;
        console.log(data)
        for (let i = 0 ; i < data.length ; i++) {
            console.log(data[i].password)
            if(password === String(data[i].password)){
                islogin.setIslogin({ ...islogin.islogin, password : true});
                break;
            }
            else{
                islogin.setIslogin({ ...islogin.islogin, password : false});
            }
        }
    

    }
    const handlerUserNameChange = (e)=>{
        let userName  =  e.target.value;
        console.log(data)
        for (let i = 0 ; i < data.length ; i++) {
            console.log(data[i].username)
            if(userName === data[i].username){
                islogin.setIslogin({ ...islogin.islogin, username : true});
                break;
            }
            else{
                islogin.setIslogin({ ...islogin.islogin, username : false});
            }
        }
        
    }
 console.log(data)
    return (
        
        <div >
        <input type="text" name="username" onChange = {handlerUserNameChange} />
        <input type="password" name="password"  onChange = {handlerPasswordChange}/>
        <Link  to={(islogin.islogin.password === true && islogin.islogin.username === true ) ? "/home" : "/"}><button type= "submit" >dsdsds</button></Link>
       <Link to = '/sign' />
       
        </div>
    )
}



export default FormLogin
