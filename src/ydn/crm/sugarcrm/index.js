/**
 * @fileoverview Define SugarCRM meta data.
 */


goog.provide('ydn.crm.su');


/**
 * @define {boolean} running in raw mode.
 */
ydn.crm.su.RAW = false;


/**
 * @define {string} version major.
 */
ydn.crm.su.VERSION_MAJOR = '';


/**
 * @define {string} version minor.
 */
ydn.crm.su.VERSION_MINOR = '';


/**
 * @define {string} version patch.
 */
ydn.crm.su.VERSION_PATCH = '';


/**
 * @const
 * @type {string}
 */
ydn.crm.su.version = ydn.crm.su.VERSION_MAJOR + '.' +
    ydn.crm.su.VERSION_MINOR + '.' +
    ydn.crm.su.VERSION_PATCH;


/**
 * @const
 * @type {string}
 */
ydn.crm.su.VER = '0.12.4';


/**
 * @enum {string}
 */
ydn.crm.su.Version = {
  PREVIOUS: '0.10.17',
  STABLE: ydn.crm.su.VER,
  RC: ydn.crm.su.VER,
  BETA: ydn.crm.su.VER,
  EDGE: 'edge'
};


/**
 * @enum {string}
 */
ydn.crm.su.ModuleName = {
  ACCOUNTS: 'Accounts',
  CASES: 'Cases',
  CALLS: 'Calls',
  CAMPAIGNS: 'Campaigns',
  CONTACTS: 'Contacts',
  DOCUMENTS: 'Documents',
  MEETINGS: 'Meetings',
  EMAILS: 'Emails',
  EMAIL_TEXT: 'EmailText',
  EMAIL_TEMPLATES: 'EmailTemplates',
  EMPLOYEES: 'Employees',
  LEADS: 'Leads',
  NOTES: 'Notes',
  OPPORTUNITIES: 'Opportunities',
  PROSPECTS: 'Prospects',
  TASKS: 'Tasks',
  TEAMS: 'Teams',
  TEAM_SETS: 'TeamSets',
  USERS: 'Users'
};


/**
 * List of modules used in this app.
 * @type {Array.<ydn.crm.su.ModuleName>}
 */
ydn.crm.su.Modules = [ydn.crm.su.ModuleName.ACCOUNTS,
  ydn.crm.su.ModuleName.CALLS,
  ydn.crm.su.ModuleName.CAMPAIGNS,
  ydn.crm.su.ModuleName.CASES,
  ydn.crm.su.ModuleName.CONTACTS,
  ydn.crm.su.ModuleName.DOCUMENTS,
  ydn.crm.su.ModuleName.MEETINGS,
  ydn.crm.su.ModuleName.EMAILS,
  // Note: EMAIL_TEXT is not a separate module but part of EMAILS module
  ydn.crm.su.ModuleName.EMAIL_TEMPLATES,
  // Note: Employees module use 'users' table instead.
  ydn.crm.su.ModuleName.EMPLOYEES,
  ydn.crm.su.ModuleName.LEADS,
  ydn.crm.su.ModuleName.NOTES,
  ydn.crm.su.ModuleName.OPPORTUNITIES,
  ydn.crm.su.ModuleName.PROSPECTS,
  ydn.crm.su.ModuleName.TASKS,
  ydn.crm.su.ModuleName.TEAMS,
  ydn.crm.su.ModuleName.TEAM_SETS,
  ydn.crm.su.ModuleName.USERS];


/**
 * @param {string} name
 * @return {ydn.crm.su.ModuleName}
 */
ydn.crm.su.assertModuleName = function(name) {
  goog.asserts.assert(ydn.crm.su.Modules.indexOf(name) >= 0, name);
  return /** @type {ydn.crm.su.ModuleName} */ (name);
};


/**
 * List of modules cache locally
 * @type {Array.<ydn.crm.su.ModuleName>}
 */
