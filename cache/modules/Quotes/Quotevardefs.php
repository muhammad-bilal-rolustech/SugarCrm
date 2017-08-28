<?php 
 $GLOBALS["dictionary"]["Quote"]=array (
  'table' => 'quotes',
  'audited' => true,
  'unified_search' => true,
  'full_text_search' => true,
  'fields' => 
  array (
    'id' => 
    array (
      'name' => 'id',
      'vname' => 'LBL_ID',
      'type' => 'id',
      'required' => true,
      'reportable' => true,
      'duplicate_on_record_copy' => 'no',
      'comment' => 'Unique identifier',
      'mandatory_fetch' => true,
    ),
    'name' => 
    array (
      'name' => 'name',
      'vname' => 'LBL_QUOTE_NAME',
      'dbType' => 'varchar',
      'type' => 'name',
      'len' => '50',
      'unified_search' => true,
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => true,
        'boost' => 1.6100000000000001,
      ),
      'importable' => 'required',
      'required' => true,
    ),
    'date_entered' => 
    array (
      'name' => 'date_entered',
      'vname' => 'LBL_DATE_ENTERED',
      'type' => 'datetime',
      'group' => 'created_by_name',
      'comment' => 'Date record created',
      'enable_range_search' => true,
      'options' => 'date_range_search_dom',
      'studio' => 
      array (
        'portaleditview' => false,
      ),
      'duplicate_on_record_copy' => 'no',
      'readonly' => true,
      'massupdate' => false,
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => false,
        'aggregations' => 
        array (
          'date_entered' => 
          array (
            'type' => 'DateRange',
          ),
        ),
      ),
    ),
    'date_modified' => 
    array (
      'name' => 'date_modified',
      'vname' => 'LBL_DATE_MODIFIED',
      'type' => 'datetime',
      'group' => 'modified_by_name',
      'comment' => 'Date record last modified',
      'enable_range_search' => true,
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => false,
        'aggregations' => 
        array (
          'date_modified' => 
          array (
            'type' => 'DateRange',
          ),
        ),
      ),
      'studio' => 
      array (
        'portaleditview' => false,
      ),
      'options' => 'date_range_search_dom',
      'duplicate_on_record_copy' => 'no',
      'readonly' => true,
      'massupdate' => false,
    ),
    'modified_user_id' => 
    array (
      'name' => 'modified_user_id',
      'rname' => 'user_name',
      'id_name' => 'modified_user_id',
      'vname' => 'LBL_MODIFIED',
      'type' => 'assigned_user_name',
      'table' => 'users',
      'isnull' => false,
      'group' => 'modified_by_name',
      'dbType' => 'id',
      'reportable' => true,
      'comment' => 'User who last modified record',
      'massupdate' => false,
      'duplicate_on_record_copy' => 'no',
      'readonly' => true,
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => false,
        'type' => 'id',
        'aggregations' => 
        array (
          'modified_user_id' => 
          array (
            'type' => 'MyItems',
            'label' => 'LBL_AGG_MODIFIED_BY_ME',
          ),
        ),
      ),
    ),
    'modified_by_name' => 
    array (
      'name' => 'modified_by_name',
      'vname' => 'LBL_MODIFIED',
      'type' => 'relate',
      'reportable' => false,
      'source' => 'non-db',
      'rname' => 'full_name',
      'table' => 'users',
      'id_name' => 'modified_user_id',
      'module' => 'Users',
      'link' => 'modified_user_link',
      'duplicate_merge' => 'disabled',
      'massupdate' => false,
      'duplicate_on_record_copy' => 'no',
      'readonly' => true,
      'sort_on' => 
      array (
        0 => 'last_name',
      ),
      'exportable' => true,
    ),
    'created_by' => 
    array (
      'name' => 'created_by',
      'rname' => 'user_name',
      'id_name' => 'modified_user_id',
      'vname' => 'LBL_CREATED',
      'type' => 'assigned_user_name',
      'table' => 'users',
      'isnull' => false,
      'dbType' => 'id',
      'group' => 'created_by_name',
      'comment' => 'User who created record',
      'massupdate' => false,
      'duplicate_on_record_copy' => 'no',
      'readonly' => true,
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => false,
        'type' => 'id',
        'aggregations' => 
        array (
          'created_by' => 
          array (
            'type' => 'MyItems',
            'label' => 'LBL_AGG_CREATED_BY_ME',
          ),
        ),
      ),
    ),
    'created_by_name' => 
    array (
      'name' => 'created_by_name',
      'vname' => 'LBL_CREATED',
      'type' => 'relate',
      'reportable' => false,
      'link' => 'created_by_link',
      'rname' => 'full_name',
      'source' => 'non-db',
      'table' => 'users',
      'id_name' => 'created_by',
      'module' => 'Users',
      'duplicate_merge' => 'disabled',
      'importable' => false,
      'massupdate' => false,
      'duplicate_on_record_copy' => 'no',
      'readonly' => true,
      'sort_on' => 
      array (
        0 => 'last_name',
      ),
      'exportable' => true,
    ),
    'description' => 
    array (
      'name' => 'description',
      'vname' => 'LBL_DESCRIPTION',
      'type' => 'text',
      'comment' => 'Full text of the note',
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => true,
        'boost' => 0.56999999999999995,
      ),
      'rows' => 6,
      'cols' => 80,
      'duplicate_on_record_copy' => 'always',
    ),
    'deleted' => 
    array (
      'name' => 'deleted',
      'vname' => 'LBL_DELETED',
      'type' => 'bool',
      'default' => '0',
      'reportable' => false,
      'duplicate_on_record_copy' => 'no',
      'comment' => 'Record deletion indicator',
    ),
    'created_by_link' => 
    array (
      'name' => 'created_by_link',
      'type' => 'link',
      'relationship' => 'quotes_created_by',
      'vname' => 'LBL_CREATED_BY_USER',
      'link_type' => 'one',
      'module' => 'Users',
      'bean_name' => 'User',
      'source' => 'non-db',
    ),
    'modified_user_link' => 
    array (
      'name' => 'modified_user_link',
      'type' => 'link',
      'relationship' => 'quotes_modified_user',
      'vname' => 'LBL_MODIFIED_BY_USER',
      'link_type' => 'one',
      'module' => 'Users',
      'bean_name' => 'User',
      'source' => 'non-db',
    ),
    'activities' => 
    array (
      'name' => 'activities',
      'type' => 'link',
      'relationship' => 'quote_activities',
      'vname' => 'LBL_ACTIVITY_STREAM',
      'link_type' => 'many',
      'module' => 'Activities',
      'bean_name' => 'Activity',
      'source' => 'non-db',
    ),
    'shipper_id' => 
    array (
      'name' => 'shipper_id',
      'vname' => 'LBL_SHIPPER_ID',
      'type' => 'id',
      'required' => false,
      'do_report' => false,
      'reportable' => false,
    ),
    'shipper_name' => 
    array (
      'name' => 'shipper_name',
      'rname' => 'name',
      'id_name' => 'shipper_id',
      'join_name' => 'shippers',
      'type' => 'relate',
      'link' => 'shippers',
      'table' => 'shippers',
      'isnull' => 'true',
      'module' => 'Shippers',
      'dbType' => 'varchar',
      'len' => '255',
      'vname' => 'LBL_SHIPPING_PROVIDER',
      'source' => 'non-db',
      'comment' => 'Shipper Name',
    ),
    'shippers' => 
    array (
      'name' => 'shippers',
      'type' => 'link',
      'relationship' => 'shipper_quotes',
      'vname' => 'LBL_SHIPPING_PROVIDER',
      'source' => 'non-db',
    ),
    'taxrate_id' => 
    array (
      'name' => 'taxrate_id',
      'vname' => 'LBL_TAXRATE_ID',
      'type' => 'id',
      'required' => false,
      'do_report' => false,
      'reportable' => false,
    ),
    'show_line_nums' => 
    array (
      'name' => 'show_line_nums',
      'vname' => 'LBL_SHOW_LINE_NUMS',
      'type' => 'bool',
      'default' => 1,
      'hideacl' => true,
      'reportable' => false,
      'massupdate' => false,
    ),
    'calc_grand_total' => 
    array (
      'name' => 'calc_grand_total',
      'vname' => 'LBL_CALC_GRAND',
      'type' => 'bool',
      'reportable' => false,
      'default' => 1,
      'hideacl' => true,
      'massupdate' => false,
    ),
    'quote_type' => 
    array (
      'name' => 'quote_type',
      'vname' => 'LBL_QUOTE_TYPE',
      'type' => 'radioenum',
      'dbtype' => 'varchar',
      'options' => 'quote_type_dom',
    ),
    'date_quote_expected_closed' => 
    array (
      'name' => 'date_quote_expected_closed',
      'vname' => 'LBL_DATE_QUOTE_EXPECTED_CLOSED',
      'type' => 'date',
      'audited' => true,
      'reportable' => true,
      'importable' => 'required',
      'required' => true,
      'enable_range_search' => true,
      'options' => 'date_range_search_dom',
    ),
    'original_po_date' => 
    array (
      'name' => 'original_po_date',
      'vname' => 'LBL_ORIGINAL_PO_DATE',
      'type' => 'date',
      'enable_range_search' => true,
      'options' => 'date_range_search_dom',
    ),
    'payment_terms' => 
    array (
      'name' => 'payment_terms',
      'vname' => 'LBL_PAYMENT_TERMS',
      'type' => 'enum',
      'options' => 'payment_terms',
      'len' => '128',
    ),
    'date_quote_closed' => 
    array (
      'name' => 'date_quote_closed',
      'massupdate' => false,
      'vname' => 'LBL_DATE_QUOTE_CLOSED',
      'type' => 'date',
      'reportable' => false,
      'enable_range_search' => true,
      'options' => 'date_range_search_dom',
    ),
    'date_order_shipped' => 
    array (
      'name' => 'date_order_shipped',
      'massupdate' => false,
      'vname' => 'LBL_LIST_DATE_QUOTE_CLOSED',
      'type' => 'date',
      'reportable' => false,
      'enable_range_search' => true,
      'options' => 'date_range_search_dom',
    ),
    'order_stage' => 
    array (
      'name' => 'order_stage',
      'vname' => 'LBL_ORDER_STAGE',
      'type' => 'enum',
      'options' => 'order_stage_dom',
      'massupdate' => false,
      'len' => 100,
    ),
    'quote_stage' => 
    array (
      'name' => 'quote_stage',
      'vname' => 'LBL_QUOTE_STAGE',
      'type' => 'enum',
      'options' => 'quote_stage_dom',
      'len' => 100,
      'audited' => true,
      'importable' => 'required',
      'required' => true,
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => false,
      ),
    ),
    'purchase_order_num' => 
    array (
      'name' => 'purchase_order_num',
      'vname' => 'LBL_PURCHASE_ORDER_NUM',
      'type' => 'varchar',
      'len' => '50',
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => true,
        'type' => 'exact',
        'boost' => 1.1899999999999999,
      ),
    ),
    'quote_num' => 
    array (
      'name' => 'quote_num',
      'vname' => 'LBL_QUOTE_NUM',
      'type' => 'int',
      'auto_increment' => true,
      'readonly' => true,
      'required' => true,
      'unified_search' => true,
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => true,
        'type' => 'exact',
        'boost' => 1.1699999999999999,
      ),
      'disable_num_format' => true,
      'enable_range_search' => true,
      'options' => 'numeric_range_search_dom',
    ),
    'subtotal' => 
    array (
      'name' => 'subtotal',
      'vname' => 'LBL_SUBTOTAL',
      'dbType' => 'decimal',
      'type' => 'currency',
      'len' => '26,6',
      'related_fields' => 
      array (
        0 => 'currency_id',
        1 => 'base_rate',
      ),
      'formula' => 'rollupCurrencySum($product_bundles, "subtotal")',
      'calculated' => true,
      'enforced' => true,
    ),
    'subtotal_usdollar' => 
    array (
      'name' => 'subtotal_usdollar',
      'group' => 'subtotal',
      'vname' => 'LBL_SUBTOTAL_USDOLLAR',
      'dbType' => 'decimal',
      'type' => 'currency',
      'is_base_currency' => true,
      'len' => '26,6',
      'audited' => true,
      'studio' => 
      array (
        'wirelesseditview' => false,
        'wirelessdetailview' => false,
        'wirelesslistview' => false,
        'wireless_basic_search' => false,
        'wireless_advanced_search' => false,
        'mobile' => false,
      ),
      'related_fields' => 
      array (
        0 => 'currency_id',
        1 => 'base_rate',
      ),
      'formula' => 'ifElse(isNumeric($subtotal), currencyDivide($subtotal,$base_rate), "")',
      'calculated' => true,
      'enforced' => true,
    ),
    'shipping' => 
    array (
      'name' => 'shipping',
      'vname' => 'LBL_SHIPPING',
      'dbType' => 'decimal',
      'type' => 'currency',
      'len' => '26,6',
      'related_fields' => 
      array (
        0 => 'currency_id',
        1 => 'base_rate',
      ),
      'formula' => 'rollupCurrencySum($product_bundles, "shipping")',
      'calculated' => true,
      'enforced' => true,
    ),
    'shipping_usdollar' => 
    array (
      'name' => 'shipping_usdollar',
      'vname' => 'LBL_SHIPPING_USDOLLAR',
      'group' => 'shipping',
      'dbType' => 'decimal',
      'type' => 'currency',
      'currency_id' => '-99',
      'is_base_currency' => true,
      'len' => '26,6',
      'studio' => 
      array (
        'wirelesseditview' => false,
        'wirelessdetailview' => false,
        'wirelesslistview' => false,
        'wireless_basic_search' => false,
        'wireless_advanced_search' => false,
        'mobile' => false,
      ),
      'related_fields' => 
      array (
        0 => 'currency_id',
        1 => 'base_rate',
      ),
      'formula' => 'ifElse(isNumeric($shipping), currencyDivide($shipping, $base_rate), "")',
      'calculated' => true,
      'enforced' => true,
    ),
    'discount' => 
    array (
      'name' => 'discount',
      'vname' => 'LBL_DISCOUNT_TOTAL',
      'dbType' => 'decimal',
      'type' => 'currency',
      'len' => '26,6',
      'related_fields' => 
      array (
        0 => 'currency_id',
        1 => 'base_rate',
      ),
    ),
    'deal_tot' => 
    array (
      'name' => 'deal_tot',
      'vname' => 'LBL_DEAL_TOT',
      'dbType' => 'decimal',
      'type' => 'currency',
      'len' => '26,2',
      'formula' => 'rollupCurrencySum($product_bundles, "deal_tot")',
      'calculated' => true,
      'enforced' => true,
    ),
    'deal_tot_usdollar' => 
    array (
      'name' => 'deal_tot_usdollar',
      'vname' => 'LBL_DEAL_TOT_USDOLLAR',
      'dbType' => 'decimal',
      'type' => 'currency',
      'currency_id' => '-99',
      'is_base_currency' => true,
      'len' => '26,2',
      'studio' => 
      array (
        'wirelesseditview' => false,
        'wirelessdetailview' => false,
        'wirelesslistview' => false,
        'wireless_basic_search' => false,
        'wireless_advanced_search' => false,
        'mobile' => false,
      ),
      'formula' => 'ifElse(isNumeric($deal_tot), currencyDivide($deal_tot, $base_rate), "")',
      'calculated' => true,
      'enforced' => true,
    ),
    'new_sub' => 
    array (
      'name' => 'new_sub',
      'vname' => 'LBL_NEW_SUB',
      'dbType' => 'decimal',
      'type' => 'currency',
      'len' => '26,6',
      'related_fields' => 
      array (
        0 => 'currency_id',
        1 => 'base_rate',
      ),
      'formula' => 'rollupCurrencySum($product_bundles, "new_sub")',
      'calculated' => true,
      'enforced' => true,
    ),
    'new_sub_usdollar' => 
    array (
      'name' => 'new_sub_usdollar',
      'vname' => 'LBL_NEW_SUB_USDOLLAR',
      'dbType' => 'decimal',
      'type' => 'currency',
      'currency_id' => '-99',
      'is_base_currency' => true,
      'len' => '26,6',
      'studio' => 
      array (
        'wirelesseditview' => false,
        'wirelessdetailview' => false,
        'wirelesslistview' => false,
        'wireless_basic_search' => false,
        'wireless_advanced_search' => false,
        'mobile' => false,
      ),
      'related_fields' => 
      array (
        0 => 'currency_id',
        1 => 'base_rate',
      ),
      'formula' => 'ifElse(isNumeric($new_sub), currencyDivide($new_sub, $base_rate), "")',
      'calculated' => true,
      'enforced' => true,
    ),
    'tax' => 
    array (
      'name' => 'tax',
      'vname' => 'LBL_TAX',
      'dbType' => 'decimal',
      'type' => 'currency',
      'len' => '26,6',
      'related_fields' => 
      array (
        0 => 'currency_id',
        1 => 'base_rate',
      ),
      'formula' => 'rollupCurrencySum($product_bundles, "tax")',
      'calculated' => true,
      'enforced' => true,
    ),
    'tax_usdollar' => 
    array (
      'name' => 'tax_usdollar',
      'vname' => 'LBL_TAX_USDOLLAR',
      'dbType' => 'decimal',
      'group' => 'tax',
      'type' => 'currency',
      'is_base_currency' => true,
      'len' => '26,6',
      'audited' => true,
      'studio' => 
      array (
        'wirelesseditview' => false,
        'wirelessdetailview' => false,
        'wirelesslistview' => false,
        'wireless_basic_search' => false,
        'wireless_advanced_search' => false,
        'mobile' => false,
      ),
      'related_fields' => 
      array (
        0 => 'currency_id',
        1 => 'base_rate',
      ),
      'formula' => 'ifElse(isNumeric($tax), currencyDivide($tax, $base_rate), "")',
      'calculated' => true,
      'enforced' => true,
    ),
    'total' => 
    array (
      'name' => 'total',
      'vname' => 'LBL_TOTAL',
      'dbType' => 'decimal',
      'type' => 'currency',
      'len' => '26,6',
      'formula' => 'rollupCurrencySum($product_bundles, "total")',
      'calculated' => true,
      'enforced' => true,
    ),
    'total_usdollar' => 
    array (
      'name' => 'total_usdollar',
      'vname' => 'LBL_TOTAL_USDOLLAR',
      'dbType' => 'decimal',
      'group' => 'total',
      'type' => 'currency',
      'currency_id' => '-99',
      'is_base_currency' => true,
      'len' => '26,6',
      'audited' => true,
      'enable_range_search' => true,
      'options' => 'numeric_range_search_dom',
      'studio' => 
      array (
        'wirelesseditview' => false,
        'wirelessdetailview' => false,
        'wirelesslistview' => false,
        'wireless_basic_search' => false,
        'wireless_advanced_search' => false,
        'mobile' => false,
      ),
      'related_fields' => 
      array (
        0 => 'currency_id',
        1 => 'base_rate',
      ),
      'formula' => 'ifElse(isNumeric($total), currencyDivide($total, $base_rate), "")',
      'calculated' => true,
      'enforced' => true,
    ),
    'billing_address_street' => 
    array (
      'name' => 'billing_address_street',
      'vname' => 'LBL_BILLING_ADDRESS_STREET',
      'type' => 'text',
      'dbType' => 'varchar',
      'group' => 'billing_address',
      'len' => '150',
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => true,
        'boost' => 0.23999999999999999,
      ),
    ),
    'billing_address_city' => 
    array (
      'name' => 'billing_address_city',
      'vname' => 'LBL_BILLING_ADDRESS_CITY',
      'type' => 'varchar',
      'group' => 'billing_address',
      'len' => '100',
    ),
    'billing_address_state' => 
    array (
      'name' => 'billing_address_state',
      'vname' => 'LBL_BILLING_ADDRESS_STATE',
      'type' => 'varchar',
      'group' => 'billing_address',
      'len' => '100',
    ),
    'billing_address_postalcode' => 
    array (
      'name' => 'billing_address_postalcode',
      'vname' => 'LBL_BILLING_ADDRESS_POSTAL_CODE',
      'type' => 'varchar',
      'group' => 'billing_address',
      'len' => '20',
    ),
    'billing_address_country' => 
    array (
      'name' => 'billing_address_country',
      'vname' => 'LBL_BILLING_ADDRESS_COUNTRY',
      'type' => 'varchar',
      'group' => 'billing_address',
      'len' => '100',
    ),
    'shipping_address_street' => 
    array (
      'name' => 'shipping_address_street',
      'vname' => 'LBL_SHIPPING_ADDRESS_STREET',
      'type' => 'text',
      'dbType' => 'varchar',
      'group' => 'shipping_address',
      'len' => '150',
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => true,
        'boost' => 0.23000000000000001,
      ),
    ),
    'shipping_address_city' => 
    array (
      'name' => 'shipping_address_city',
      'vname' => 'LBL_SHIPPING_ADDRESS_CITY',
      'type' => 'varchar',
      'group' => 'shipping_address',
      'len' => '100',
    ),
    'shipping_address_state' => 
    array (
      'name' => 'shipping_address_state',
      'vname' => 'LBL_SHIPPING_ADDRESS_STATE',
      'type' => 'varchar',
      'group' => 'shipping_address',
      'len' => '100',
    ),
    'shipping_address_postalcode' => 
    array (
      'name' => 'shipping_address_postalcode',
      'vname' => 'LBL_SHIPPING_ADDRESS_POSTAL_CODE',
      'type' => 'varchar',
      'group' => 'shipping_address',
      'len' => '20',
    ),
    'shipping_address_country' => 
    array (
      'name' => 'shipping_address_country',
      'vname' => 'LBL_SHIPPING_ADDRESS_COUNTRY',
      'type' => 'varchar',
      'group' => 'shipping_address',
      'len' => '100',
    ),
    'system_id' => 
    array (
      'name' => 'system_id',
      'vname' => 'LBL_SYSTEM_ID',
      'type' => 'int',
    ),
    'shipping_account_name' => 
    array (
      'name' => 'shipping_account_name',
      'rname' => 'name',
      'id_name' => 'shipping_account_id',
      'vname' => 'LBL_SHIPPING_ACCOUNT_NAME',
      'type' => 'relate',
      'table' => 'shipping_accounts',
      'isnull' => 'true',
      'group' => 'shipping_address',
      'link' => 'shipping_accounts',
      'module' => 'Accounts',
      'source' => 'non-db',
    ),
    'shipping_account_id' => 
    array (
      'name' => 'shipping_account_id',
      'type' => 'id',
      'group' => 'shipping_address',
      'vname' => 'LBL_SHIPPING_ACCOUNT_ID',
      'source' => 'non-db',
    ),
    'shipping_contact_name' => 
    array (
      'name' => 'shipping_contact_name',
      'rname' => 'full_name',
      'id_name' => 'shipping_contact_id',
      'vname' => 'LBL_SHIPPING_CONTACT_NAME',
      'type' => 'relate',
      'group' => 'shipping_address',
      'link' => 'shipping_contacts',
      'table' => 'shipping_contacts',
      'isnull' => 'true',
      'module' => 'Contacts',
      'source' => 'non-db',
    ),
    'shipping_contact_id' => 
    array (
      'name' => 'shipping_contact_id',
      'rname' => 'last_name',
      'group' => 'shipping_address',
      'id_name' => 'shipping_contact_id',
      'vname' => 'LBL_SHIPPING_CONTACT_ID',
      'type' => 'relate',
      'link' => 'shipping_contacts',
      'table' => 'shipping_contacts',
      'isnull' => 'true',
      'module' => 'Contacts',
      'source' => 'non-db',
      'massupdate' => false,
    ),
    'account_name' => 
    array (
      'name' => 'account_name',
      'rname' => 'name',
      'id_name' => 'account_id',
      'vname' => 'LBL_ACCOUNT_NAME',
      'type' => 'relate',
      'group' => 'billing_address',
      'link' => 'billing_accounts',
      'table' => 'billing_accounts',
      'isnull' => 'true',
      'module' => 'Accounts',
      'source' => 'non-db',
      'massupdate' => false,
      'studio' => 
      array (
        'edit' => 'false',
        'detail' => 'false',
        'list' => 'false',
      ),
    ),
    'account_id' => 
    array (
      'name' => 'account_id',
      'type' => 'relate',
      'link' => 'billing_accounts',
      'rname' => 'id',
      'group' => 'billing_address',
      'vname' => 'LBL_ACCOUNT_ID',
      'source' => 'non-db',
      'massupdate' => false,
      'studio' => 'false',
    ),
    'billing_account_name' => 
    array (
      'name' => 'billing_account_name',
      'rname' => 'name',
      'group' => 'billing_address',
      'id_name' => 'billing_account_id',
      'vname' => 'LBL_BILLING_ACCOUNT_NAME',
      'type' => 'relate',
      'link' => 'billing_accounts',
      'table' => 'billing_accounts',
      'isnull' => 'true',
      'module' => 'Accounts',
      'source' => 'non-db',
      'importable' => 'required',
      'required' => true,
    ),
    'billing_account_id' => 
    array (
      'name' => 'billing_account_id',
      'type' => 'id',
      'group' => 'billing_address',
      'vname' => 'LBL_BILLING_ACCOUNT_ID',
      'source' => 'non-db',
    ),
    'billing_contact_name' => 
    array (
      'name' => 'billing_contact_name',
      'rname' => 'full_name',
      'group' => 'billing_address',
      'id_name' => 'billing_contact_id',
      'vname' => 'LBL_BILLING_CONTACT_NAME',
      'type' => 'relate',
      'link' => 'billing_contacts',
      'table' => 'billing_contacts',
      'isnull' => 'true',
      'module' => 'Contacts',
      'source' => 'non-db',
    ),
    'billing_contact_id' => 
    array (
      'name' => 'billing_contact_id',
      'rname' => 'last_name',
      'id_name' => 'billing_contact_id',
      'vname' => 'LBL_BILLING_CONTACT_ID',
      'type' => 'relate',
      'group' => 'billing_address',
      'link' => 'billing_contacts',
      'table' => 'billing_contacts',
      'isnull' => 'true',
      'module' => 'Contacts',
      'source' => 'non-db',
      'massupdate' => false,
    ),
    'tasks' => 
    array (
      'name' => 'tasks',
      'type' => 'link',
      'relationship' => 'quote_tasks',
      'vname' => 'LBL_TASKS',
      'source' => 'non-db',
    ),
    'notes' => 
    array (
      'name' => 'notes',
      'type' => 'link',
      'relationship' => 'quote_notes',
      'vname' => 'LBL_NOTES',
      'source' => 'non-db',
    ),
    'meetings' => 
    array (
      'name' => 'meetings',
      'type' => 'link',
      'relationship' => 'quote_meetings',
      'vname' => 'LBL_MEETINGS',
      'source' => 'non-db',
    ),
    'calls' => 
    array (
      'name' => 'calls',
      'type' => 'link',
      'relationship' => 'quote_calls',
      'vname' => 'LBL_CALLS',
      'source' => 'non-db',
    ),
    'emails' => 
    array (
      'name' => 'emails',
      'type' => 'link',
      'relationship' => 'emails_quotes',
      'vname' => 'LBL_EMAILS',
      'source' => 'non-db',
    ),
    'project' => 
    array (
      'name' => 'project',
      'type' => 'link',
      'relationship' => 'projects_quotes',
      'vname' => 'LBL_PROJECTS',
      'source' => 'non-db',
    ),
    'products' => 
    array (
      'name' => 'products',
      'type' => 'link',
      'relationship' => 'quote_products',
      'vname' => 'LBL_PRODUCTS',
      'source' => 'non-db',
    ),
    'revenuelineitems' => 
    array (
      'name' => 'revenuelineitems',
      'type' => 'link',
      'relationship' => 'quote_revenuelineitems',
      'vname' => 'LBL_REVENUELINEITEMS',
      'source' => 'non-db',
      'workflow' => false,
    ),
    'shipping_accounts' => 
    array (
      'name' => 'shipping_accounts',
      'type' => 'link',
      'relationship' => 'quotes_shipto_accounts',
      'vname' => 'LBL_SHIP_TO_ACCOUNT',
      'source' => 'non-db',
      'link_type' => 'one',
    ),
    'billing_accounts' => 
    array (
      'name' => 'billing_accounts',
      'type' => 'link',
      'relationship' => 'quotes_billto_accounts',
      'vname' => 'LBL_BILL_TO_ACCOUNT',
      'source' => 'non-db',
      'link_type' => 'one',
    ),
    'shipping_contacts' => 
    array (
      'name' => 'shipping_contacts',
      'type' => 'link',
      'relationship' => 'quotes_contacts_shipto',
      'vname' => 'LBL_SHIP_TO_CONTACT',
      'source' => 'non-db',
      'link_type' => 'one',
    ),
    'billing_contacts' => 
    array (
      'name' => 'billing_contacts',
      'type' => 'link',
      'link_type' => 'one',
      'vname' => 'LBL_BILL_TO_CONTACT',
      'relationship' => 'quotes_contacts_billto',
      'source' => 'non-db',
    ),
    'product_bundles' => 
    array (
      'name' => 'product_bundles',
      'type' => 'link',
      'vname' => 'LBL_PRODUCT_BUNDLES',
      'module' => 'ProductBundles',
      'bean_name' => 'ProductBundle',
      'relationship' => 'product_bundle_quote',
      'rel_fields' => 
      array (
        'bundle_index' => 
        array (
          'type' => 'integer',
        ),
      ),
      'source' => 'non-db',
    ),
    'opportunities' => 
    array (
      'name' => 'opportunities',
      'type' => 'link',
      'vname' => 'LBL_OPPORTUNITY',
      'relationship' => 'quotes_opportunities',
      'link_type' => 'one',
      'source' => 'non-db',
    ),
    'assigned_user_link' => 
    array (
      'name' => 'assigned_user_link',
      'type' => 'link',
      'relationship' => 'quotes_assigned_user',
      'vname' => 'LBL_ASSIGNED_TO_USER',
      'link_type' => 'one',
      'module' => 'Users',
      'bean_name' => 'User',
      'source' => 'non-db',
      'duplicate_merge' => 'enabled',
      'id_name' => 'assigned_user_id',
      'table' => 'users',
    ),
    'opportunity_name' => 
    array (
      'name' => 'opportunity_name',
      'rname' => 'name',
      'id_name' => 'opportunity_id',
      'vname' => 'LBL_OPPORTUNITY_NAME',
      'type' => 'relate',
      'table' => 'Opportunities',
      'isnull' => 'true',
      'module' => 'Opportunities',
      'link' => 'opportunities',
      'massupdate' => false,
      'source' => 'non-db',
      'len' => 50,
    ),
    'opportunity_id' => 
    array (
      'name' => 'opportunity_id',
      'type' => 'id',
      'vname' => 'LBL_BILLING_ACCOUNT_NAME',
      'source' => 'non-db',
    ),
    'documents' => 
    array (
      'name' => 'documents',
      'type' => 'link',
      'relationship' => 'documents_quotes',
      'source' => 'non-db',
      'vname' => 'LBL_DOCUMENTS_SUBPANEL_TITLE',
    ),
    'contracts' => 
    array (
      'name' => 'contracts',
      'type' => 'link',
      'vname' => 'LBL_CONTRACTS',
      'relationship' => 'contracts_quotes',
      'link_type' => 'one',
      'source' => 'non-db',
    ),
    'following' => 
    array (
      'massupdate' => false,
      'name' => 'following',
      'vname' => 'LBL_FOLLOWING',
      'type' => 'bool',
      'source' => 'non-db',
      'comment' => 'Is user following this record',
      'studio' => 'false',
      'link' => 'following_link',
      'rname' => 'id',
      'rname_exists' => true,
    ),
    'following_link' => 
    array (
      'name' => 'following_link',
      'type' => 'link',
      'relationship' => 'quotes_following',
      'source' => 'non-db',
      'vname' => 'LBL_FOLLOWING',
      'reportable' => false,
    ),
    'my_favorite' => 
    array (
      'massupdate' => false,
      'name' => 'my_favorite',
      'vname' => 'LBL_FAVORITE',
      'type' => 'bool',
      'source' => 'non-db',
      'comment' => 'Favorite for the user',
      'studio' => 
      array (
        'list' => false,
        'recordview' => false,
        'basic_search' => false,
        'advanced_search' => false,
      ),
      'link' => 'favorite_link',
      'rname' => 'id',
      'rname_exists' => true,
    ),
    'favorite_link' => 
    array (
      'name' => 'favorite_link',
      'type' => 'link',
      'relationship' => 'quotes_favorite',
      'source' => 'non-db',
      'vname' => 'LBL_FAVORITE',
      'reportable' => false,
      'workflow' => false,
      'full_text_search' => 
      array (
        'type' => 'favorites',
        'enabled' => true,
        'searchable' => false,
        'aggregations' => 
        array (
          'favorite_link' => 
          array (
            'type' => 'MyItems',
            'options' => 
            array (
              'field' => 'user_favorites',
            ),
          ),
        ),
      ),
    ),
    'assigned_user_id' => 
    array (
      'name' => 'assigned_user_id',
      'vname' => 'LBL_ASSIGNED_TO_ID',
      'group' => 'assigned_user_name',
      'type' => 'id',
      'reportable' => false,
      'isnull' => 'false',
      'audited' => true,
      'duplicate_on_record_copy' => 'always',
      'comment' => 'User ID assigned to record',
      'duplicate_merge' => 'disabled',
      'mandatory_fetch' => true,
      'massupdate' => false,
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => false,
        'aggregations' => 
        array (
          'assigned_user_id' => 
          array (
            'type' => 'MyItems',
            'label' => 'LBL_AGG_ASSIGNED_TO_ME',
          ),
        ),
      ),
    ),
    'assigned_user_name' => 
    array (
      'name' => 'assigned_user_name',
      'link' => 'assigned_user_link',
      'vname' => 'LBL_ASSIGNED_TO',
      'rname' => 'full_name',
      'type' => 'relate',
      'reportable' => false,
      'source' => 'non-db',
      'table' => 'users',
      'id_name' => 'assigned_user_id',
      'module' => 'Users',
      'duplicate_merge' => 'disabled',
      'duplicate_on_record_copy' => 'always',
      'sort_on' => 
      array (
        0 => 'last_name',
      ),
      'exportable' => true,
    ),
    'team_id' => 
    array (
      'name' => 'team_id',
      'vname' => 'LBL_TEAM_ID',
      'group' => 'team_name',
      'reportable' => false,
      'dbType' => 'id',
      'type' => 'team_list',
      'audited' => true,
      'duplicate_on_record_copy' => 'always',
      'comment' => 'Team ID for the account',
    ),
    'team_set_id' => 
    array (
      'name' => 'team_set_id',
      'rname' => 'id',
      'id_name' => 'team_set_id',
      'vname' => 'LBL_TEAM_SET_ID',
      'type' => 'id',
      'audited' => true,
      'studio' => 'false',
      'dbType' => 'id',
      'duplicate_on_record_copy' => 'always',
    ),
    'team_count' => 
    array (
      'name' => 'team_count',
      'rname' => 'team_count',
      'id_name' => 'team_id',
      'vname' => 'LBL_TEAMS',
      'join_name' => 'ts1',
      'table' => 'teams',
      'type' => 'relate',
      'required' => 'true',
      'isnull' => 'true',
      'module' => 'Teams',
      'link' => 'team_count_link',
      'massupdate' => false,
      'dbType' => 'int',
      'source' => 'non-db',
      'importable' => 'false',
      'reportable' => false,
      'duplicate_merge' => 'disabled',
      'duplicate_on_record_copy' => 'always',
      'studio' => 'false',
      'hideacl' => true,
    ),
    'team_name' => 
    array (
      'name' => 'team_name',
      'db_concat_fields' => 
      array (
        0 => 'name',
        1 => 'name_2',
      ),
      'sort_on' => 'tj.name',
      'join_name' => 'tj',
      'rname' => 'name',
      'id_name' => 'team_id',
      'vname' => 'LBL_TEAMS',
      'type' => 'relate',
      'required' => 'true',
      'table' => 'teams',
      'isnull' => 'true',
      'module' => 'Teams',
      'link' => 'team_link',
      'massupdate' => true,
      'dbType' => 'varchar',
      'source' => 'non-db',
      'len' => 36,
      'custom_type' => 'teamset',
      'studio' => 
      array (
        'portallistview' => false,
        'portalrecordview' => false,
      ),
      'duplicate_on_record_copy' => 'always',
      'exportable' => true,
    ),
    'team_link' => 
    array (
      'name' => 'team_link',
      'type' => 'link',
      'relationship' => 'quotes_team',
      'vname' => 'LBL_TEAMS_LINK',
      'link_type' => 'one',
      'module' => 'Teams',
      'bean_name' => 'Team',
      'source' => 'non-db',
      'duplicate_merge' => 'disabled',
      'studio' => 'false',
    ),
    'team_count_link' => 
    array (
      'name' => 'team_count_link',
      'type' => 'link',
      'relationship' => 'quotes_team_count_relationship',
      'link_type' => 'one',
      'module' => 'Teams',
      'bean_name' => 'TeamSet',
      'source' => 'non-db',
      'duplicate_merge' => 'disabled',
      'reportable' => false,
      'studio' => 'false',
    ),
    'teams' => 
    array (
      'name' => 'teams',
      'type' => 'link',
      'relationship' => 'quotes_teams',
      'bean_filter_field' => 'team_set_id',
      'rhs_key_override' => true,
      'source' => 'non-db',
      'vname' => 'LBL_TEAMS',
      'link_class' => 'TeamSetLink',
      'link_file' => 'modules/Teams/TeamSetLink.php',
      'studio' => 'false',
      'reportable' => false,
    ),
    'currency_id' => 
    array (
      'name' => 'currency_id',
      'dbType' => 'id',
      'vname' => 'LBL_CURRENCY_ID',
      'type' => 'currency_id',
      'function' => 'getCurrencies',
      'function_bean' => 'Currencies',
      'required' => false,
      'reportable' => false,
      'default' => '-99',
    ),
    'base_rate' => 
    array (
      'name' => 'base_rate',
      'vname' => 'LBL_CURRENCY_RATE',
      'type' => 'text',
      'dbType' => 'decimal',
      'len' => '26,6',
    ),
    'currency_name' => 
    array (
      'name' => 'currency_name',
      'rname' => 'name',
      'id_name' => 'currency_id',
      'vname' => 'LBL_CURRENCY_NAME',
      'type' => 'relate',
      'link' => 'currencies',
      'isnull' => true,
      'table' => 'currencies',
      'module' => 'Currencies',
      'source' => 'non-db',
      'studio' => false,
      'duplicate_merge' => 'disabled',
      'function' => 'getCurrencies',
      'function_bean' => 'Currencies',
      'massupdate' => false,
    ),
    'currency_symbol' => 
    array (
      'name' => 'currency_symbol',
      'rname' => 'symbol',
      'id_name' => 'currency_id',
      'vname' => 'LBL_CURRENCY_SYMBOL',
      'type' => 'relate',
      'link' => 'currencies',
      'isnull' => true,
      'table' => 'currencies',
      'module' => 'Currencies',
      'source' => 'non-db',
      'studio' => false,
      'duplicate_merge' => 'disabled',
      'function' => 'getCurrencySymbols',
      'function_bean' => 'Currencies',
      'massupdate' => false,
    ),
    'currencies' => 
    array (
      'name' => 'currencies',
      'type' => 'link',
      'relationship' => 'quotes_currencies',
      'source' => 'non-db',
      'vname' => 'LBL_CURRENCIES',
    ),
  ),
  'indices' => 
  array (
    'id' => 
    array (
      'name' => 'idx_quotes_pk',
      'type' => 'primary',
      'fields' => 
      array (
        0 => 'id',
      ),
    ),
    'date_modified' => 
    array (
      'name' => 'idx_quotes_date_modfied',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'date_modified',
      ),
    ),
    'deleted' => 
    array (
      'name' => 'idx_quotes_id_del',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'id',
        1 => 'deleted',
      ),
    ),
    'date_entered' => 
    array (
      'name' => 'idx_quotes_date_entered',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'date_entered',
      ),
    ),
    'name_del' => 
    array (
      'name' => 'idx_quotes_name_del',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'name',
        1 => 'deleted',
      ),
    ),
    0 => 
    array (
      'name' => 'quote_num',
      'type' => 'unique',
      'fields' => 
      array (
        0 => 'quote_num',
        1 => 'system_id',
      ),
    ),
    1 => 
    array (
      'name' => 'idx_qte_name',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'name',
      ),
    ),
    2 => 
    array (
      'name' => 'idx_quote_quote_stage',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'quote_stage',
      ),
    ),
    3 => 
    array (
      'name' => 'idx_quote_date_quote_expected_closed',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'date_quote_expected_closed',
      ),
    ),
    'assigned_user_id' => 
    array (
      'name' => 'idx_quotes_assigned_del',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'deleted',
        1 => 'assigned_user_id',
      ),
    ),
    'team_set_quotes' => 
    array (
      'name' => 'idx_quotes_tmst_id',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'team_set_id',
      ),
    ),
  ),
  'relationships' => 
  array (
    'quotes_modified_user' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'Quotes',
      'rhs_table' => 'quotes',
      'rhs_key' => 'modified_user_id',
      'relationship_type' => 'one-to-many',
    ),
    'quotes_created_by' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'Quotes',
      'rhs_table' => 'quotes',
      'rhs_key' => 'created_by',
      'relationship_type' => 'one-to-many',
    ),
    'quote_activities' => 
    array (
      'lhs_module' => 'Quotes',
      'lhs_table' => 'quotes',
      'lhs_key' => 'id',
      'rhs_module' => 'Activities',
      'rhs_table' => 'activities',
      'rhs_key' => 'id',
      'rhs_vname' => 'LBL_ACTIVITY_STREAM',
      'relationship_type' => 'many-to-many',
      'join_table' => 'activities_users',
      'join_key_lhs' => 'parent_id',
      'join_key_rhs' => 'activity_id',
      'relationship_role_column' => 'parent_type',
      'relationship_role_column_value' => 'Quotes',
    ),
    'quote_tasks' => 
    array (
      'lhs_module' => 'Quotes',
      'lhs_table' => 'quotes',
      'lhs_key' => 'id',
      'rhs_module' => 'Tasks',
      'rhs_table' => 'tasks',
      'rhs_key' => 'parent_id',
      'relationship_type' => 'one-to-many',
      'relationship_role_column' => 'parent_type',
      'relationship_role_column_value' => 'Quotes',
    ),
    'quote_notes' => 
    array (
      'lhs_module' => 'Quotes',
      'lhs_table' => 'quotes',
      'lhs_key' => 'id',
      'rhs_module' => 'Notes',
      'rhs_table' => 'notes',
      'rhs_key' => 'parent_id',
      'relationship_type' => 'one-to-many',
      'relationship_role_column' => 'parent_type',
      'relationship_role_column_value' => 'Quotes',
    ),
    'quote_meetings' => 
    array (
      'lhs_module' => 'Quotes',
      'lhs_table' => 'quotes',
      'lhs_key' => 'id',
      'rhs_module' => 'Meetings',
      'rhs_table' => 'meetings',
      'rhs_key' => 'parent_id',
      'relationship_type' => 'one-to-many',
      'relationship_role_column' => 'parent_type',
      'relationship_role_column_value' => 'Quotes',
    ),
    'quote_calls' => 
    array (
      'lhs_module' => 'Quotes',
      'lhs_table' => 'quotes',
      'lhs_key' => 'id',
      'rhs_module' => 'Calls',
      'rhs_table' => 'calls',
      'rhs_key' => 'parent_id',
      'relationship_type' => 'one-to-many',
      'relationship_role_column' => 'parent_type',
      'relationship_role_column_value' => 'Quotes',
    ),
    'quote_emails' => 
    array (
      'lhs_module' => 'Quotes',
      'lhs_table' => 'quotes',
      'lhs_key' => 'id',
      'rhs_module' => 'Emails',
      'rhs_table' => 'emails',
      'rhs_key' => 'parent_id',
      'relationship_type' => 'one-to-many',
      'relationship_role_column' => 'parent_type',
      'relationship_role_column_value' => 'Quotes',
    ),
    'quote_products' => 
    array (
      'lhs_module' => 'Quotes',
      'lhs_table' => 'quotes',
      'lhs_key' => 'id',
      'rhs_module' => 'Products',
      'rhs_table' => 'products',
      'rhs_key' => 'quote_id',
      'relationship_type' => 'one-to-many',
    ),
    'quote_revenuelineitems' => 
    array (
      'lhs_module' => 'Quotes',
      'lhs_table' => 'quotes',
      'lhs_key' => 'id',
      'rhs_module' => 'RevenueLineItems',
      'rhs_table' => 'revenue_line_items',
      'rhs_key' => 'quote_id',
      'relationship_type' => 'one-to-many',
    ),
    'quotes_assigned_user' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'Quotes',
      'rhs_table' => 'quotes',
      'rhs_key' => 'assigned_user_id',
      'relationship_type' => 'one-to-many',
    ),
    'quotes_following' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'Quotes',
      'rhs_table' => 'quotes',
      'rhs_key' => 'id',
      'relationship_type' => 'user-based',
      'join_table' => 'subscriptions',
      'join_key_lhs' => 'created_by',
      'join_key_rhs' => 'parent_id',
      'relationship_role_column' => 'parent_type',
      'relationship_role_column_value' => 'Quotes',
      'user_field' => 'created_by',
    ),
    'quotes_favorite' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'Quotes',
      'rhs_table' => 'quotes',
      'rhs_key' => 'id',
      'relationship_type' => 'user-based',
      'join_table' => 'sugarfavorites',
      'join_key_lhs' => 'modified_user_id',
      'join_key_rhs' => 'record_id',
      'relationship_role_column' => 'module',
      'relationship_role_column_value' => 'Quotes',
      'user_field' => 'created_by',
    ),
    'quotes_team_count_relationship' => 
    array (
      'lhs_module' => 'Teams',
      'lhs_table' => 'team_sets',
      'lhs_key' => 'id',
      'rhs_module' => 'Quotes',
      'rhs_table' => 'quotes',
      'rhs_key' => 'team_set_id',
      'relationship_type' => 'one-to-many',
    ),
    'quotes_teams' => 
    array (
      'lhs_module' => 'Quotes',
      'lhs_table' => 'quotes',
      'lhs_key' => 'team_set_id',
      'rhs_module' => 'Teams',
      'rhs_table' => 'teams',
      'rhs_key' => 'id',
      'relationship_type' => 'many-to-many',
      'join_table' => 'team_sets_teams',
      'join_key_lhs' => 'team_set_id',
      'join_key_rhs' => 'team_id',
    ),
    'quotes_team' => 
    array (
      'lhs_module' => 'Teams',
      'lhs_table' => 'teams',
      'lhs_key' => 'id',
      'rhs_module' => 'Quotes',
      'rhs_table' => 'quotes',
      'rhs_key' => 'team_id',
      'relationship_type' => 'one-to-many',
    ),
    'quotes_currencies' => 
    array (
      'lhs_module' => 'Currencies',
      'lhs_table' => 'currencies',
      'lhs_key' => 'id',
      'rhs_module' => 'Quotes',
      'rhs_table' => 'quotes',
      'rhs_key' => 'currency_id',
      'relationship_type' => 'one-to-many',
    ),
  ),
  'duplicate_check' => 
  array (
    'enabled' => true,
    'FilterDuplicateCheck' => 
    array (
      'filter_template' => 
      array (
        0 => 
        array (
          'name' => 
          array (
            '$starts' => '$name',
          ),
        ),
      ),
      'ranking_fields' => 
      array (
        0 => 
        array (
          'in_field_name' => 'name',
          'dupe_field_name' => 'name',
        ),
      ),
    ),
  ),
  'name_format_map' => 
  array (
  ),
  'visibility' => 
  array (
    'TeamSecurity' => true,
  ),
  'acls' => 
  array (
    'SugarACLStatic' => true,
  ),
  'favorites' => true,
  'templates' => 
  array (
    'basic' => 'basic',
    'following' => 'following',
    'favorite' => 'favorite',
    'assignable' => 'assignable',
    'team_security' => 'team_security',
    'currency' => 'currency',
  ),
  'custom_fields' => false,
  'related_calc_fields' => 
  array (
  ),
);