<?php
if(!defined('sugarEntry') || !sugarEntry) die('Not A Valid Entry Point');
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
require_once('include/MVC/View/SugarView.php');

use Sugarcrm\Sugarcrm\Security\InputValidation\InputValidation;
use Sugarcrm\Sugarcrm\Security\InputValidation\Request;

class ImportView extends SugarView
{
    protected $currentStep;
    protected $pageTitleKey;
    protected $instruction;

    /**
     * @var Request
     */
    protected $request;

    public function __construct($bean = null, $view_object_map = array())
    {
        global $mod_strings;

        $this->request = InputValidation::getService();

        parent::__construct($bean, $view_object_map);

        if (isset($_REQUEST['button']) && trim($_REQUEST['button']) == htmlentities($mod_strings['LBL_BACK'])) {
            // if the request comes from the "Back" button, decrease the step count
            $this->currentStep = isset($_REQUEST['current_step']) ? ($_REQUEST['current_step'] - 1) : 1;
        } else {
            $this->currentStep = isset($_REQUEST['current_step']) ? ($_REQUEST['current_step'] + 1) : 1;
        }
        $this->importModule = isset($_REQUEST['import_module']) ? $_REQUEST['import_module'] : '';
        
    }

    /**
     * @see SugarView::getMenu()
     */
    public function getMenu($module = null, $mod_strings_override = false)
    {
        global $mod_strings, $current_language;

        if ( empty($module) )
            $module = $this->importModule;

        $old_mod_strings = $mod_strings;
        $mod_strings = return_module_language($current_language, $module);
        $returnMenu = parent::getMenu($module, $mod_strings_override);
        $mod_strings = $old_mod_strings;

        return $returnMenu;
    }

 	/**
     * @see SugarView::_getModuleTab()
     */
 	protected function _getModuleTab()
    {
        global $app_list_strings, $moduleTabMap;

 		// Need to figure out what tab this module belongs to, most modules have their own tabs, but there are exceptions.
        if ( !empty($_REQUEST['module_tab']) )
            return $_REQUEST['module_tab'];
        elseif ( isset($moduleTabMap[$this->importModule]) )
            return $moduleTabMap[$this->importModule];
        // Default anonymous pages to be under Home
        elseif ( !isset($app_list_strings['moduleList'][$this->importModule]) )
            return 'Home';
        else
            return $this->importModule;
 	}

    /**
     * Send our output to the importer controller.
     * 
     * @param string $html
     * @param string $submitContent
     * @param string $script
     * @param bool $encode
     * @return void
     */
    protected function sendJsonOutput($html = "", $submitContent = "", $script = "", $encode = FALSE)
    {
        $title = $this->getModuleTitle(false);
        $out = array(
            'html'          => $html,
            'submitContent' => $submitContent,
            'title'         => $title,
            'script'        => $script);

        if($encode){
            array_walk($out, create_function('&$val', '$val = htmlspecialchars($val,ENT_NOQUOTES);'));
        }
        echo json_encode($out);
    }

    /**
	 * @see SugarView::_getModuleTitleParams()
	 */
	protected function _getModuleTitleParams($browserTitle = false)
	{
	    global $mod_strings, $app_list_strings;
	    $returnArray = array(string_format($mod_strings[$this->pageTitleKey], array($this->currentStep)));

	    return $returnArray;
    }

    protected function getInstruction()
    {
        global $mod_strings;

        $ins = '';
        
        if ($this->instruction) {
            $ins_string = $mod_strings[$this->instruction];
            $ins = '<div class="import_instruction">' . $ins_string . '</div>';
        }

        return $ins;
    }

     /**
     * Displays the Smarty template for an error
     *
     * @param string $message error message to show
     * @param string $module what module we were importing into
     * @param string $action what page we should go back to
     */
    protected function _showImportError($message,$module,$action = 'Step1')
    {
        $ss = new Sugar_Smarty();

        $ss->assign("MESSAGE",$message);
        $ss->assign("ACTION",$action);
        $ss->assign("IMPORT_MODULE",$module);
        $ss->assign("MOD", $GLOBALS['mod_strings']);
        $ss->assign("SOURCE", $this->request->getValidInputRequest('source', array('Assert\Choice' => array('choices' => self::getImportSourceOptions())), ''));

        echo $ss->fetch('modules/Import/tpls/error.tpl');
    }

    /**
     * Retrieve all valid import source options
     * @return array
     */
    protected function getImportSourceOptions()
    {
        $savedSourceOptions = array_merge(self::getSavedImportSourceOptions(true),
            self::getSavedImportSourceOptions(false));

        $savedSourceOptionsFlattened = array();

        foreach ($savedSourceOptions as $importOption) {
            $savedSourceOptionsFlattened[] = "custom:" . $importOption['IMPORT_ID'];
        }
        return array_merge($savedSourceOptionsFlattened, array('csv', 'external', ''));
    }

    /**
     * Retrieve published import options
     * @return array
     */
    protected function getSavedImportSourceOptions($published = true)
    {
        $results = array();
        $import_map_seed = BeanFactory::getBean('Import_1');
        $publishedImportOptions = $import_map_seed->retrieve_all_by_string_fields(array(
            'assigned_user_id' => $GLOBALS['current_user']->id,
            'is_published' => $published ? 'yes' : 'no',
            'module' => $this->importModule
        ));

        foreach ($publishedImportOptions as $option) {
            $results[] = array("IMPORT_NAME" => $option->name, "IMPORT_ID" => $option->id);
        }

        return $results;
    }
}
