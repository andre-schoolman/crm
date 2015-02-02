// Copyright 2014 YDN Authors. All Rights Reserved.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.


/**
 * @fileoverview FullContact social network profile.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */

goog.provide('ydn.social.PiplProfile');
goog.require('ydn.social.Profile');



/**
 * FullContact social network profile.
 * @param {ydn.social.Network} network
 * @param {!CrmApp.PiplRecord} data
 * @constructor
 * @struct
 * @extends {ydn.social.Profile}
 */
ydn.social.PiplProfile = function(network, data) {
  goog.base(this, network);
  /**
   * @final
   * @type {!CrmApp.PiplRecord}
   */
  this.data = data;
};
goog.inherits(ydn.social.PiplProfile, ydn.social.Profile);


/**
 * Parse Pipl respond record
 * @param {CrmApp.PiplRespond} respond
 * @param {ydn.social.Network} network
 * @return {ydn.social.PiplProfile}
 */
ydn.social.PiplProfile.parse = function(respond, network) {
  if (!respond || !respond.records) {
    return null;
  }
  for (var i = 0; i < respond.records.length; i++) {
    var r = respond.records[i];
    if (!r['@query_params_match']) {
      continue;
    }
    var domain = ydn.social.network2domain(network);
    if (r.source.domain == domain) {
      return new ydn.social.PiplProfile(network, r);
    }
  }
  return null;
};


/**
 * @override
 */
ydn.social.PiplProfile.prototype.getSourceName = function() {
  return 'Pipl';
};


/**
 * @return {string}
 * @private
 */
ydn.social.PiplProfile.prototype.getUserId_ = function() {
  return this.data.user_ids ? this.data.user_ids[0].content : '';
};


/**
 * @return {string}
 * @private
 */
ydn.social.PiplProfile.prototype.getScreenName_ = function() {
  return this.data.usernames ? this.data.usernames[0].content : '';
};


/**
 * Get user id. If user id is not available, screen name should return.
 * @return {string}
 */
ydn.social.PiplProfile.prototype.getUserId = function() {
  return this.getUserId_() || this.getScreenName_();
};


/**
 * Get screen name. If screen name is not available, user id should return;
 * @return {string}
 */
ydn.social.PiplProfile.prototype.getScreenName = function() {
  return this.getScreenName_() || this.getUserId_();
};


/**
 * Get social network profile URL.
 * @return {string|undefined}
 */
ydn.social.PiplProfile.prototype.getProfileUrl = function() {
  return this.data.source.url;
};


/**
 * Get social network profile photo URL.
 * @return {string|undefined}
 */
ydn.social.PiplProfile.prototype.getPhotoUrl = function() {
  return this.data.images ? this.data.images[0].url : undefined;
};

