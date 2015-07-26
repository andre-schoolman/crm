/**
 * @fileoverview About this file
 */

ydn.msg.Pipe.DEBUG =  true;
ydn.crm.msg.Manager.addConsumer(new ydn.crm.msg.ConsoleStatusBar());
ydn.msg.initPipe('popup');
ydn.debug.log('ydn.crm', 'finer');
var panel, sugar, provider;
var user = ydn.crm.ui.UserSetting.getInstance();

ydn.crm.shared.logger.info('activity panel test');

ydn.crm.shared.init();
ydn.ui.setTemplateDocument('/inj-template.html');


ydn.crm.su.model.Sugar.get().addCallback(function(x) {
  sugar = /** @type {ydn.crm.su.model.Sugar} */(x);
  if (!sugar) {
    window.console.error('no instance');
    return;
  }
  provider = new ydn.crm.su.ui.RecordListProvider(sugar, ydn.crm.su.ModuleName.CONTACTS, 'date_modified');
  panel = new ydn.crm.su.ui.RecordList(provider);
  panel.render(document.getElementById('root'));
});
