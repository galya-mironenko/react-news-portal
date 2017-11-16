import serverReq from './ServerRequest'

class Paper {
	// hardcode
	constructor(name, portal) {
		this.name = name;
		this.portals = [portal.notify] //!!!!!!!tak ne nado

	}

	subscribePortal = (fn) => {
		this.portals.push(fn);
	}

	unSubscribePortal = (fn) => {
		this.portals = this.portals.filter(portal => portal !== fn)
	}

	notifyPortals = (data) => {
		this.portals.forEach(portal => portal(this.name, data))
	}

	getFromServer = () => {
		serverReq.fetchNews('docs/news.json', this);
	}

	getFromInput = (data) => {
		this.notifyPortals(data)
	}
}

export default Paper
