import React, {Component} from 'react';
import './app.css'
import Header from "../header";
import NewsList from "../news-list";

export default class App extends Component {

    state = {
        newsReadCount: 0
    };

    getNewsReadCount = (count) => {
        this.setState({newsReadCount: count});
    };

    render() {
        return (
            <div className='wrapper'>
                <div className="container">
                    <Header newsReadCount={this.state.newsReadCount} />
                    <NewsList newsReadCount={this.getNewsReadCount} />
                </div>
            </div>
        );
    }
}