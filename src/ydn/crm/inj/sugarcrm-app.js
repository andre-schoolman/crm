// Copyright 2014 YDN Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * @fileoverview SugarCRM app.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */

goog.provide('ydn.crm.inj.SugarCrmApp');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.history.Html5History');
goog.require('goog.style');
goog.require('goog.ui.Component.EventType');
goog.require('goog.ui.Tab');
goog.require('goog.ui.TabBar');
goog.require('templ.ydn.crm.inj');
goog.require('ydn.crm.base');
goog.require('ydn.crm.gmail.ContextSidebar');
goog.require('ydn.crm.gmail.GmailObserver');
goog.require('ydn.crm.gmail.Tracker');
goog.require('ydn.crm.inj');
goog.require('ydn.crm.inj.Hud');
goog.require('ydn.crm.inj.InlineRenderer');
goog.require('ydn.crm.msg.Manager');
goog.require('ydn.crm.shared');
goog.require('ydn.debug');
goog.require('ydn.gmail.Utils.GmailViewState');
goog.require('ydn.msg.Pipe');



/**
 * SugarCRM app.
 * @param {ydn.crm.gmail.GmailObserver} gmail_observer
 * @param {ydn.crm.gmail.ComposeObserver} compose_observer
 * @constructor
 * @struct
 */
ydn.crm.inj.SugarCrmApp = function(gmail_observer, compose_observer) {

  /**
   * @protected
   * @type {ydn.crm.gmail.ContextSidebar}
   */
  this.sidebar = new ydn.crm.gmail.ContextSidebar(compose_observer);
  var renderer = new ydn.crm.inj.InlineRenderer(gmail_observer);
  this.sidebar.render(renderer.getContentElement());

  /**
   * @final
   * @type {ydn.crm.inj.Hud}
   */
  this.hud = new ydn.crm.inj.Hud();


  this.handler = new goog.events.EventHandler(this);
  this.handler.listen(gmail_observer, ydn.crm.gmail.GmailObserver.EventType.CONTEXT_CHANGE,
      this.onGmailContextEvent_);
  this.handler.listen(gmail_observer, ydn.crm.gmail.GmailObserver.EventType.PAGE_CHANGE,
      this.onGmailPageChanged);
};


/**
 * @define {boolean} debug flag.
 */
ydn.crm.inj.SugarCrmApp.DEBUG = false;


/**
 * Sniff contact and set to model.
 * @param {ydn.crm.gmail.GmailObserver.ContextRightBarEvent} e
 * @private
 */
ydn.crm.inj.SugarCrmApp.prototype.onGmailContextEvent_ = function(e) {

  this.sidebar.updateForNewContact(e.context);

};


/**
 * Initialize UI.
 */
ydn.crm.inj.SugarCrmApp.prototype.init = function() {
  this.hud.render();
};


/**
 * @param {ydn.crm.gmail.GmailObserver.PageChangeEvent} e
 */
ydn.crm.inj.SugarCrmApp.prototype.onGmailPageChanged = function(e) {
  if (ydn.crm.inj.SugarCrmApp.DEBUG) {
    window.console.info(e.page_type);
  }
  if (e.page_type == ydn.gmail.Utils.GmailViewState.EMAIL) {
    this.sidebar.updateForNewContact(null); // let know, new context is coming.
  }
};


/**
 * Reset user setting
 * @param {ydn.crm.ui.UserSetting} us
 */
ydn.crm.inj.SugarCrmApp.prototype.onUserStatusChange = function(us) {
  if (us.hasValidLogin()) {
    this.sidebar.updateHeader();
    this.hud.updateHeader();
    this.updateSugarPanels();
  } else {
    // we are not showing any UI if user is not login.
    // user should use browser bandage to login and refresh the page.
    this.sidebar.updateHeader();
    this.hud.updateHeader();
    this.sidebar.updateSugarPanels([]);
    this.hud.updateSugarPanels([]);
  }
};


/**
 * Update sugar panels.
 */
ydn.crm.inj.SugarCrmApp.prototype.updateSugarPanels = function() {
  ydn.msg.getChannel().send(ydn.crm.Ch.Req.LIST_SUGAR_DOMAIN).addCallback(
      function(sugars) {
        if (ydn.crm.ui.SugarListPanel.DEBUG) {
          window.console.log(sugars);
        }
        this.sidebar.updateSugarPanels(sugars);
        this.hud.updateSugarPanels(sugars);
      }, this);
};

