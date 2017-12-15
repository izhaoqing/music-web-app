import React, { Component} from 'react';
import './header.less';
import { Link } from 'react-router';

class Header extends Component {
    handleBack() {
        window.history.back();
    }
    render() {
        return(
            <div className="components-header">
                { this.props.left === 'left' ? (<span className='pull-left back iconfont icon-fanhui' style={{fontSize: '1.1rem'}} onClick={this.handleBack}></span>) : ''}
                {/*<img width="40" src="../../static/images/logo.png" alt="" className="-col-auto" />*/}
                <h1 className="caption">{this.props.title}</h1>
                { this.props.right === 'list' ?
                    <Link className='pull-right iconfont icon-liebiao1'
                          to='/list'
                          style={{fontSize: '1rem'}}
                    ></Link> : ''}
            </div>
        )
    }
}

export default Header;