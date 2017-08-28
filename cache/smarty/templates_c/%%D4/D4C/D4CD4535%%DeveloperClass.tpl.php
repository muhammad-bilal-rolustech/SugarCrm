<?php /* Smarty version 2.6.11, created on 2017-08-28 11:49:46
         compiled from modules/ModuleBuilder/tpls/MBModule/DeveloperClass.tpl */ ?>
<?php echo '<?PHP'; ?>

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
/**
 * THIS CLASS IS FOR DEVELOPERS TO MAKE CUSTOMIZATIONS IN
 */
require_once('modules/<?php echo $this->_tpl_vars['class']['name']; ?>
/<?php echo $this->_tpl_vars['class']['name']; ?>
_sugar.php');
class <?php echo $this->_tpl_vars['class']['name']; ?>
 extends <?php echo $this->_tpl_vars['class']['name']; ?>
_sugar {

    /**
     * @deprecated Use __construct() instead
     */
    public function <?php echo $this->_tpl_vars['class']['name']; ?>
()
    {
        self::__construct();
    }

    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
    }
}