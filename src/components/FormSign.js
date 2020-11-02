import React,{useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';

const FormSign = () => {
     const [newUserName,setNewUserName] = useState('');
     const [newPassword, setNewPassword] = useState('');
     const [status,setStatus] = useState({username : false , password : false})
    const [data,setData] = useState('')
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
    useEffect(() => {
     getDatauser()
    }
      ,[] );
     const handlerPasswordChange = (e)=>{
        let password  =  e.target.value;
        for (let i = 0 ; i < data.length ; i++) {
            if(password !== String(data[i].password) && password !== ''){
                setNewPassword(e.target.value)
                setStatus({...status,password : true})
                break;
            }
            else{
                setStatus({...status,password : false})
            }
        }
    }
    const handlerCheckPasswordChange = (e)=>{
      
         

    }
    const handlerUserNameChange = (e)=>{
        let username  =  e.target.value;
        for (let i = 0 ; i < data.length ; i++) {
            if(username !== String(data[i].username) && username !== ''){
                setNewUserName(e.target.value)
                setStatus({...status,username : true})
                break;
            }
            else{
                setStatus({...status,username : false})
            }
        }
      
        
    }

    const handlerSubmit = (e)=>{
        if(status.username === false && status.password === false){
            alert('username,password wrong')
        }
        else if(status.password === false){
            alert('password is wrong')
        }
        else if(status.username === false){
            alert('username is wrong')
        }
        else{
            alert('done');
            let data = {username : newUserName ,
                password : newPassword,
                id:Math.random()};
            postUser(data)

        }
    }
    const postUser = async function (data){
        const url = 'https://login-dfba3.firebaseio.com/users.json';
         const postData = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(data) 
          });
          return postData.json();
    }
    return (
        <div>
          <input type="text" name="username" onChange = {handlerUserNameChange} />
        <input type="password" name="password"  onChange = {handlerPasswordChange}/>
        <input type="password" name="password"  onChange = {handlerCheckPasswordChange}/>
        <Link to= {(status.username === true && status.password === true) ? '/' : '/sign'} ><button type= "submit" onClick={handlerSubmit}>sign</button></Link>
        </div>
    );
}

export default FormSign;
