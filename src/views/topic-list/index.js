import React from 'react';
import {observer,inject} from "mobx-react"
import Tabs, { Tab } from 'material-ui/Tabs';
import List from "material-ui/List"
import { CircularProgress } from 'material-ui/Progress';
import axios from "axios"
import queryString from "query-string"
import Container from "../layout/container"
import TopicListItem from "./list-item"
import {tabs} from "../../util/variable-define"

@inject((stores)=>{
    return {
        appState:stores.appState,
        topicStore:stores.topicStore
    }
}) @observer
class TopicList extends React.Component {
    constructor(){
        super()
        this.state={

        }
        this.changeTab = this.changeTab.bind(this)
        this.listItemClick = this.listItemClick.bind(this)
    }
    componentDidMount(){
        const tab = this.getTab()
        this.props.topicStore.fetchTopic(tab)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.location.search!==this.props.location.search){
            this.props.topicStore.fetchTopic(this.getTab(nextProps.location.search))
        }
    }
    getTab(search){
        //tab=ask {tab:ask}
        search = search || this.props.location.search;
        const query = queryString.parse(search);
        return query.tab||"all"
    }

    changeTab(e,value){
        this.props.history.push({
            pathname:"/list",
            search:`?tab=${value}`
        })
    }
    listItemClick(topic){
        this.props.history.push(`/detail/${topic.id}`)
    }
    render(){
        const tab = this.getTab()
        const topics = this.props.topicStore.topics
        const syncing = this.props.topicStore.syncing
        return (
            <div>
                <Container>
                    <Tabs value={tab} onChange={this.changeTab}>
                        {
                            Object.keys(tabs).map(key=>{
                                return (<Tab label={tabs[key]} value={key} key={key}/>)
                            })
                        }
                    </Tabs>
                    <List>
                        {
                            topics.map((topic,index)=>{
                                return (<TopicListItem topic={topic} onClick={()=>{this.listItemClick(topic)}} key={index}></TopicListItem>
                                )
                            })
                        }
                    </List>
                    {
                        syncing?(
                                <div>
                                    <CircularProgress
                                        color="secondary"
                                        size={100}
                                    />
                                </div>
                        ):null
                    }
                </Container>
            </div>
        )
    }
}


export default TopicList;