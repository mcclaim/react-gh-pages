import React, {Component} from 'react';
import './news-item-detail.css';

export default class NewsItemDetail extends Component {

    state = {
        comments: [],
        error: '',
        isLoading: false
    };

    componentDidMount() {
        const {articleInfo} = this.props;
        this.setState({isLoading: true});
        fetch(`https://jsonplaceholder.typicode.com/posts/${articleInfo.id}/comments`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => this.setState({comments: data, isLoading: false}))
            .catch(error => this.setState({error, isLoading: false}));
    }

    renderComments = () => {
        const {comments, isLoading} = this.state;
        if (isLoading) {
            return <p>Загрузка ...</p>;
        }
        if (!comments.length) {
            return <p>К сожалению комментарий нет</p>
        }
        return (
            comments.map((comment) => {
                return (
                    <li className="list-group-item" key={comment.id}>
                        <div className="text-primary"><b>Имя: {comment.name}</b></div>
                        <div className="text-warning"><b>Емаил: {comment.email}</b></div>
                        <p>Комментарий: {comment.body}</p>
                    </li>
                );
            })
        );
    };

    render() {
        const {articleInfo} = this.props;
        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title text-primary">Заголовок: {articleInfo.title}</h5>
                        <p className="card-text">Описания: {articleInfo.body}</p>
                    </div>
                </div>
                <h2>Комментарии: </h2>
                <div className="card">
                    <ul className="list-group list-group-flush">
                        {this.renderComments()}
                    </ul>
                </div>
            </div>
        );
    }
}