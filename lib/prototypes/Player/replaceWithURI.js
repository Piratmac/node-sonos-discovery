'use strict';
const logger = require('../../helpers/logger');

function replaceWithURI(uri, metadata) {
  logger.debug(`replacing with URI ${uri}`);
  logger.debug('clearing queue');
  return this.clearQueue()
    .then(() => this.addURIToQueue(uri, metadata))
    .then(() => logger.debug(`triggering queue mode`))
    .then(() => {
      return { uri: `x-rincon-queue:${this.uuid}#0` };
    });
  //#.then((favorite) => {
    //#logger.debug(`setting AVTransport to ${favorite.uri} with metadata ${favorite.metadata}`);
    //#if (this.avTransportUri === favorite.uri) {
    //#logger.debug(`already has ${favorite.uri} as AVTransport, skipping`);
    //#return;
    //#}

    //#return this.setAVTransport(favorite.uri, favorite.metadata);
  //#});
}

module.exports = replaceWithURI;
