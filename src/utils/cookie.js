import Cookie from 'cookie_js'

const toKen = 'user_Token' //用户token值
const username = 'username'
const userId = 'userId'


//设置部分
export  function setToken(value){
    return Cookie.set(toKen,value)
    
 };

 export  function setUsername(value){
    return Cookie.set(username,value)
 };
 export  function setRegisterTime(value){
   return Cookie.set('regTime',value)
};

export  function setRole(value){
   return Cookie.set('role',value)
};

 //获取部分
 export  function getToken(){
    return Cookie.get(toKen)
 };
 
 export  function getUsername(){
    return Cookie.get(username)
 };
 export  function getRegisterTime(){
   return Cookie.get('regTime')
};
export  function getRole(){
   return Cookie.get('role')
};




