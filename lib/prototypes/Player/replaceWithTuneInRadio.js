'use strict';
const logger = require('../../helpers/logger');

function isRadio(uri) {
  return uri.startsWith('x-sonosapi-stream:') ||
    uri.startsWith('x-sonosapi-radio:') ||
    uri.startsWith('pndrradio:') ||
    uri.startsWith('x-sonosapi-hls:') ||
    uri.startsWith('x-sonosprog-http:');
}

function replaceWithTuneInRadio(radio) {
  if (radio.id == undefined)
    throw new Error('Radio ID not provided');

  var metadata = '<DIDL-Lite xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:upnp="urn:schemas-upnp-org:metadata-1-0/upnp/" xmlns:r="urn:schemas-rinconnetworks-com:metadata-1-0/" xmlns="urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/"><item id="irrelevant" parentID="irrelevant" restricted="true">';
  if (radio.title)
    metadata += `<dc:title>${radio.title}</dc:title>`;
  metadata += '<upnp:class>object.item.audioItem.audioBroadcast</upnp:class>';
  if (radio.image)
    metadata += `<upnp:albumArtURI>${radio.image}</upnp:albumArtURI>`;
  if (radio.description)
    metadata += '<r:description>${radio.description}</r:description>';

  metadata += '<desc id="cdudn" nameSpace="urn:schemas-rinconnetworks-com:metadata-1-0/">SA_RINCON65031_</desc></item></DIDL-Lite>';

  var uri = `x-sonosapi-stream:${radio.id}?sid=254&flags=8224&sn=0`;


  logger.debug(`setting AVTransport to ${uri}`);
  if (this.avTransportUri === uri) {
    logger.debug(`already has ${uri} as AVTransport, skipping`);
    return;
  }

  return this.setAVTransport(uri, metadata);
}

module.exports = replaceWithTuneInRadio;