ydn.crm.su.CacheModules = [ydn.crm.su.ModuleName.USERS,
  // sync template first, so that it is appear immediately after login.
  ydn.crm.su.ModuleName.EMAIL_TEMPLATES,
  ydn.crm.su.ModuleName.ACCOUNTS,
  ydn.crm.su.ModuleName.CONTACTS,
  ydn.crm.su.ModuleName.DOCUMENTS,
  ydn.crm.su.ModuleName.EMPLOYEES,
  ydn.crm.su.ModuleName.LEADS,
  ydn.crm.su.ModuleName.NOTES,
  ydn.crm.su.ModuleName.TASKS,
  ydn.crm.su.ModuleName.MEETINGS,
  ydn.crm.su.ModuleName.CALLS,
  ydn.crm.su.ModuleName.CASES,
  ydn.crm.su.ModuleName.OPPORTUNITIES,
  ydn.crm.su.ModuleName.EMAILS
];


/**
 * List of modules that sync. Synchronization will queue in this order.
 * @type {Array.<ydn.crm.su.ModuleName>}
 */
ydn.crm.su.SyncModules = [ydn.crm.su.ModuleName.USERS,
  // sync template first, so that it is appear immediately after login.
  ydn.crm.su.ModuleName.EMAIL_TEMPLATES,
  ydn.crm.su.ModuleName.CONTACTS
];


/**
 * Cache only last fetch.
 * @type {Array.<ydn.crm.su.ModuleName>}
 */
ydn.crm.su.PartialSyncModules = [ydn.crm.su.ModuleName.TASKS,
  ydn.crm.su.ModuleName.MEETINGS,
  ydn.crm.su.ModuleName.LEADS,
  ydn.crm.su.ModuleName.CALLS,
  ydn.crm.su.ModuleName.CASES,
  ydn.crm.su.ModuleName.OPPORTUNITIES
];


/**
 * Primary modules are those direct relationship with contact entry.
 * @const
 * @type {Array.<ydn.crm.su.ModuleName>}
 */
ydn.crm.su.PRIMARY_MODULES = [ydn.crm.su.ModuleName.ACCOUNTS,
  ydn.crm.su.ModuleName.CONTACTS,
  ydn.crm.su.ModuleName.LEADS];


/**
 * Secondary modules are those having relationship with primary modules.
 * @const
 * @type {Array.<ydn.crm.su.ModuleName>}
 */
ydn.crm.su.SECONDARY_MODULES = [ydn.crm.su.ModuleName.NOTES,
  ydn.crm.su.ModuleName.TASKS];


/**
 * Modules represent to people.
 * Note: Ordering is determined by priority of record type when an email identifier
 * is matched among multiple record types.
 * @see on ydn.crm.su.model.GDataSugar#updateContext_
 * @const
 * @type {Array.<ydn.crm.su.ModuleName>}
 */
ydn.crm.su.PEOPLE_MODULES = [
  ydn.crm.su.ModuleName.CONTACTS,
  ydn.crm.su.ModuleName.LEADS,
  ydn.crm.su.ModuleName.ACCOUNTS];


/**
 * Modules showed in inbox sidebar.
 * @const
 * @type {Array.<ydn.crm.su.ModuleName>}
 */
ydn.crm.su.PANEL_MODULES = [ydn.crm.su.ModuleName.CONTACTS,
  ydn.crm.su.ModuleName.LEADS];


/**
 * Modules represent simple module.
 * @const
 * @type {Array.<ydn.crm.su.ModuleName>}
 */
ydn.crm.su.SIMPLE_MODULES = [ydn.crm.su.ModuleName.NOTES];


/**
 * Modules supporting edit function.
 * @const
 * @type {Array.<ydn.crm.su.ModuleName>}
 */
ydn.crm.su.EDITABLE_MODULES = [ydn.crm.su.ModuleName.ACCOUNTS,
  ydn.crm.su.ModuleName.CALLS,
  ydn.crm.su.ModuleName.CASES,
  ydn.crm.su.ModuleName.CONTACTS,
  ydn.crm.su.ModuleName.LEADS,
  ydn.crm.su.ModuleName.MEETINGS,
  ydn.crm.su.ModuleName.OPPORTUNITIES,
  ydn.crm.su.ModuleName.NOTES,
  ydn.crm.su.ModuleName.TASKS];


