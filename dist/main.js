'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isNode = require('detect-node');

var Channel = function () {
    function Channel() {
        _classCallCheck(this, Channel);

        if (!isNode) {
            if (window.ezChannel !== "undefined" && window.ezChannel !== {}) {
                window.ezChannel = {};
            }

            this.channel = window.ezChannel;
        } else {
            global.ezChannel = {};
            this.channel = global.ezChannel;
        }

        this._init();
    }

    _createClass(Channel, [{
        key: '_init',
        value: function _init() {
            this._getVersion();
            this._buildChannelArray();
        }
    }, {
        key: '_getVersion',
        value: function _getVersion() {
            this.channel.version = '1.2.2';
        }
    }, {
        key: '_buildChannelArray',
        value: function _buildChannelArray() {
            if (typeof this.channel.channels === "undefined") {
                this.channel.channels = [];
            }
        }
    }, {
        key: '_buildInEvent',
        value: function _buildInEvent(channel, name, callback) {
            var c = this._getChannel(channel);
            c.events.push({
                name: name,
                callback: callback
            });
        }
    }, {
        key: '_getChannelEvent',
        value: function _getChannelEvent(channel, event) {
            var c = this._getChannel(channel);

            return c.events.find(function (el) {
                return el.name === event;
            });
        }
    }, {
        key: '_getChannel',
        value: function _getChannel(channel) {
            if (this.channel.channels.length == 0) {
                return null;
            }

            return this.channel.channels.find(function (el) {
                return el.channelName === channel;
            });
        }
    }, {
        key: '_setChannel',
        value: function _setChannel(channel) {
            this.channel.channels.push({
                channelName: channel,
                events: [],
                _id: this._guid()
            });
        }
    }, {
        key: '_deleteChannel',
        value: function _deleteChannel(channel) {
            this.channel.channels = this.channel.channels.filter(function (c) {
                return c.channelName !== channel;
            });
        }
    }, {
        key: '_guid',
        value: function _guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
    }, {
        key: '_send',
        value: function _send(channel, event, data) {
            if (typeof this._getChannel(channel) === "undefined" || channel.length < 1) {
                throw new Error("channel name can´t be undefined or empty");
            }

            this._getChannelEvent(channel, event).callback(data);
        }
    }, {
        key: '_on',
        value: function _on(channel, event, callback) {
            if (typeof this._getChannel(channel) === "undefined" || channel.length < 1) {
                throw new Error("channel name can´t be undefined or empty");
            }

            return this._buildInEvent(channel, event, callback);
        }
    }, {
        key: 'subscribe',
        value: function subscribe() {

            return { send: this._send.bind(this), on: this._on.bind(this) };
        }
    }, {
        key: 'create',
        value: function create(channel) {

            if (typeof channel === "undefined" || channel.length < 1) {
                throw new Error("channel name can´t be undefined or empty");
            }

            this._setChannel(channel);
        }
    }, {
        key: 'remove',
        value: function remove(channel) {

            if (typeof channel === "undefined" || channel.length < 1) {
                throw new Error("channel name can´t be undefined or empty");
            }

            this._deleteChannel(channel);
        }
    }]);

    return Channel;
}();

function load() {
    return new Channel();
}
module.exports = load();