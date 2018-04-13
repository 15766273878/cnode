import {
    observable,
    computed,
    action,
    extendObservable
} from 'mobx'

import {get,post} from "../util/http"
import {topicScheme} from "../util/variable-define";

//规范topic格式
const createTopic =(topic)=>{
    return Object.assign({},topicScheme,topic)
}

class Topic{
    constructor(data){
        extendObservable(this,data)
    }
    @observable syncing = false;
}

class TopicStore{
    @observable topics
    @observable syncing
    @observable details=[]

    @computed get detailMap(){
        return this.details.reduce((result,detail)=>{
            result[detail.id] = detail;
            return result;
        },{})
    }
    constructor({syncing,topics,details}={syncing:false,topics:[],details:[]}){
        this.syncing = syncing;
        this.topics = topics.map(topic=>new Topic(createTopic(topic)));
        this.details = details.map(topic=>new Topic(createTopic(topic)));
    }
    addTopic(topic){
        this.topics.push(new Topic(createTopic(topic)))
    }

    @action fetchTopic(tab){
        return new Promise((resolve,reject)=>{
            this.syncing = true;
            get('/topics',{
                mdrender:false,
                tab
            }).then(resp=>{
                if(resp.success){
                    this.topics = [];
                    resp.data.forEach(topic=>{
                        this.addTopic(topic)
                    })
                    resolve()
                }else{
                    reject()
                }
                this.syncing = false;
            })
        })
    }
    @action fetchTopicDetail(id){
        return new Promise((resolve,reject)=>{
            if(this.detailMap[id]){
                resolve(this.detailMap[id])
            }else{
                get(`/topic/${id}`,{
                    mdrender:false
                }).then(resp=>{
                    if(resp.success){
                        const topic = new Topic(createTopic(resp.data))
                        this.details.push(topic);
                        resolve(topic)
                    }else{
                        reject()
                    }
                }).catch(reject)
            }
        })
    }
}

export default TopicStore;



