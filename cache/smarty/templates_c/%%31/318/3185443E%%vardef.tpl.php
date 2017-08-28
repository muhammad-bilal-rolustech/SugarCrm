<?php /* Smarty version 2.6.11, created on 2017-08-28 11:49:46
         compiled from modules/ModuleBuilder/tpls/MBModule/vardef.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'strstr', 'modules/ModuleBuilder/tpls/MBModule/vardef.tpl', 19, false),)), $this); ?>
<?php echo '<?php'; ?>


/*
 * Your installation or use of this SugarCRM file is subject to the applicable
 * terms available at
 * http://support.sugarcrm.com/06_Customer_Center/10_Master_Subscription_Agreements/.
 * If you do not agree to all of the applicable terms or do not have the
 * authority to bind the entity as an authorized representative, then do not
 * install or use this SugarCRM file.
 *
 * Copyright (C) SugarCRM Inc. All rights reserved.
 */

$dictionary['<?php echo $this->_tpl_vars['class']['name']; ?>
'] = array(
    'table' => '<?php echo $this->_tpl_vars['class']['table_name']; ?>
',
    'audited' => <?php if ($this->_tpl_vars['class']['audited']): ?>true<?php else: ?>false<?php endif; ?>,
    'activity_enabled' => <?php if ($this->_tpl_vars['class']['activity_enabled']): ?>true<?php else: ?>false<?php endif; ?>,
<?php if (! ( ((is_array($_tmp=$this->_tpl_vars['class']['templates'])) ? $this->_run_mod_handler('strstr', true, $_tmp, 'file') : strstr($_tmp, 'file')) )): ?>
    'duplicate_merge' => true,
<?php endif; ?>
    'fields' => <?php echo $this->_tpl_vars['class']['fields_string']; ?>
,
    'relationships' => <?php echo $this->_tpl_vars['class']['relationships']; ?>
,
    'optimistic_locking' => true,
<?php if (! empty ( $this->_tpl_vars['class']['table_name'] ) && ! empty ( $this->_tpl_vars['class']['templates'] )): ?>
    'unified_search' => true,
    'full_text_search' => true,
<?php endif; ?>
);

if (!class_exists('VardefManager')){
    require_once 'include/SugarObjects/VardefManager.php';
}
VardefManager::createVardef('<?php echo $this->_tpl_vars['class']['name']; ?>
','<?php echo $this->_tpl_vars['class']['name']; ?>
', array(<?php echo $this->_tpl_vars['class']['templates']; ?>
));