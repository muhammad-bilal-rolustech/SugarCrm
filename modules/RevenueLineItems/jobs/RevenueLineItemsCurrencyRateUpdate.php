<?php
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

require_once('include/SugarCurrency/CurrencyRateUpdateAbstract.php');

/**
 * OpportunitiesCurrencyRateUpdate
 *
 * A class for updating currency rates on specified database table columns
 * when a currency conversion rate is updated by the administrator.
 *
 */
class RevenueLineItemsCurrencyRateUpdate extends CurrencyRateUpdateAbstract
{
    /**
     * @const CHUNK_SIZE
     * number of SQL queries to group together for SQLRunner
     */
    const CHUNK_SIZE = 100;

    /**
     * constructor
     *
     * @access public
     */
    public function __construct()
    {
        parent::__construct();
        // set rate field definitions
        $this->addRateColumnDefinition('revenue_line_items', 'base_rate');
        // set usdollar field definitions
        $this->addUsDollarColumnDefinition('revenue_line_items', 'discount_amount', 'discount_amount_usdollar');
        $this->addUsDollarColumnDefinition('revenue_line_items', 'discount_price', 'discount_usdollar');
        $this->addUsDollarColumnDefinition('revenue_line_items', 'list_price', 'list_usdollar');
        $this->addUsDollarColumnDefinition('revenue_line_items', 'deal_calc', 'deal_calc_usdollar');
        $this->addUsDollarColumnDefinition('revenue_line_items', 'book_value', 'book_value_usdollar');
    }

    /**
     * doCustomUpdateRate
     *
     * Return true to skip updates for this module.
     * Return false to do default update of base_rate column.
     * To custom processing, do here and return true.
     *
     * @access public
     * @param  string $table
     * @param  string $column
     * @param  string $currencyId
     * @return boolean true if custom processing was done
     */
    public function doCustomUpdateRate($table, $column, $currencyId)
    {
        // get the conversion rate
        $rate = $this->db->getOne(sprintf("SELECT conversion_rate FROM currencies WHERE id = '%s'", $currencyId));

        $stages = $this->getClosedStages();

        // setup SQL statement
        $query = sprintf("UPDATE %s SET %s = '%s'
        WHERE sales_stage NOT IN ('%s')
        AND currency_id = '%s'",
            $table,
            $column,
            $rate,
            implode("','", $stages),
            $currencyId
        );
        // execute
        $result = $this->db->query(
            $query,
            true,
            string_format(
                $GLOBALS['app_strings']['ERR_DB_QUERY'],
                array('RevenueLineItemsCurrencyRateUpdate',$query
                )
            )
        );
        return !empty($result);
    }

    /**
     * doCustomUpdateUsDollarRate
     *
     * Return true to skip updates for this module.
     * Return false to do default update of amount * base_rate = usdollar
     * To custom processing, do here and return true.
     *
     * @access public
     * @param  string    $tableName
     * @param  string    $usDollarColumn
     * @param  string    $amountColumn
     * @param  string    $currencyId
     * @return boolean true if custom processing was done
     */
    public function doCustomUpdateUsDollarRate($tableName, $usDollarColumn, $amountColumn, $currencyId)
    {

        $stages = $this->getClosedStages();

        // setup SQL statement
        $query = sprintf("UPDATE %s SET %s = %s / base_rate
            WHERE sales_stage NOT IN ('%s')
            AND currency_id = '%s'",
            $tableName,
            $usDollarColumn,
            $amountColumn,
            implode("','", $stages),
            $currencyId
        );
        // execute
        $result = $this->db->query(
            $query,
            true,
            string_format(
                $GLOBALS['app_strings']['ERR_DB_QUERY'],
                array('RevenueLineItemsCurrencyRateUpdate', $query)
            )
        );
        return !empty($result);
    }

    /**
     * do post update process to update the opportunity RLIs, ENT only
     */
    public function doPostUpdateAction()
    {
        return true;
    }

    /**
     * getClosedStages
     *
     * Return an array of closed stage names from the opportunity bean.
     *
     * @access public
     * @return array array of closed stage values
     */
    public function getClosedStages()
    {
        static $rli;
        if (!isset($rli)) {
            $rli = BeanFactory::getBean('RevenueLineItems');
        }
        return $rli->getClosedStages();
    }


}
