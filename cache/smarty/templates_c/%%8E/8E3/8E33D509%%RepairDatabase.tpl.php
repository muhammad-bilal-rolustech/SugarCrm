<?php /* Smarty version 2.6.11, created on 2017-08-29 11:22:27
         compiled from modules/Administration/templates/RepairDatabase.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 'sugar_csrf_form_token', 'modules/Administration/templates/RepairDatabase.tpl', 17, false),)), $this); ?>

<h3><?php echo $this->_tpl_vars['MOD']['LBL_REPAIR_DATABASE_DIFFERENCES']; ?>
</h3>
<p><?php echo $this->_tpl_vars['MOD']['LBL_REPAIR_DATABASE_TEXT']; ?>
</p>
<form name="RepairDatabaseForm" method="post">
<?php echo smarty_function_sugar_csrf_form_token(array(), $this);?>

<input type="hidden" name="module" value="Administration"/>
<input type="hidden" name="action" value="repairDatabase"/>
<input type="hidden" name="raction" value="execute"/>
<textarea name="sql" rows="24" cols="150" id="repairsql"><?php echo $this->_tpl_vars['qry_str']; ?>
</textarea>
<br/>
<input type="button" class="button" value="<?php echo $this->_tpl_vars['MOD']['LBL_REPAIR_DATABASE_EXECUTE']; ?>
" onClick="document.RepairDatabaseForm.raction.value='execute'; document.RepairDatabaseForm.submit();"/>
<input type="button" class="button" value="<?php echo $this->_tpl_vars['MOD']['LBL_REPAIR_DATABASE_EXPORT']; ?>
" onClick="document.RepairDatabaseForm.raction.value='export'; document.RepairDatabaseForm.submit();"/>