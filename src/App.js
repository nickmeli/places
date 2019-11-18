import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/layouts/Home';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Home />
			</div>
		);
	}
}

export default App;