/**
 * Modules in activity stream.
 * SugarCE-Full-6.5.16/service/v3/SugarWebServiceUtilv3.php/get_upcoming_activities
 * @const
 * @type {Array.<ydn.crm.su.ModuleName>}
 */
ydn.crm.su.ACTIVITY_MODULES = [ydn.crm.su.ModuleName.MEETINGS,
  ydn.crm.su.ModuleName.CALLS,
  ydn.crm.su.ModuleName.TASKS,
  ydn.crm.su.ModuleName.CASES,
  ydn.crm.su.ModuleName.OPPORTUNITIES
];


/**
 * Default related modules.
 * @const
 * @type {Array.<ydn.crm.su.ModuleName>}
 */
ydn.crm.su.relatedModules = [
  ydn.crm.su.ModuleName.MEETINGS,
  ydn.crm.su.ModuleName.CALLS,
  ydn.crm.su.ModuleName.TASKS,
  ydn.crm.su.ModuleName.OPPORTUNITIES
];


/**
 * @param {string} name
 * @return {ydn.crm.su.ModuleName}
 */
ydn.crm.su.toModuleName = function(name) {
  var idx = ydn.crm.su.Modules.indexOf(name);
  goog.asserts.assert(idx >= 0, 'Invalid module name ' + name);
  return ydn.crm.su.Modules[idx];
};


/**
 * @enum {string} cache option.
 */
ydn.crm.su.CacheOption = {
  FULL: 'full',
  PARTIAL: 'partial',
  OPPORTUNISTIC: 'opportunistic',
  NONE: 'none'
};


/**
 * Check support valid module name.
 * @param {string} name
 * @return {boolean}
 */
ydn.crm.su.isValidModule = function(name) {
  return ydn.crm.su.Modules.indexOf(name) >= 0;
};


/**
 * Convert SugarCRM boolean string to boolean.
 * @param {SugarCrm.Boolean} value
 * @return {boolean}
 */
ydn.crm.su.toBoolean = function(value) {
  if (value == '1') {
    return true;
  } else {
    return false;
  }
};


/**
 * Get url for contact entry of given id for sugarcrm version 6
 * @param {string} base_url
 * @param {string} m_name
 * @param {string} id
 * @return {string}
 */
ydn.crm.su.getViewLinkV6 = function(base_url, m_name, id) {
  return base_url + '/index.php?module=' + m_name +
      '&action=DetailView&record=' + id;
};


/**
 * @param {string} url
 * @return {ydn.crm.su.ViewLinkParts}
 */
ydn.crm.su.parseViewLinkV6 = function(url) {
  var parts = url.match(/.+?module=(\w+)&.+?record=(.+)/);
  return {
    moduleName: /** @type {ydn.crm.su.ModuleName} */(parts[1]),
    id: parts[2]
  };
};


/**
 * Get url for contact entry of given id for sugarcrm version 7
 * @param {string} base_url
 * @param {string} m_name
 * @param {string} id
 * @return {string}
 */
ydn.crm.su.getViewLinkV7 = function(base_url, m_name, id) {
  return base_url + '#' + m_name + '/' + id;
};


/**
 * @typedef {{
 *   moduleName: ydn.crm.su.ModuleName,
 *   id: string
 * }}
 */
ydn.crm.su.ViewLinkParts;


/**
 * @param {string} url
 * @return {ydn.crm.su.ViewLinkParts}
 */
