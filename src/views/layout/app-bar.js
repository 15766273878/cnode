import React from 'react';
import {withRouter} from "react-router-dom"
import {inject,observer} from "mobx-react"
import {withStyles} from "material-ui/styles"
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui-icons/Home';

const styles={
    root:{
        width:"100%"
    },
    flex:{
        flex:1
    }
}

@withRouter
@inject(store=>{
    return {
        appState:store.appState
    }
})
class ButtonAppBar extends React.Component{
    constructor(){
        super()
        this.createButtonClick = this.createButtonClick.bind(this);
        this.loginButtonClick = this.loginButtonClick.bind(this);
        this.onHomeIconClick = this.onHomeIconClick.bind(this)
    }
    onHomeIconClick(){
        this.props.history.push('/list')
    }
    createButtonClick(){

    }
    loginButtonClick(){
        if(this.props.appState.user.isLogin){
            this.props.history.push('/user/info')
        }else{
            this.props.history.push('/user/login')
        }

    }
    render(){
        const classes = this.props.classes;
        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton onClick={this.onHomeIconClick}>
                            <HomeIcon />
                        </IconButton>
                        <Typography className={classes.flex} type="title" color="inherit">
                            CNode
                        </Typography>
                        <Button onClick={this.createButtonClick}>创建话题</Button>
                        <Button onClick = {this.loginButtonClick}>{
                            this.props.appState.user.isLogin?this.props.appState.user.info.loginname:"登录"

                        }</Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}


export default withStyles(styles)(ButtonAppBar);