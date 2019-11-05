import React, {Component} from 'react';
import './news-list-item.css';

export default class NewsListItem extends Component {

    constructor(props) {
        super(props);
        this.getDetail = this.getDetail.bind(this);
    }

    render() {
        const {article} = this.props;
        return (
            <div className="col-xs-12 col-sm-4">
                <div className="news_item">
                    <div className="news_item_img">
                        <a href="/#"><img src="https://mcclaim.github.io/uzinfocom/images/news1.jpg" alt="soveshaniya"/></a>
                    </div>
                    <div className="news_item_block">
                        <div className="news_inform_wrap">
                            <a className="news_item_title" href="/#"> {article.title} </a>
                            <div className="news_item_text">{article.body}</div>
                        </div>
                        <a className="button" href="/#" onClick={this.getDetail}>Подробнее</a>
                    </div>
                </div>
            </div>
        );
    }

    getDetail(e) {
        e.preventDefault();
        this.props.detail(this.props.article.id);
    };
}