ydn.crm.su.parseViewLinkV7 = function(url) {
  var parts = url.match(/.+?#(\w+)\/(.+)/);
  return {
    moduleName: /** @type {ydn.crm.su.ModuleName} */(parts[1]),
    id: parts[2]
  };
};


/**
 * Convert to two letter module symbol, such as, Co, Le.
 * @param {ydn.crm.su.ModuleName} m_name module name.
 * @return {string} module symbol.
 */
ydn.crm.su.toModuleSymbol = function(m_name) {
  if (!m_name) {
    return '';
  } else if (m_name == 'Employees') {
    return 'Ep';
  } else if (m_name == 'Cases') {
    return 'Cs';
  }
  var caps = m_name.match(/[A-Z]/g);
  if (caps && caps.length > 1) {
    return caps.join('');
  } else {
    return m_name.substr(0, 2);
  }
};


/**
 * @const
 * @type {ydn.crm.su.ModuleName} Default module when no module name
 * is defined in new record panel, etc.
 */
ydn.crm.su.DEFAULT_MODULE = ydn.crm.su.ModuleName.LEADS;


/**
 * SugarCRM module has nasty habit of not declearing group name if previous
 * field name is similar to previous field name.
 * Also name, first_name, and last_name, full_name are not into name group.
 * email, email1, email2, etc are gorup into email.
 * @param {SugarCrm.ModuleInfo} info
 */
ydn.crm.su.fixSugarCrmModuleMeta = function(info) {
  var last_field_name = '';
  var last_group = '';
  for (var name in info.module_fields) {
    /**
     * @type {SugarCrm.ModuleField}
     */
    var mf = info.module_fields[name];
    if (!mf) {
      continue;
    }
    name = mf.name || name;

    // fix calculated field
    if (['created_by', 'created_by_name', 'date_entered', 'date_modified',
      'deleted', 'modified_user_id', 'modified_by_name',
      'id'].indexOf(name) >= 0) {
      mf.calculated = true;
    }

    // fix appointment group
    if (['date_start', 'date_end', 'date_due', 'duration_hours',
      'duration_minutes'].indexOf(name) >= 0) {
      mf.group = 'appointment';
    }

    // fix name group
    if ([ydn.crm.su.ModuleName.CONTACTS,
      ydn.crm.su.ModuleName.LEADS].indexOf(info.module_name) >= 0 &&
        ['salutation', 'name', 'last_name', 'first_name', 'full_name'
        ].indexOf(name) >= 0) {
      mf.group = 'name';
    }

    if ([ydn.crm.su.ModuleName.CONTACTS,
      ydn.crm.su.ModuleName.LEADS].indexOf(info.module_name) >= 0 &&
        ['assistant', 'assistant_phone'].indexOf(name) >= 0) {
      mf.group = 'assistant';
    }

    if (['amount', 'amount_usdollar', 'best_case', 'worst_case'].indexOf(name) >= 0) {
      mf.group = 'amount';
    } else if (['assigned_user_name'].indexOf(name) >= 0) {
      mf.group = 'assigned_user_name';
    } else if (['contact_name', 'contact_phone', 'contact_email', 'contact_id'].indexOf(name) >= 0) {
      mf.group = 'contact';
    } else if (['account_name', 'account_name1', 'account_id'].indexOf(name) >= 0) {
      mf.group = 'account';
    } else if (['parent_name', 'parent_type', 'parent_id'].indexOf(name) >= 0) {
      mf.group = 'parent';
    } else if (/^email\d?$/.test(name)) {
      mf.group = 'email';
    } else if (/^phone?/.test(name)) {
      mf.group = 'phone';
    } else if (!mf.group && goog.string.startsWith(name, last_field_name)) {
      mf.group = last_group;
      continue;
    }
    last_field_name = name;
    last_group = mf.group;

  }
  // fix link field that does not have module name
  for (var name in info.link_fields) {
    /**
     * @type {SugarCrm.LinkField}
     */
    var lf = info.link_fields[name];
    if (name == 'contact' && !lf.module) {
      lf.module = 'Contacts';
    }
  }
  // console.log(info);
};


/**
 * Event types dispatch from sugar model.
 * @enum {string}
 */
ydn.crm.su.SugarEvent = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  HOST_ACCESS_GRANT: 'hag'
};


/**
 * Get list of relationship modules.
 * @param {SugarCrm.ModuleInfo} info
 * @param {Array<ydn.crm.su.ModuleName>=} opt_required require module.
 * @return {Array<ydn.crm.su.ModuleName>}
 */
ydn.crm.su.getRelationshipModule = function(info, opt_required) {
  var link_fields = info.link_fields || {};
  var arr = [];
  for (var name in link_fields) {
    var link_field = link_fields[name];
    var mn = link_field['module'];
    if (arr.indexOf(mn) == -1) {
      arr.push(mn);
    }
  }
  if (opt_required) {
    for (var i = 0; i < opt_required.length; i++) {
      if (arr.indexOf(opt_required[i]) == -1) {
        arr.push(opt_required[i]);
      }
    }
  }
  arr.sort();
  return arr;
};


