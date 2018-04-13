import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import TopicList from "../views/topic-list";
import TopicDetail from "../views/topic-detail";
import UserLogin from "../views/user/login"
import UserInfo from "../views/user/info"
export default ()=>[
    <Route path="/" render={()=><Redirect to='/list'></Redirect>} exact></Route>,
    <Route path='/list' component={TopicList}></Route>,
    <Route path='/detail/:id' component={TopicDetail}></Route>,
    <Route path='/user/login' component={UserLogin} exact></Route>,
    <Route path='/user/info' component={UserInfo} exact></Route>
]