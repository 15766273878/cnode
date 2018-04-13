import React from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import Helmet from 'react-helmet'
import {
    inject,
    observer,
} from 'mobx-react'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import IconReply from 'material-ui-icons/Reply'
import { CircularProgress } from 'material-ui/Progress'
import Reply from "./reply.js"
import Container from '../layout/container'

import { topicDetailStyle } from './styles'

@inject(stores => {
    return {
        topicStore: stores.topicStore,
        appState: stores.appState,
    }
}) @observer
class TopicDetail extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.topicStore.fetchTopicDetail(id);
    }

    render() {
        const id = this.props.match.params.id;
        const topic = this.props.topicStore.detailMap[id];
        const classes = this.props.classes;
        if (!topic) {
            return (
                <Container>
                    <section className={classes.loadingContainer}>
                        <CircularProgress/>
                    </section>
                </Container>
            )
        }


        return (
            <div>
                <Container>
                    <Helmet>
                        <title>{topic.title}</title>
                    </Helmet>
                    <header className={classes.header}>
                        <h3>{topic.title}</h3>
                    </header>
                    <section className={classes.body}>
                        <p dangerouslySetInnerHTML={{ __html: marked(topic.content) }} />
                    </section>
                </Container>

                <Paper elevation={4} className={classes.replies}>
                    <header className={classes.replyHeader}>
                        <span>{' '}</span>
                        <span>{'我的最新回复'}</span>
                    </header>
                    {
                        topic.replies.map(reply => {
                            return (
                                <Reply
                                    reply={reply}
                                    key={reply.id}
                                />
                            )
                        })
                    }
                </Paper>
            </div>
        )
    }
}


export default withStyles(topicDetailStyle)(TopicDetail)

