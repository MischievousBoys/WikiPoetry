var React = require('react');
var WikiPoetryActionCreators = require('./../../actions/WikiPoetryActionCreators')
var Featured = require('./Featured.react');
var InTheNews = require('./InTheNews.react');
var DidYouKnow = require('./DidYouKnow.react');
var OnThisDay = require('./OnThisDay.react');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');
var API = require('./../../api/wikiApi');

function getHomeState() {
  return {
    type: WikiPoetryStore.getType(),
    term: WikiPoetryStore.getTerm(),
    featured: {
      link: [],
      picture: '',
      text: ''
    },
    know: {
      link: [],
      picture: '',
      tag: '',
      text: [],
    },
    news: {
      link: [],
      picture: '',
      tag: '',
      text: [],
    },
    day: {
      link: [],
      picture: '',
      tag: '',
      text: [],
    },
    load: WikiPoetryStore.getLoad()
  };
}

var HomeContent = React.createClass({
  //set initial state
  getInitialState: function () {
    return getHomeState();
  },

  //Let components render first then perform AJAX request
  componentDidMount: function () {
    WikiPoetryStore.addChangeListener(this._onChange);
    WikiPoetryStore.addTypeListener(this._onType);
    WikiPoetryActionCreators.getHomeContent(this.state.type);
  },

  componentWillUnmount: function() {
    WikiPoetryStore.removeChangeListener(this._onChange);
    WikiPoetryStore.removeTypeListener(this._onType);
  },

  _onChange: function() {
    this.setState(getHomeState());
    var homeContent = WikiPoetryStore.getHome();
    this.setState(homeContent);
  },

  _onType: function() {
    this.setState({
      type: WikiPoetryStore.getType(),
      load: WikiPoetryStore.getLoad()
    })
    WikiPoetryActionCreators.getHomeContent(WikiPoetryStore.getType());
  },

  render: function () {
    return (
      <div className="main-container">
        <section className="leftarticlegroup six columns">
          <article className="homearticle featured">
            <Featured
              text={this.state.featured.text}
              link={this.state.featured.link}
              picture={this.state.featured.picture} />
          </article>
          <article className="homearticle inthenews">
            <DidYouKnow
              text={this.state.know.text}
              link={this.state.know.link}
              picture={this.state.know.picture} />
          </article>
        </section>
        <section className="rightarticlegroup row six columns">
          <article className="homearticle didyouknow">
            <InTheNews
              text={this.state.news.text}
              link={this.state.news.link}
              picture={this.state.news.picture} />
          </article>
          <article className="homearticle onthisday">
            <OnThisDay
              text={this.state.day.text}
              link={this.state.day.link}
              picture={this.state.day.picture} />
          </article>
        </section>
      </div>
    );
  }
});

module.exports = HomeContent;