/**
 * Get list of relationship modules, which is cached.
 * @param {SugarCrm.ModuleInfo} info
 * @param {Array<ydn.crm.su.ModuleName>=} opt_required require module.
 * @return {Array<ydn.crm.su.ModuleName>}
 */
ydn.crm.su.getRelationshipCacheModule_ = function(info, opt_required) {
  var link_fields = info.link_fields || {};
  var arr = [];
  for (var name in link_fields) {
    var link_field = link_fields[name];
    var idx = ydn.crm.su.CacheModules.indexOf(link_field.module);
    if (idx >= 0) {
      if (arr.indexOf(ydn.crm.su.CacheModules[idx]) == -1) {
        arr.push(ydn.crm.su.CacheModules[idx]);
      }
    }
  }
  if (opt_required) {
    for (var i = 0; i < opt_required.length; i++) {
      if (arr.indexOf(opt_required[i]) == -1) {
        arr.push(opt_required[i]);
      }
    }
  }
  arr.sort();
  return arr;
};


/**
 * Reder cache static.
 * @param {Element} li
 * @param {Object} obj
 * @param {boolean=} opt_update_now add update now button.
 */
ydn.crm.su.renderCacheStats = function (li, obj, opt_update_now) {

  li.setAttribute('data-module', obj['module']);
  var span = document.createElement('span');
  span.setAttribute('name', 'count');
  span.textContent = obj['count'];
  li.appendChild(span);
  li.appendChild(document.createTextNode(' ' + obj['module']));
  var last = new Date(obj['updated']);
  var last_time = last.getTime();
  if (last_time) {
    var last_span = document.createElement('span');
    var up = obj['last-update-count'] || 0;
    last_span.textContent = ', ' + up + ' records updated ' +
        goog.date.relative.format(last_time);
    last_span.setAttribute('title', 'Last synchronized time');
    li.appendChild(last_span);
  }
  if (obj['last_record']) {
    var last_record = obj['last_record'];
    var modified = new Date(last_record['date_modified']);
    li.appendChild(document.createTextNode(', '));
    var a_record = document.createElement('A');
    a_record.textContent = 'last record';
    a_record.href = last_record['$ydn_href'] || '';
    a_record.setAttribute('title', last_record['name']);
    a_record.setAttribute('target', '_blank');
    li.appendChild(a_record);
    var modify_span = document.createElement('span');
    modify_span.textContent = ' modified on ' + modified.toLocaleString();
    modify_span.setAttribute('title', 'Last modified timestamp in server');
    li.appendChild(modify_span);
  }
  if (opt_update_now) {
    li.appendChild(document.createTextNode(' ['));

    var a_detail = document.createElement('A');
    a_detail.textContent = 'option';
    a_detail.href = '#option';
    li.appendChild(a_detail);

    /*
    li.appendChild(document.createTextNode(' | '));
    var a_now = document.createElement('A');
    a_now.textContent = 'Update now';
    a_now.href = '#update-now';
    li.appendChild(a_now);
    */
    li.appendChild(document.createTextNode(']'));
  }

};


/**
 * Set of filter
 * @enum {string}
 */
ydn.crm.su.RecordFilter = {
  ALL: 'filter-all',
  MY: 'filter-my',
  UPCOMING: 'filter-upcoming',
  FAVORITE: 'filter-fav'
};


/**
 * List of all filters.
 * @const
 * @type {Array<ydn.crm.su.RecordFilter>}
 */
ydn.crm.su.recordFilters = [ydn.crm.su.RecordFilter.ALL,
  ydn.crm.su.RecordFilter.MY, ydn.crm.su.RecordFilter.UPCOMING,
  ydn.crm.su.RecordFilter.FAVORITE];


/**
 * Set of sort order
 * @enum {string}
 */
ydn.crm.su.RecordOrder = {
  ID: 'order-id',
  RECENT: 'order-date_modified',
  NAME: 'order-name'
};
