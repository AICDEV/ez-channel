class Channel {
    constructor() {
      if(window.ezChannel !== "undefined" && window.ezChannel !== {} ) {
          window.ezChannel = {};
      }

      this.channel = window.ezChannel;
      this._init();
    }

    _init() {
        this._getVersion();
        this._buildChannelArray();
    }

    _getVersion() {
        this.channel.version = '1.2.2';
    }

    _buildChannelArray() {
        if(typeof this.channel.channels === "undefined") {
            this.channel.channels = [];
        }
    }

    _buildInEvent(channel, name, callback) {
        let c = this._getChannel(channel);
        c.events.push({
            name: name,
            callback: callback
        });
    }

    _getChannelEvent(channel, event) {
        let c = this._getChannel(channel);

        return c.events.find((el) => {
            return el.name === event;
        });
    }

    _getChannel(channel) {
        if(this.channel.channels.length == 0 ) {
            return null;
        }

        return this.channel.channels.find((el) => {
            return el.channelName === channel;
        });
    }

    _setChannel(channel) {
        this.channel.channels.push({
            channelName: channel,
            events:  [],
            _id: this._guid()
        });
    }

    _deleteChannel(channel) {
        this.channel.channels = this.channel.channels.filter(c => c.channelName !== channel);
    }

    _guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    _send(channel, event, data) {
        if(typeof this._getChannel(channel) === "undefined" || channel.length < 1 ) {
            throw new Error("channel name can´t be undefined or empty");
        }

        this._getChannelEvent(channel, event).callback(data);
    }

    _on(channel, event, callback) {
        if(typeof this._getChannel(channel) === "undefined" || channel.length < 1 ) {
            throw new Error("channel name can´t be undefined or empty");
        }

        return this._buildInEvent(channel, event, callback);
    }

    subscribe() {

        return {send: this._send.bind(this), on: this._on.bind(this)};
    }

    create(channel) {

        if(typeof channel === "undefined" || channel.length < 1) {
            throw new Error("channel name can´t be undefined or empty");
        }

        this._setChannel(channel);
    }

    remove(channel) {

        if(typeof channel === "undefined" || channel.length < 1) {
            throw new Error("channel name can´t be undefined or empty");
        }

        this._deleteChannel(channel);
    }
}
function load() {
  return new Channel();
}
module.exports = load();
