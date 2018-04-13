import React from 'react';


import { withStyles } from 'material-ui/styles';
import {ListItemAvatar, ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {tabs} from "../../util/variable-define"
import {topicPrimaryStyle,topicSecondaryStyle} from "./styles";

const Primary = ({classes,topic})=>{
    return (
        <div className={classes.root}>
            <span className={classes.tab}>{tabs[topic.tab]}</span>
            <span className={classes.title}>{topic.title}</span>
        </div>
    )
}
const StylePrimary = withStyles(topicPrimaryStyle)(Primary)

const Secondary=({classes,topic})=>{
    return (
        <div className={classes.root}>
            <span className={classes.userName}>{topic.author.loginname}</span>
            <span className={classes.count}>
                <span className={classes.secondaryColor}>{topic.reply_count}</span>
                <span>/</span>
                <span>{topic.visit_count}</span>
            </span>
            <span>
                创建时间：{topic.create_at}
            </span>
        </div>
    )
}
const StyleSecondary = withStyles(topicSecondaryStyle)(Secondary)
const TopicListItem=({topic,onClick})=>{
    return (
        <ListItem button onClick={onClick}>
            <ListItemAvatar>
                <Avatar src={topic.author.avatar_url}>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={<StylePrimary topic={topic}/>}
                secondary={<StyleSecondary topic={topic}/>} />
        </ListItem>
    )
}


export default TopicListItem;