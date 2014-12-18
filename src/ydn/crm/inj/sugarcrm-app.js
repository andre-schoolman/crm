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
goog.require('ydn.crm.gmail.AttachmentInjector');
goog.require('ydn.crm.sugarcrm.ContextWidget');
goog.require('ydn.crm.gmail.GmailObserver');
goog.require('ydn.crm.gmail.MessageHeaderInjector');
goog.require('ydn.crm.inj.GmailContextContainer');
goog.require('ydn.crm.inj.Hud');
goog.require('ydn.crm.msg.Manager');
goog.require('ydn.crm.shared');
goog.require('ydn.crm.sugarcrm.model.Archiver');
goog.require('ydn.crm.tracking.Tracker');
goog.require('ydn.crm.ui.SidebarPanel');
goog.require('ydn.debug');
goog.require('ydn.gmail.Utils.GmailViewState');
goog.require('ydn.msg.Pipe');



/**
 * SugarCRM app.
 * @param {ydn.crm.gmail.MessageHeaderInjector} heading_injector
 * @param {ydn.crm.gmail.GmailObserver} gmail_observer
 * @param {ydn.crm.gmail.ComposeObserver} compose_observer
 * @param {ydn.crm.inj.ContextContainer} renderer
 * @param {ydn.crm.inj.Hud} hud
 * @constructor
 * @struct
 */
ydn.crm.inj.SugarCrmApp = function(heading_injector, gmail_observer,
                                   compose_observer, renderer, hud) {

  /**
   * @final
   * @type {ydn.crm.gmail.MessageHeaderInjector}
   * @private
   */
  this.heading_injector_ = heading_injector;
  /**
   * @final
   * @type {ydn.crm.gmail.AttachmentInjector}
   * @private
   */
  this.attachment_injector_ = new ydn.crm.gmail.AttachmentInjector(gmail_observer);
  /**
   * @protected
   * @type {ydn.crm.sugarcrm.ContextWidget}
   */
  this.context_panel = new ydn.crm.sugarcrm.ContextWidget(gmail_observer, compose_observer);

  this.context_panel.render(renderer.getContentElement());

  /**
   * @final
   * @type {ydn.crm.ui.SidebarPanel}
   */
  this.sidebar_panel = new ydn.crm.ui.SidebarPanel();

  /**
   * @final
   * @type {ydn.crm.inj.Hud}
   */
  this.hud = hud;

  this.handler = new goog.events.EventHandler(this);

  this.handler.listen(this.attachment_injector_,
      ydn.crm.sugarcrm.events.EventType.VIEW_RECORD,
      this.onViewRecord_);

};


/**
 * @define {boolean} debug flag.
 */
ydn.crm.inj.SugarCrmApp.DEBUG = false;


/**
 * Sniff contact and set to model.
 * @param {ydn.crm.sugarcrm.events.RecordViewEvent} e
 * @private
 */
ydn.crm.inj.SugarCrmApp.prototype.onViewRecord_ = function(e) {
  if (ydn.crm.inj.SugarCrmApp.DEBUG) {
    window.console.log('view record ' + e.module + ':' + e.id);
  }
  this.sidebar_panel.showRecord(e.module, e.id);

};


/**
 * @param {ydn.msg.Event} e
 * @protected
 */
ydn.crm.inj.SugarCrmApp.prototype.handleSugarDomainChanges = function(e) {
  this.updateSugarPanels_();
};


/**
 * Initialize UI.
 */
ydn.crm.inj.SugarCrmApp.prototype.init = function() {

  this.hud.addPanel(this.sidebar_panel);

  var us = ydn.crm.ui.UserSetting.getInstance();

  goog.events.listen(us,
      [ydn.crm.ui.UserSetting.EventType.LOGIN,
        ydn.crm.ui.UserSetting.EventType.LOGOUT],
      this.onUserStatusChange, false, this);

  goog.events.listen(ydn.msg.getMain(),
      [ydn.crm.Ch.BReq.SUGARCRM],
      this.handleSugarDomainChanges, false, this);

  if (ydn.crm.inj.SugarCrmApp.DEBUG) {
    window.console.info('SugarCrmApp initialized.');
  }
};


/**
 * Reset user setting
 * @param {goog.events.Event} e
 * @protected
 */
ydn.crm.inj.SugarCrmApp.prototype.onUserStatusChange = function(e) {
  if (ydn.crm.inj.SugarCrmApp.DEBUG) {
    window.console.log('updating for ' + e.type);
  }
  var us = /** @type {ydn.crm.ui.UserSetting} */ (ydn.crm.ui.UserSetting.getInstance());
  if (us.hasValidLogin()) {
    this.sidebar_panel.setVisible(true);
    this.updateSugarPanels_();
  } else {
    // we are not showing any UI if user is not login.
    // user should use browser bandage to login and refresh the page.
    this.heading_injector_.setSugar(null);
    this.sidebar_panel.setVisible(false);
    this.updateSugarPanels_();
  }
};


/**
 * @param {SugarCrm.About} about
 * @private
 */
ydn.crm.inj.SugarCrmApp.prototype.updateSugarCrm_ = function(about) {


  this.sidebar_panel.setSugarCrm(about);

  var us = ydn.crm.ui.UserSetting.getInstance();

  if (!us.hasValidLogin()) {
    this.context_panel.setSugarCrm(null);
    this.heading_injector_.setSugar(null);
    this.attachment_injector_.setSugar(null);
    return;
  }

  var ch = ydn.msg.getChannel(ydn.msg.Group.SUGAR, about.domain);
  ch.send(ydn.crm.Ch.SReq.DETAILS).addCallback(function(x) {
    var details = /** @type {SugarCrm.Details} */ (x);
    for (var i = 0; i < details.modulesInfo.length; i++) {
      ydn.crm.sugarcrm.fixSugarCrmModuleMeta(details.modulesInfo[i]);
    }
    var ac = us.getLoginEmail();
    var sugar = new ydn.crm.sugarcrm.model.GDataSugar(details.about,
        details.modulesInfo, ac, details.serverInfo);
    this.context_panel.setSugarCrm(sugar);
    var archiver = new ydn.crm.sugarcrm.model.Archiver(sugar);
    this.heading_injector_.setSugar(archiver);
    this.attachment_injector_.setSugar(sugar);
  }, this);

};


/**
 * Update sugar panels.
 * @private
 */
ydn.crm.inj.SugarCrmApp.prototype.updateSugarPanels_ = function() {
  if (ydn.crm.inj.SugarCrmApp.DEBUG) {
    window.console.info('preparing to update sugar panels');
  }
  ydn.msg.getChannel().send(ydn.crm.Ch.Req.LIST_SUGAR).addCallback(
      function(arr) {
        if (ydn.crm.inj.SugarCrmApp.DEBUG) {
          window.console.log(arr);
        }
        var sugars = /** @type {Array<SugarCrm.About>} */ (arr);
        /**
         * @type {SugarCrm.About}
         */
        var about;
        for (var i = 0; i < sugars.length; i++) {
          var obj = sugars[i];
          if (obj.isLogin) {
            this.updateSugarCrm_(obj);
            return;
          }
        }
        if (ydn.crm.inj.SugarCrmApp.DEBUG) {
          window.console.info('no sugarcrm instance');
        }
        this.attachment_injector_.setSugar(null);
        this.sidebar_panel.setSugarCrm(null);
        this.context_panel.setSugarCrm(null);
      }, this);
};




