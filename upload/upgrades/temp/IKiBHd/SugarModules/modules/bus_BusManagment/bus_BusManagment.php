<?PHP
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
require_once('modules/bus_BusManagment/bus_BusManagment_sugar.php');
class bus_BusManagment extends bus_BusManagment_sugar {

    /**
     * @deprecated Use __construct() instead
     */
    public function bus_BusManagment()
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