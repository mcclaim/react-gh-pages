import React, {Component} from 'react';
import './news-list.css';
import NewsListItem from "../news-list-item";
import NewsItemDetail from "../news-item-detail";

export default class NewsList extends Component {

    API = 'https://jsonplaceholder.typicode.com/posts?userId=1';

    constructor(props) {
        super(props);

        this.state = {
            newsList: [],
            isLoading: false,
            error: null,
            modal: false,
            modalStyles: {},
            modalClassName: '',
            newsDetail: {},
            readCount: 0
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch(this.API)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => this.setState({newsList: data, isLoading: false}))
            .catch(error => this.setState({error, isLoading: false}));
    }

    renderNews = () => {
        const {newsList, isLoading} = this.state;
        if (isLoading) {
            return <p>Загрузка ...</p>;
        }
        if (!newsList.length) {
            return <p>К сожалению новостей нет</p>
        }
        return (
            newsList.map((item) => {
                return <NewsListItem key={item.id} article={item} detail={this.getItemDetail}/>
            })
        );
    };

    getItemDetail = (articleId) => {
        let {readCount} = this.state;
        const {newsReadCount} = this.props;
        fetch(`https://jsonplaceholder.typicode.com/posts/${articleId}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                let countIncrement = readCount + 1;
                this.setState({newsDetail: data, readCount: countIncrement});
                newsReadCount(countIncrement);
                this.toggleModal();
                this.renderNewsItemDetail();
            })
            .catch(error => this.setState({error, isLoading: false}));
    };

    renderNewsItemDetail = () => {
        const {newsDetail} = this.state;
        if (!newsDetail.id) {
            return null;
        }
        return <NewsItemDetail key={newsDetail.id} articleInfo={newsDetail} />;
    };

    toggleModal = () => {
        const {modal} = this.state;
        const styles = {
            display: 'block',
            paddingRight: '17px',
            overflowY: 'auto'
        };
        if (modal) {
            this.setState({modalClassName: ''});
            setTimeout(() => {
                document.body.style.cssText = "overflow: auto; padding-right: 0";
                this.setState({modalStyle:{}, modal: false});
            }, 150);
            return false;
        }
        document.body.style.cssText = "overflow: hidden; padding-right: 17px";
        this.setState({modal: true, modalStyles: styles});
        setTimeout(() => {this.setState({modalClassName: 'show'})}, 150)
    };

    render() {
        const {modal, modalStyles, modalClassName} = this.state;
        return (
            <section className="news">
                <div className="row">
                    {this.renderNews()}
                </div>

                {
                    modal &&
                    <React.Fragment>
                        <div className={`modal fade ${modalClassName}`} style={modalStyles} id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.toggleModal}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        { this.renderNewsItemDetail() }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`modal-backdrop fade ${modalClassName}`} onClick={this.toggleModal}> </div>
                    </React.Fragment>
                }

            </section>
        );
    }
}