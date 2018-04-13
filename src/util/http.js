import axios from "axios";
const baseUrl = ""

const parseUrl = (url,params)=>{
    //{a:1,b:2}  /api/topics?a=1&b=2
    const arr = Object.keys(params)
    const str = arr.reduce((result,key)=>{
        result+=`${key}=${params[key]}&`
        return result;
    },'')
    return `${baseUrl}/api/${url}?${str.substr(0,str.length-1)}`
}

export const get = (url,params)=>{
    return new Promise((resolve,reject)=>{
        axios.get(parseUrl(url,params))
            .then(resp=>{
                const data = resp.data;
                if(data&&data.success==true){
                    resolve(data)
                }else{
                    reject(data)
                }
            }).catch(reject)
    })
}

export const post = (url,params,datas)=>{
    return new Promise((resolve,reject)=>{
        axios.post(parseUrl(url,params),datas)
            .then(resp=>{
                const data = resp.data;
                if(data&&data.success==true){
                    resolve(data)
                }else{
                    reject(data)
                }
            }).catch(reject)
    })
}