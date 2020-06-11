function time (){
    let dt = new Date()
    let y = dt.getFullYear();
    let mt = (dt.getMonth()+ 1) < 10? '0'+ (dt.getMonth()+ 1) : dt.getMonth()+ 1;
    let day = new Date().getDate()< 10 ? '0'+ new Date().getDate():new Date().getDate();
    let h = new Date().getHours()< 10 ? '0'+ new Date().getHours():new Date().getHours();
    let m = new Date().getMinutes()< 10 ? '0'+ new Date().getMinutes():new Date().getMinutes();
    let s = new Date().getSeconds()< 10 ? '0'+ new Date().getSeconds():new Date().getSeconds();
    let nowTime = `${ y + '-' + mt+ '-' + day +' '+ h + ':'+ m + ':'+ s }`
    return nowTime
}

export default time
