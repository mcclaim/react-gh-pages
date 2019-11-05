import React, {Component} from 'react';
import './header.css';

export default class Header extends Component {
    render() {
        const {newsReadCount} = this.props;
        return (
            <header className="header-box">
                <div className="page-header">
                    <h2>Тестовый вывод новостей</h2>
                    <p className="lead">Новостей прочитано: {newsReadCount}</p>
                </div>
            </header>
        );
    }
}