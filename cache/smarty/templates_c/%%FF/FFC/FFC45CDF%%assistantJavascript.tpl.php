<?php /* Smarty version 2.6.11, created on 2017-08-29 16:16:20
         compiled from modules/ModuleBuilder/tpls/assistantJavascript.tpl */ ?>
<script>
<?php echo '
if(typeof(Assistant)!="undefined" && Assistant.mbAssistant){
	//Assistant.mbAssistant.render(document.body);
'; ?>

<?php if ($this->_tpl_vars['userPref']): ?>
	Assistant.processUserPref("<?php echo $this->_tpl_vars['userPref']; ?>
");
<?php endif; ?>
<?php if ($this->_tpl_vars['assistant']['key'] && $this->_tpl_vars['assistant']['group']): ?>
	Assistant.mbAssistant.setBody(SUGAR.language.get('ModuleBuilder','assistantHelp').<?php echo $this->_tpl_vars['assistant']['group']; ?>
.<?php echo $this->_tpl_vars['assistant']['key']; ?>
);
<?php endif; ?>
<?php echo '
	if(Assistant.mbAssistant.visible){
		Assistant.mbAssistant.show();
		}
}
'; ?>

</script>