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
 * @fileoverview Home page for SugarCRM in CRMinInbox suite.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.sugarcrm.Page');
goog.require('ydn.crm.TrackingSettingWidget');
goog.require('ydn.crm.gdata.CredentialWidget');
goog.require('ydn.crm.sugarcrm.Widget');
goog.require('ydn.crm.sugarcrm.WidgetModel');



/**
 * Home page for SugarCRM in CRMinInbox suite.
 * @constructor
 * @implements {ydn.crm.IPage}
 * @struct
 */
ydn.crm.sugarcrm.Page = function() {
  /**
   * @type {Element}
   * @private
   */
  this.root_ = document.createElement('div');
  /**
   * @protected
   * @type {ydn.crm.sugarcrm.Widget}
   */
  this.sugar_widget = new ydn.crm.sugarcrm.Widget(new ydn.crm.sugarcrm.WidgetModel());
  this.sugar_widget.show_stats = true;
  this.model_updated_after_login_ = false; // ugly

  /**
   * @protected
   * @type {ydn.crm.gdata.CredentialWidget}
   */
  this.gdata_widget = new ydn.crm.gdata.CredentialWidget();
};


/**
 * @override
 */
ydn.crm.sugarcrm.Page.prototype.render = function(el) {
  var temp = ydn.ui.getTemplateById('sugarcrm-home-template').content;
  this.root_.appendChild(temp.cloneNode(true));
  var gdata_ele = this.root_.querySelector('#gdata');
  this.gdata_widget.render(gdata_ele);
  if (ydn.crm.UserSetting.hasFeature(ydn.crm.base.Feature.TRACKING)) {
    var tracking = new ydn.crm.TrackingSettingWidget();
    tracking.render(gdata_ele.parentElement);
  }
  this.sugar_widget.render(this.root_.querySelector('#sugarcrm-widget'));
  el.appendChild(this.root_);
};


/**
 * @override
 */
ydn.crm.sugarcrm.Page.prototype.onPageShow = function() {
  if (this.model_updated_after_login_) {
    return;
  }
  this.gdata_widget.refresh();
  ydn.crm.sugarcrm.WidgetModel.list().addCallbacks(function(models) {
    for (var i = 0; i < models.length; i++) {
      var model = models[i];
      if (model.isLogin()) {
        this.model_updated_after_login_ = true;
        this.sugar_widget.setModel(model);
        break;
      }
    }
  }, function(e) {
    ydn.crm.msg.Manager.addStatus('listing sugarcrm model fail ' + (e.message || e));
  }, this);
};


/**
 * @override
 */
ydn.crm.sugarcrm.Page.prototype.toString = function() {
  return 'Home';
};
