import React, { Component } from 'react';
import './billboard.less';
import Header from '../../components/header';
import { Link } from 'react-router';
import './page-header.less'

export default class PageHeader extends Component {
    constructor (props) {
        super(props);
        this.state = {
            active: this.props.active
        }
    }
    render () {
        let active = this.state.active;
        return (
            <div className='page-header'>
                <Header title={'Music Player'}/>
                <ul className='list flex'>
                    <li className={active === '1' ? 'active' : ''}>
                        推荐
                    </li>
                    <li className={active === '2' ? 'active' : ''}>歌手</li>
                    <li className={active === 'billboard' ? 'active' : ''}>
                        <Link to='/billboard'>榜单</Link>
                    </li>
                    <li className={active === 'search' ? 'active' : ''}><Link to='/search'>搜索</Link></li>
                </ul>
            </div>
        )
    }
}