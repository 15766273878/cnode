import React from "react";
import Paper from "material-ui/Paper"
import {withStyles} from "material-ui/styles"

const  styles={
    root:{
        margin:24,
        marginTop:80
    }
}

const Container = ({classes,children})=>{
    return (
        <Paper elevation={4} className={classes.root}>
            {children}
        </Paper>
    )
}

export default withStyles(styles)(Container)