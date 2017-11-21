import React, { Component } from 'react';
import News from './model/News'
import './Publisher.css'

class Publisher extends Component {
    componentWillMount = () => {
      this.setState({inputValue: ''})
    }

    handleChange = (e) => {
      let value = e.target.value
      this.setState({
        inputValue: value
      })
    }

    clearInput = () => {
      this.setState({inputValue: ''})
    }

    handleClick = (e) => {
      let value = this.state.inputValue
      let paper = this.props.paper

      if (value) {
        let news = new News(`${value}`, paper)

        paper.getFromInput(news)
        this.props.getFromInput(news)

        this.clearInput()
      }
    }

    handleEnter = (e) => {
      let value = e.target.value,
          paper = this.props.paper,
          isEnter = e.key === 'Enter'

      if (isEnter && value) {
        let news = new News(`${value}`, paper)

        paper.getFromInput(news)
        this.props.getFromInput(news);

        this.clearInput()
      }
    }

    handleServerRequest = () => {
      let paper = this.props.paper
      paper.getFromServer().then(data => this.props.getFromServer(data))
    }

    render() {
      const paperName = this.props.paper.name
      const storage = this.props.storage

      const news = storage.getPaperNews(paperName).reverse()
      return (
          <div className="publisher">
            <span className="publisher-name">{paperName}</span>
            <div className="publisher-news-area" cols="20" rows="10">
              {news.map((newsItem, i) => <p className="news-title" key={i}><span>{news.length - i}</span>{". " + newsItem.title}</p>)}
            </div>

            <div className="publisher-input-area">
              <input className="publisher-input" placeholder="type news title..." value={this.state.inputValue} onChange={this.handleChange} onKeyPress={this.handleEnter} type="text"/>
              <button className="publisher-btn publisher-send-btn" onClick={this.handleClick}>Send</button>
            </div>

            <button className="publisher-btn publisher-server-btn" onClick={this.handleServerRequest}>Get from server</button>
          </div>
      );
    }
}

export default Publisher;
