import service from './server'


//登录接口
export function Login(data){
    return service.request({
        method: "post",
        url: "/login",
        data
    })
}



//注册接口
export function Reg(data){
    return service.request({
        method: "post",
        url: "/reg",
        data
    })
}

//添加留言接口
export function AddMessage(data){
    return service.request({
        method: "post",
        url: "/addMessage",
        data
    })
}

//留言查询口
export function QueryMessage(data){
    return service.request({
        method: "post",
        url: "/queryMessage",
        data
    })
}

//获取七牛云秘钥的token
export function getToken(data={}){
    return service.request({
        method: "post",
        url: "/getToken",
        data
    })
}


//图片上传保存地址入库接口
export function Upload(data={}){
    return service.request({
        method: "post",
        url: "/upload",
        data
    })
}

//图片列表分类查询接口
export function queryImgType(data={}){
    return service.request({
        method: "post",
        url: "/queryImg",
        data
    })
}


//根据用户名来查询留言
export function queryMsByid(data={}){
    return service.request({
        method: "post",
        url: "/queryMsByid",
        data
    })
}

//删除留言接口
export function delMessages(data={}){
    return service.request({
        method: "post",
        url: "/delMessage",
        data
    })
}


//根据用户名来查询图片
export function queryImgByid(data={}){
    return service.request({
        method: "post",
        url: "/queryImgByid",
        data
    })
}

//图片留言接口
export function delImg(data={}){
    return service.request({
        method: "post",
        url: "/delImg",
        data
    })
}

//注册用户查询
export function queryUser(data={}){
    return service.request({
        method: "post",
        url: "/queryUser",
        data
    })
}

//用户删除接口
export function delUser(data={}){
    return service.request({
        method: "post",
        url: "/delUser",
        data
    })
}

//视频上传接口
export function uploadVideo(data={}){
    return service.request({
        method: "post",
        url: "/uploadVideo",
        data
    })
}

//视频列表查询
export function queryVideoList(data={}){
    return service.request({
        method: "post",
        url: "/queryVideoList",
        data
    })
}

//视频删除接口
export function delVideo(data={}){
    return service.request({
        method: "post",
        url: "/delVideo",
        data
    })
}







