import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './Home';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="wrapper">
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navigation">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand text-uppercase" href="#">Book Search App <span className="label label-success text-capitalize">Google Api</span></a>
                        </div>
                        <div className="collapse navbar-collapse" id="navigation">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="#">About</a></li>
                                <li><a href="#">Features</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <header className="header header-content">
                    <div className="container">
                        <div className="row">
                            <Switch>
                                <Route exact path='/' component={Home} />
                            </Switch>
                        </div>
                    </div>
                </header>
                <footer className="footer text-center">
                    <div className="container">
                        <small>© Copyright 2018. Developed by<a href="https://www.linkedin.com/in/ramakrishnapokuri">@rama</a></small>
                    </div>
                </footer>
            </div>


        );
    }
}
export default App;