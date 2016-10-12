'use strict';

module.exports = function (client, stanzas) {

    var NS = 'urn:xmpp:rayo:1';
    client.disco.addFeature(NS);

    var types = stanzas.utils;

    var Dial = stanzas.define({
        name: 'dial',
        element: 'dial',
        namespace: NS,
        fields: {
          to: types.attribute('to'),
          from: types.attribute('from')
        }
    });

    var Header = stanzas.define({
        name: 'header',
        element: 'header',
        fields: {
          name: types.attribute('name'),
          value: types.attribute('value')
        }
    });
    stanzas.extend(Dial, Header, 'headers');

    stanzas.withIQ(function (IQ) {
        stanzas.extend(IQ, Dial);
    });

    client.dial = function(to, number, room, password) {
      client.sendIq({
        to: to,
        type: 'set',
        dial: {
          to: number,
          from: 'fromnumber',
          headers: [
            { name: 'JvbRoomName', value: room },
            // TODO: add password if not empty
            { name: 'JvbRoomPassword', value: password },
          ]
        }
      }, function iqCb(iq){
        // TODO: emit error/success events
        if (iq.err) {
          console.log('ERROR');
          console.log(iq.err);
        }
        console.log(iq.err);
      });
    };

};
