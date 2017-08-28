<?php 
 $GLOBALS["dictionary"]["RevenueLineItem"]=array (
  'table' => 'revenue_line_items',
  'optimistic_locking' => true,
  'audited' => true,
  'activity_enabled' => true,
  'comment' => 'The user (not Admin)) view of a RevenueLineItem definition; an instance of a product used in the worksheets and opportunities',
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
      'vname' => 'LBL_NAME',
      'dbType' => 'varchar',
      'type' => 'name',
      'len' => '50',
      'unified_search' => true,
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => true,
        'boost' => 1.5700000000000001,
      ),
      'comment' => 'Name of the product',
      'reportable' => true,
      'importable' => 'required',
      'required' => true,
      'audited' => true,
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
        'boost' => 0.46999999999999997,
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
      'relationship' => 'revenuelineitems_created_by',
      'vname' => 'LBL_CREATED_USER',
      'link_type' => 'one',
      'module' => 'Users',
      'bean_name' => 'User',
      'source' => 'non-db',
    ),
    'modified_user_link' => 
    array (
      'name' => 'modified_user_link',
      'type' => 'link',
      'relationship' => 'revenuelineitems_modified_user',
      'vname' => 'LBL_MODIFIED_USER',
      'link_type' => 'one',
      'module' => 'Users',
      'bean_name' => 'User',
      'source' => 'non-db',
    ),
    'activities' => 
    array (
      'name' => 'activities',
      'type' => 'link',
      'relationship' => 'revenuelineitem_activities',
      'vname' => 'LBL_ACTIVITY_STREAM',
      'link_type' => 'many',
      'module' => 'Activities',
      'bean_name' => 'Activity',
      'source' => 'non-db',
    ),
    'product_template_id' => 
    array (
      'name' => 'product_template_id',
      'type' => 'id',
      'vname' => 'LBL_PRODUCT_TEMPLATE_ID',
      'required' => false,
      'reportable' => false,
      'comment' => 'Product (in Admin Products) from which this product is derived (in user Products)',
    ),
    'product_template_name' => 
    array (
      'name' => 'product_template_name',
      'rname' => 'name',
      'id_name' => 'product_template_id',
      'vname' => 'LBL_PRODUCT',
      'join_name' => 'templates',
      'type' => 'relate',
      'link' => 'rli_templates_link',
      'table' => 'product_templates',
      'isnull' => 'true',
      'module' => 'ProductTemplates',
      'dbType' => 'varchar',
      'len' => '255',
      'source' => 'non-db',
      'studio' => 
      array (
        'editview' => false,
        'detailview' => false,
        'quickcreate' => false,
      ),
      'auto_populate' => true,
      'populate_list' => 
      array (
        'category_id' => 'category_id',
        'category_name' => 'category_name',
        'mft_part_num' => 'mft_part_num',
        'list_price' => 'list_price',
        'cost_price' => 'cost_price',
        'discount_price' => 'discount_price',
        'list_usdollar' => 'list_usdollar',
        'cost_usdollar' => 'cost_usdollar',
        'discount_usdollar' => 'discount_usdollar',
        'currency_id' => 'currency_id',
        'base_rate' => 'base_rate',
        'tax_class' => 'tax_class',
        'weight' => 'weight',
        'manufacturer_id' => 'manufacturer_id',
        'manufacturer_name' => 'manufacturer_name',
      ),
    ),
    'account_id' => 
    array (
      'name' => 'account_id',
      'type' => 'id',
      'vname' => 'LBL_ACCOUNT_ID',
      'required' => false,
      'reportable' => false,
      'audited' => true,
      'comment' => 'Account this product is associated with',
      'formula' => 'ifElse(related($opportunities, "account_id"), related($opportunities, "account_id"), $account_id)',
      'enforced' => true,
      'calculated' => true,
    ),
    'total_amount' => 
    array (
      'name' => 'total_amount',
      'formula' => '
                ifElse(and(isNumeric($quantity), isNumeric($discount_price)),
                  ifElse(equal($quantity, 0),
                    "0",
                      currencySubtract(
                        currencyMultiply($discount_price, $quantity),
                        ifElse(isNumeric($discount_amount), $discount_amount, 0
                      )
                  )
                ), ""
            )',
      'calculated' => true,
      'enforced' => true,
      'vname' => 'LBL_CALCULATED_LINE_ITEM_AMOUNT',
      'reportable' => false,
      'type' => 'currency',
      'related_fields' => 
      array (
        0 => 'discount_price',
        1 => 'quantity',
        2 => 'discount_amount',
      ),
    ),
    'type_id' => 
    array (
      'name' => 'type_id',
      'vname' => 'LBL_TYPE',
      'type' => 'id',
      'required' => false,
      'reportable' => false,
      'function' => 
      array (
        'name' => 'getProductTypes',
        'returns' => 'html',
        'include' => 'modules/ProductTemplates/ProductTemplate.php',
      ),
      'comment' => 'Product type (ex: hardware, software)',
    ),
    'quote_id' => 
    array (
      'name' => 'quote_id',
      'type' => 'id',
      'vname' => 'LBL_QUOTE_ID',
      'required' => false,
      'reportable' => false,
      'comment' => 'If product created via Quote, this is quote ID',
    ),
    'manufacturer_id' => 
    array (
      'name' => 'manufacturer_id',
      'vname' => 'LBL_MANUFACTURER',
      'type' => 'id',
      'required' => false,
      'reportable' => false,
      'massupdate' => false,
      'comment' => 'Manufacturer of product',
    ),
    'manufacturer_name' => 
    array (
      'name' => 'manufacturer_name',
      'rname' => 'name',
      'id_name' => 'manufacturer_id',
      'type' => 'relate',
      'vname' => 'LBL_MANUFACTURER_NAME',
      'join_name' => 'manufacturers',
      'link' => 'manufacturers',
      'table' => 'manufacturers',
      'isnull' => 'true',
      'source' => 'non-db',
      'module' => 'Manufacturers',
      'dbType' => 'varchar',
      'len' => '255',
      'massupdate' => false,
      'related_fields' => 
      array (
        0 => 'manufacturer_id',
      ),
    ),
    'category_id' => 
    array (
      'name' => 'category_id',
      'vname' => 'LBL_CATEGORY_ID',
      'type' => 'id',
      'group' => 'category_name',
      'required' => false,
      'reportable' => true,
      'comment' => 'Product category',
    ),
    'category_name' => 
    array (
      'name' => 'category_name',
      'rname' => 'name',
      'id_name' => 'category_id',
      'vname' => 'LBL_CATEGORY_NAME',
      'join_name' => 'categories',
      'type' => 'relate',
      'link' => 'rli_categories_link',
      'table' => 'product_categories',
      'isnull' => 'true',
      'module' => 'ProductCategories',
      'dbType' => 'varchar',
      'len' => '255',
      'source' => 'non-db',
      'required' => false,
      'studio' => 
      array (
        'editview' => false,
        'detailview' => false,
        'quickcreate' => false,
      ),
    ),
    'mft_part_num' => 
    array (
      'name' => 'mft_part_num',
      'vname' => 'LBL_MFT_PART_NUM',
      'type' => 'varchar',
      'len' => '50',
      'comment' => 'Manufacturer part number',
    ),
    'vendor_part_num' => 
    array (
      'name' => 'vendor_part_num',
      'vname' => 'LBL_VENDOR_PART_NUM',
      'type' => 'varchar',
      'len' => '50',
      'comment' => 'Vendor part number',
    ),
    'date_purchased' => 
    array (
      'name' => 'date_purchased',
      'vname' => 'LBL_DATE_PURCHASED',
      'type' => 'date',
      'comment' => 'Date product purchased',
    ),
    'cost_price' => 
    array (
      'name' => 'cost_price',
      'vname' => 'LBL_COST_PRICE',
      'type' => 'currency',
      'len' => '26,6',
      'audited' => true,
      'comment' => 'Product cost ("Cost" in Quote)',
    ),
    'discount_price' => 
    array (
      'name' => 'discount_price',
      'vname' => 'LBL_DISCOUNT_PRICE',
      'type' => 'currency',
      'len' => '26,6',
      'audited' => true,
      'comment' => 'Discounted price ("Unit Price" in Quote)',
      'related_fields' => 
      array (
        0 => 'currency_id',
        1 => 'base_rate',
      ),
      'formula' => '
            ifElse(
                and(
                    equal($product_template_id, ""),
                    not(isNumeric($discount_price))
                ),
                divide($likely_case,
                    ifElse(greaterThan($quantity, 0), $quantity, 1)
                ),
                $discount_price
            )',
      'enforced' => false,
      'calculated' => true,
    ),
    'discount_amount' => 
    array (
      'name' => 'discount_amount',
      'vname' => 'LBL_TOTAL_DISCOUNT_AMOUNT',
      'type' => 'currency',
      'len' => '26,6',
      'precision' => 6,
      'comment' => 'Discounted amount',
      'related_fields' => 
      array (
        0 => 'currency_id',
        1 => 'base_rate',
      ),
    ),
    'discount_rate_percent' => 
    array (
      'name' => 'discount_rate_percent',
      'formula' => 'ifElse(isNumeric($discount_amount),ifElse(equal($discount_amount,0),0,multiply(divide($discount_amount,ifElse(equal(add($discount_amount,$total_amount), 0), $discount_amount, add($discount_amount,$total_amount))),100)),"")',
      'calculated' => true,
      'enforced' => true,
      'vname' => 'LBL_DISCOUNT_AS_PERCENT',
      'reportable' => false,
      'type' => 'decimal',
      'precision' => 2,
      'len' => '26,2',
    ),
    'discount_amount_usdollar' => 
    array (
      'name' => 'discount_amount_usdollar',
      'vname' => 'LBL_DISCOUNT_RATE_USDOLLAR',
      'type' => 'decimal',
      'len' => '26,6',
      'studio' => 
      array (
        'editview' => false,
        'mobile' => false,
      ),
      'readonly' => true,
      'is_base_currency' => true,
      'formula' => 'ifElse(isNumeric($discount_amount), currencyDivide($discount_amount, $base_rate), "")',
      'calculated' => true,
      'enforced' => true,
    ),
    'discount_select' => 
    array (
      'name' => 'discount_select',
      'vname' => 'LBL_SELECT_DISCOUNT',
      'type' => 'bool',
      'reportable' => false,
      'importable' => false,
      'studio' => false,
    ),
    'deal_calc' => 
    array (
      'name' => 'deal_calc',
      'vname' => 'LBL_DISCOUNT_TOTAL',
      'type' => 'currency',
      'len' => '26,6',
      'group' => 'deal_calc',
      'comment' => 'deal_calc',
      'calculated' => true,
      'enforced' => true,
      'formula' => 'ifElse(equal($discount_select, "1"),
                            currencyMultiply(currencyMultiply($discount_price, $quantity), currencyDivide($discount_amount, 100)),
                            ifElse(isNumeric($discount_amount), $discount_amount, 0)
                        )',
      'customCode' => '{$fields.currency_symbol.value}{$fields.deal_calc.value}&nbsp;',
      'related_fields' => 
      array (
        0 => 'currency_id',
        1 => 'base_rate',
        2 => 'discount_select',
        3 => 'discount_amount',
        4 => 'discount_price',
      ),
    ),
    'deal_calc_usdollar' => 
    array (
      'name' => 'deal_calc_usdollar',
      'vname' => 'LBL_DISCOUNT_TOTAL_USDOLLAR',
      'type' => 'currency',
      'currency_id' => '-99',
      'len' => '26,6',
      'group' => 'deal_calc',
      'comment' => 'deal_calc_usdollar',
      'studio' => 
      array (
        'editview' => false,
        'mobile' => false,
      ),
      'readonly' => true,
      'is_base_currency' => true,
      'related_fields' => 
      array (
        0 => 'currency_id',
        1 => 'base_rate',
      ),
      'formula' => 'ifElse(isNumeric($deal_calc), currencyDivide($deal_calc, $base_rate), "")',
      'calculated' => true,
      'enforced' => true,
    ),
    'list_price' => 
    array (
      'name' => 'list_price',
      'vname' => 'LBL_LIST_PRICE',
      'type' => 'currency',
      'len' => '26,6',
      'audited' => true,
      'comment' => 'List price of product ("List" in Quote)',
      'related_fields' => 
      array (
        0 => 'currency_id',
        1 => 'base_rate',
      ),
    ),
    'cost_usdollar' => 
    array (
      'name' => 'cost_usdollar',
      'vname' => 'LBL_COST_USDOLLAR',
      'group' => 'cost_price',
      'type' => 'currency',
      'currency_id' => '-99',
      'len' => '26,6',
      'comment' => 'Cost expressed in USD',
      'studio' => 
      array (
        'editview' => false,
        'mobile' => false,
      ),
      'readonly' => true,
      'is_base_currency' => true,
      'related_fields' => 
      array (
        0 => 'currency_id',
        1 => 'base_rate',
      ),
      'formula' => 'ifElse(isNumeric($cost_price), currencyDivide($cost_price, $base_rate), "")',
      'calculated' => true,
      'enforced' => true,
    ),
    'discount_usdollar' => 
    array (
      'name' => 'discount_usdollar',
      'vname' => 'LBL_DISCOUNT_USDOLLAR',
      'group' => 'discount_price',
      'type' => 'currency',
      'currency_id' => '-99',
      'len' => '26,6',
      'comment' => 'Discount price expressed in USD',
      'studio' => 
      array (
        'editview' => false,
        'mobile' => false,
      ),
      'readonly' => true,
      'is_base_currency' => true,
      'related_fields' => 
      array (
        0 => 'currency_id',
        1 => 'base_rate',
      ),
      'formula' => 'ifElse(isNumeric($discount_price), currencyDivide($discount_price, $base_rate), "")',
      'calculated' => true,
      'enforced' => true,
    ),
    'list_usdollar' => 
    array (
      'name' => 'list_usdollar',
      'vname' => 'LBL_LIST_USDOLLAR',
      'type' => 'currency',
      'currency_id' => '-99',
      'group' => 'list_price',
      'len' => '26,6',
      'comment' => 'List price expressed in USD',
      'studio' => 
      array (
        'editview' => false,
        'mobile' => false,
      ),
      'readonly' => true,
      'is_base_currency' => true,
      'related_fields' => 
      array (
        0 => 'currency_id',
        1 => 'base_rate',
      ),
      'formula' => 'ifElse(isNumeric($list_price), currencyDivide($list_price, $base_rate), "")',
      'calculated' => true,
      'enforced' => true,
    ),
    'status' => 
    array (
      'name' => 'status',
      'vname' => 'LBL_STATUS',
      'type' => 'enum',
      'options' => 'product_status_dom',
      'default' => '',
      'len' => 100,
      'audited' => true,
      'comment' => 'Product status (ex: Quoted, Ordered, Shipped)',
    ),
    'tax_class' => 
    array (
      'name' => 'tax_class',
      'vname' => 'LBL_TAX_CLASS',
      'type' => 'enum',
      'options' => 'tax_class_dom',
      'len' => 100,
      'comment' => 'Tax classification (ex: Taxable, Non-taxable)',
    ),
    'website' => 
    array (
      'name' => 'website',
      'vname' => 'LBL_URL',
      'type' => 'varchar',
      'len' => '255',
      'comment' => 'Product URL',
    ),
    'weight' => 
    array (
      'name' => 'weight',
      'vname' => 'LBL_WEIGHT',
      'type' => 'decimal',
      'len' => '12,2',
      'precision' => 2,
      'comment' => 'Weight of the product',
    ),
    'quantity' => 
    array (
      'name' => 'quantity',
      'vname' => 'LBL_QUANTITY',
      'type' => 'decimal',
      'len' => 12,
      'precision' => 2,
      'validation' => 
      array (
        'type' => 'range',
        'greaterthan' => 0,
      ),
      'comment' => 'Quantity in use',
      'default' => 1,
    ),
    'support_name' => 
    array (
      'name' => 'support_name',
      'vname' => 'LBL_SUPPORT_NAME',
      'type' => 'varchar',
      'len' => '50',
      'comment' => 'Name of product for support purposes',
    ),
    'support_description' => 
    array (
      'name' => 'support_description',
      'vname' => 'LBL_SUPPORT_DESCRIPTION',
      'type' => 'varchar',
      'len' => '255',
      'comment' => 'Description of product for support purposes',
    ),
    'support_contact' => 
    array (
      'name' => 'support_contact',
      'vname' => 'LBL_SUPPORT_CONTACT',
      'type' => 'varchar',
      'len' => '50',
      'comment' => 'Contact for support purposes',
    ),
    'support_term' => 
    array (
      'name' => 'support_term',
      'vname' => 'LBL_SUPPORT_TERM',
      'type' => 'varchar',
      'len' => 100,
      'function' => 
      array (
        'name' => 'getSupportTerms',
        'returns' => 'html',
        'include' => 'modules/ProductTemplates/ProductTemplate.php',
      ),
      'comment' => 'Term (length) of support contract',
    ),
    'date_support_expires' => 
    array (
      'name' => 'date_support_expires',
      'vname' => 'LBL_DATE_SUPPORT_EXPIRES',
      'type' => 'date',
      'comment' => 'Support expiration date',
    ),
    'date_support_starts' => 
    array (
      'name' => 'date_support_starts',
      'vname' => 'LBL_DATE_SUPPORT_STARTS',
      'type' => 'date',
      'comment' => 'Support start date',
    ),
    'pricing_formula' => 
    array (
      'name' => 'pricing_formula',
      'vname' => 'LBL_PRICING_FORMULA',
      'type' => 'varchar',
      'len' => 100,
      'comment' => 'Pricing formula (ex: Fixed, Markup over Cost)',
    ),
    'pricing_factor' => 
    array (
      'name' => 'pricing_factor',
      'vname' => 'LBL_PRICING_FACTOR',
      'type' => 'int',
      'group' => 'pricing_formula',
      'len' => '4',
      'comment' => 'Variable pricing factor depending on pricing_formula',
    ),
    'serial_number' => 
    array (
      'name' => 'serial_number',
      'vname' => 'LBL_SERIAL_NUMBER',
      'type' => 'varchar',
      'len' => '50',
      'comment' => 'Serial number of product in use',
    ),
    'asset_number' => 
    array (
      'name' => 'asset_number',
      'vname' => 'LBL_ASSET_NUMBER',
      'type' => 'varchar',
      'len' => '50',
      'comment' => 'Asset tag number of product in use',
    ),
    'book_value' => 
    array (
      'name' => 'book_value',
      'vname' => 'LBL_BOOK_VALUE',
      'type' => 'currency',
      'len' => '26,6',
      'comment' => 'Book value of product in use',
      'related_fields' => 
      array (
        0 => 'currency_id',
        1 => 'base_rate',
      ),
    ),
    'book_value_usdollar' => 
    array (
      'name' => 'book_value_usdollar',
      'vname' => 'LBL_BOOK_VALUE_USDOLLAR',
      'group' => 'book_value',
      'type' => 'currency',
      'len' => '26,6',
      'comment' => 'Book value expressed in USD',
      'studio' => 
      array (
        'editview' => false,
        'mobile' => false,
      ),
      'readonly' => true,
      'is_base_currency' => true,
      'related_fields' => 
      array (
        0 => 'currency_id',
        1 => 'base_rate',
      ),
      'formula' => 'ifElse(isNumeric($book_value), currencyDivide($book_value, $base_rate), "")',
      'calculated' => true,
      'enforced' => true,
    ),
    'book_value_date' => 
    array (
      'name' => 'book_value_date',
      'vname' => 'LBL_BOOK_VALUE_DATE',
      'type' => 'date',
      'comment' => 'Date of book value for product in use',
    ),
    'quotes' => 
    array (
      'name' => 'quotes',
      'type' => 'link',
      'relationship' => 'quote_revenuelineitems',
      'vname' => 'LBL_QUOTE',
      'source' => 'non-db',
    ),
    'best_case' => 
    array (
      'formula' => 'ifElse(equal($best_case, ""), string($total_amount), $best_case)',
      'calculated' => true,
      'name' => 'best_case',
      'vname' => 'LBL_BEST',
      'type' => 'currency',
      'len' => '26,6',
      'audited' => true,
      'showTransactionalAmount' => true,
      'related_fields' => 
      array (
        0 => 'currency_id',
        1 => 'base_rate',
        2 => 'total_amount',
        3 => 'quantity',
        4 => 'discount_amount',
        5 => 'discount_price',
      ),
      'studio' => false,
    ),
    'likely_case' => 
    array (
      'formula' => 'ifElse(equal($likely_case,""),string($total_amount),$likely_case)',
      'calculated' => true,
      'name' => 'likely_case',
      'vname' => 'LBL_LIKELY',
      'required' => true,
      'type' => 'currency',
      'len' => '26,6',
      'audited' => true,
      'showTransactionalAmount' => true,
      'related_fields' => 
      array (
        0 => 'currency_id',
        1 => 'base_rate',
        2 => 'total_amount',
        3 => 'quantity',
        4 => 'discount_amount',
        5 => 'discount_price',
      ),
      'studio' => false,
    ),
    'worst_case' => 
    array (
      'formula' => 'ifElse(equal($worst_case, ""), string($total_amount), $worst_case)',
      'calculated' => true,
      'name' => 'worst_case',
      'vname' => 'LBL_WORST',
      'type' => 'currency',
      'len' => '26,6',
      'audited' => true,
      'showTransactionalAmount' => true,
      'related_fields' => 
      array (
        0 => 'currency_id',
        1 => 'base_rate',
        2 => 'total_amount',
        3 => 'quantity',
        4 => 'discount_amount',
        5 => 'discount_price',
      ),
      'studio' => false,
    ),
    'date_closed' => 
    array (
      'name' => 'date_closed',
      'vname' => 'LBL_DATE_CLOSED',
      'required' => true,
      'type' => 'date',
      'audited' => true,
      'comment' => 'Expected or actual date the product (for opportunity) will close',
      'importable' => 'required',
      'enable_range_search' => true,
      'options' => 'date_range_search_dom',
      'related_fields' => 
      array (
        0 => 'date_closed_timestamp',
      ),
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => false,
      ),
    ),
    'date_closed_timestamp' => 
    array (
      'name' => 'date_closed_timestamp',
      'vname' => 'LBL_DATE_CLOSED_TIMESTAMP',
      'type' => 'int',
      'studio' => false,
      'reportable' => false,
      'audited' => true,
      'activity_enabled' => false,
      'formula' => 'timestamp($date_closed)',
      'calculated' => true,
      'enforced' => true,
    ),
    'next_step' => 
    array (
      'name' => 'next_step',
      'vname' => 'LBL_NEXT_STEP',
      'type' => 'varchar',
      'len' => '100',
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => true,
        'boost' => 0.48999999999999999,
      ),
      'comment' => 'The next step in the sales process',
      'merge_filter' => 'enabled',
    ),
    'commit_stage' => 
    array (
      'name' => 'commit_stage',
      'vname' => 'LBL_COMMIT_STAGE_FORECAST',
      'type' => 'enum',
      'len' => '50',
      'comment' => 'Forecast commit category: Include, Likely, Omit etc.',
      'function' => 'getCommitStageDropdown',
      'function_bean' => 'Forecasts',
      'default' => 'exclude',
      'formula' => 'forecastCommitStage($probability)',
      'calculated' => true,
      'duplicate_merge' => 'enabled',
      'related_fields' => 
      array (
        0 => 'probability',
      ),
    ),
    'sales_stage' => 
    array (
      'name' => 'sales_stage',
      'vname' => 'LBL_SALES_STAGE',
      'type' => 'enum',
      'options' => 'sales_stage_dom',
      'default' => 'Prospecting',
      'len' => '255',
      'audited' => true,
      'comment' => 'Indication of progression towards closure',
      'merge_filter' => 'enabled',
      'importable' => 'required',
      'required' => true,
    ),
    'probability' => 
    array (
      'name' => 'probability',
      'vname' => 'LBL_PROBABILITY',
      'type' => 'int',
      'dbType' => 'double',
      'audited' => true,
      'comment' => 'The probability of closure',
      'validation' => 
      array (
        'type' => 'range',
        'min' => 0,
        'max' => 100,
      ),
      'merge_filter' => 'enabled',
      'formula' => 'getDropdownValue("sales_probability_dom",$sales_stage)',
      'calculated' => true,
      'enforced' => true,
      'workflow' => false,
    ),
    'lead_source' => 
    array (
      'name' => 'lead_source',
      'vname' => 'LBL_LEAD_SOURCE',
      'type' => 'enum',
      'options' => 'lead_source_dom',
      'len' => '50',
      'comment' => 'Source of the product',
      'merge_filter' => 'enabled',
    ),
    'campaign_id' => 
    array (
      'name' => 'campaign_id',
      'comment' => 'Campaign that generated lead',
      'vname' => 'LBL_CAMPAIGN_ID',
      'rname' => 'id',
      'type' => 'id',
      'dbType' => 'id',
      'table' => 'campaigns',
      'isnull' => 'true',
      'module' => 'Campaigns',
      'reportable' => false,
      'massupdate' => false,
      'duplicate_merge' => 'disabled',
    ),
    'campaign_name' => 
    array (
      'name' => 'campaign_name',
      'rname' => 'name',
      'id_name' => 'campaign_id',
      'vname' => 'LBL_CAMPAIGN',
      'type' => 'relate',
      'link' => 'campaign_revenuelineitems',
      'isnull' => 'true',
      'table' => 'campaigns',
      'module' => 'Campaigns',
      'source' => 'non-db',
    ),
    'campaign_revenuelineitems' => 
    array (
      'name' => 'campaign_revenuelineitems',
      'type' => 'link',
      'vname' => 'LBL_CAMPAIGN_PRODUCT',
      'relationship' => 'campaign_revenuelineitems',
      'source' => 'non-db',
    ),
    'notes' => 
    array (
      'name' => 'notes',
      'type' => 'link',
      'relationship' => 'revenuelineitem_notes',
      'source' => 'non-db',
      'vname' => 'LBL_NOTES',
    ),
    'tasks' => 
    array (
      'name' => 'tasks',
      'type' => 'link',
      'relationship' => 'revenuelineitem_tasks',
      'source' => 'non-db',
      'vname' => 'LBL_NOTES',
    ),
    'archived_emails' => 
    array (
      'name' => 'archived_emails',
      'type' => 'link',
      'link_file' => 'modules/Emails/ArchivedEmailsBeanLink.php',
      'link_class' => 'ArchivedEmailsBeanLink',
      'source' => 'non-db',
      'vname' => 'LBL_EMAILS',
      'module' => 'Emails',
      'link_type' => 'many',
      'relationship' => '',
      'hideacl' => true,
      'readonly' => true,
    ),
    'documents' => 
    array (
      'name' => 'documents',
      'type' => 'link',
      'relationship' => 'documents_revenuelineitems',
      'source' => 'non-db',
      'vname' => 'LBL_DOCUMENTS_SUBPANEL_TITLE',
    ),
    'quote_name' => 
    array (
      'name' => 'quote_name',
      'rname' => 'name',
      'id_name' => 'quote_id',
      'join_name' => 'quotes',
      'type' => 'relate',
      'link' => 'quotes',
      'table' => 'quotes',
      'isnull' => 'true',
      'module' => 'Quotes',
      'dbType' => 'varchar',
      'len' => '255',
      'vname' => 'LBL_QUOTE_NAME',
      'source' => 'non-db',
      'comment' => 'Quote Name',
    ),
    'opportunity_id' => 
    array (
      'name' => 'opportunity_id',
      'type' => 'id',
      'vname' => 'LBL_OPPORTUNITY_ID',
      'required' => true,
      'reportable' => false,
      'isnull' => 'true',
      'comment' => 'The opportunity id for the line item entry',
    ),
    'opportunity_name' => 
    array (
      'name' => 'opportunity_name',
      'rname' => 'name',
      'id_name' => 'opportunity_id',
      'vname' => 'LBL_OPPORTUNITY_NAME',
      'required' => true,
      'join_name' => 'opportunities',
      'type' => 'relate',
      'link' => 'opportunities',
      'table' => 'opportunities',
      'isnull' => 'true',
      'module' => 'Opportunities',
      'source' => 'non-db',
      'comment' => 'The opportunity name associated with the opportunity_id',
      'auto_populate' => true,
      'populate_list' => 
      array (
        'account_id' => 'account_id',
        'account_name' => 'account_name',
      ),
    ),
    'product_type' => 
    array (
      'name' => 'product_type',
      'vname' => 'LBL_TYPE',
      'type' => 'enum',
      'options' => 'opportunity_type_dom',
      'len' => '255',
      'audited' => true,
      'comment' => 'Type of product ( from opportunities opportunity_type ex: Existing, New)',
      'merge_filter' => 'enabled',
    ),
    'opportunities' => 
    array (
      'name' => 'opportunities',
      'type' => 'link',
      'relationship' => 'opportunities_revenuelineitems',
      'source' => 'non-db',
      'link_type' => 'one',
      'module' => 'Opportunities',
      'bean_name' => 'Opportunity',
      'vname' => 'LBL_OPPORTUNITIES',
    ),
    'assigned_user_link' => 
    array (
      'name' => 'assigned_user_link',
      'type' => 'link',
      'relationship' => 'revenuelineitems_assigned_user',
      'vname' => 'LBL_ASSIGNED_TO_USER',
      'link_type' => 'one',
      'module' => 'Users',
      'bean_name' => 'User',
      'source' => 'non-db',
      'duplicate_merge' => 'enabled',
      'id_name' => 'assigned_user_id',
      'table' => 'users',
    ),
    'type_name' => 
    array (
      'name' => 'type_name',
      'rname' => 'name',
      'id_name' => 'type_id',
      'vname' => 'LBL_PRODUCT_TYPE',
      'join_name' => 'types',
      'type' => 'relate',
      'link' => 'revenuelineitem_types_link',
      'table' => 'product_types',
      'isnull' => 'true',
      'module' => 'ProductTypes',
      'importable' => 'false',
      'dbType' => 'varchar',
      'len' => '255',
      'source' => 'non-db',
    ),
    'account_link' => 
    array (
      'name' => 'account_link',
      'type' => 'link',
      'relationship' => 'revenuelineitems_accounts',
      'vname' => 'LBL_ACCOUNT',
      'link_type' => 'one',
      'module' => 'Accounts',
      'bean_name' => 'Account',
      'source' => 'non-db',
    ),
    'rli_categories_link' => 
    array (
      'name' => 'rli_categories_link',
      'type' => 'link',
      'relationship' => 'revenuelineitem_categories',
      'vname' => 'LBL_PRODUCT_CATEGORIES',
      'link_type' => 'one',
      'module' => 'ProductCategories',
      'bean_name' => 'ProductCategory',
      'source' => 'non-db',
    ),
    'rli_templates_link' => 
    array (
      'name' => 'rli_templates_link',
      'type' => 'link',
      'relationship' => 'revenuelineitem_templates',
      'vname' => 'LBL_PRODUCT_TEMPLATES',
      'link_type' => 'one',
      'module' => 'ProductTemplates',
      'bean_name' => 'ProductTemplate',
      'source' => 'non-db',
    ),
    'revenuelineitem_types_link' => 
    array (
      'name' => 'revenuelineitem_types_link',
      'type' => 'link',
      'relationship' => 'revenuelineitem_types',
      'vname' => 'LBL_PRODUCT_TYPES',
      'link_type' => 'one',
      'module' => 'ProductTypes',
      'bean_name' => 'ProductType',
      'source' => 'non-db',
    ),
    'products' => 
    array (
      'name' => 'products',
      'type' => 'link',
      'relationship' => 'products_revenuelineitems',
      'vname' => 'LBL_PRODUCTS',
      'source' => 'non-db',
    ),
    'account_name' => 
    array (
      'name' => 'account_name',
      'rname' => 'name',
      'id_name' => 'account_id',
      'vname' => 'LBL_ACCOUNT_NAME',
      'join_name' => 'accounts',
      'type' => 'relate',
      'link' => 'account_link',
      'table' => 'accounts',
      'module' => 'Accounts',
      'source' => 'non-db',
      'massupdate' => false,
    ),
    'projects' => 
    array (
      'name' => 'projects',
      'type' => 'link',
      'relationship' => 'projects_revenuelineitems',
      'source' => 'non-db',
      'vname' => 'LBL_PROJECTS',
    ),
    'emails' => 
    array (
      'name' => 'emails',
      'type' => 'link',
      'relationship' => 'emails_revenuelineitems_rel',
      'module' => 'Emails',
      'bean_name' => 'Email',
      'source' => 'non-db',
      'vname' => 'LBL_EMAILS',
      'studio' => 
      array (
        'formula' => false,
      ),
    ),
    'calls' => 
    array (
      'name' => 'calls',
      'type' => 'link',
      'relationship' => 'revenuelineitem_calls',
      'module' => 'Calls',
      'bean_name' => 'Call',
      'source' => 'non-db',
      'vname' => 'LBL_CALLS',
    ),
    'meetings' => 
    array (
      'name' => 'meetings',
      'type' => 'link',
      'relationship' => 'revenuelineitem_meetings',
      'module' => 'Meetings',
      'bean_name' => 'Meeting',
      'source' => 'non-db',
      'vname' => 'LBL_MEETINGS',
    ),
    'manufacturers' => 
    array (
      'name' => 'manufacturers',
      'type' => 'link',
      'relationship' => 'revenuelineitems_manufacturers',
      'vname' => 'LBL_MANUFACTURERS',
      'link_type' => 'one',
      'module' => 'Manufacturers',
      'bean_name' => 'Manufacturer',
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
      'relationship' => 'revenuelineitems_following',
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
      'relationship' => 'revenuelineitems_favorite',
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
    'tag' => 
    array (
      'name' => 'tag',
      'vname' => 'LBL_TAGS',
      'type' => 'tag',
      'link' => 'tag_link',
      'source' => 'non-db',
      'module' => 'Tags',
      'relate_collection' => true,
      'studio' => 
      array (
        'portal' => false,
        'base' => 
        array (
          'popuplist' => false,
        ),
        'mobile' => 
        array (
          'wirelesseditview' => true,
          'wirelessdetailview' => true,
        ),
      ),
      'massupdate' => true,
      'exportable' => true,
      'sortable' => false,
      'rname' => 'name',
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => false,
      ),
    ),
    'tag_link' => 
    array (
      'name' => 'tag_link',
      'type' => 'link',
      'vname' => 'LBL_TAGS_LINK',
      'relationship' => 'revenuelineitems_tags',
      'source' => 'non-db',
      'exportable' => false,
      'duplicate_merge' => 'disabled',
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
      'relationship' => 'revenuelineitems_team',
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
      'relationship' => 'revenuelineitems_team_count_relationship',
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
      'relationship' => 'revenuelineitems_teams',
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
      'readonly' => true,
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
      'relationship' => 'revenuelineitems_currencies',
      'source' => 'non-db',
      'vname' => 'LBL_CURRENCIES',
    ),
  ),
  'indices' => 
  array (
    'id' => 
    array (
      'name' => 'idx_revenuelineitems_pk',
      'type' => 'primary',
      'fields' => 
      array (
        0 => 'id',
      ),
    ),
    'date_modified' => 
    array (
      'name' => 'idx_revenue_line_items_date_modfied',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'date_modified',
      ),
    ),
    'deleted' => 
    array (
      'name' => 'idx_revenue_line_items_id_del',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'id',
        1 => 'deleted',
      ),
    ),
    'date_entered' => 
    array (
      'name' => 'idx_revenue_line_items_date_entered',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'date_entered',
      ),
    ),
    'name_del' => 
    array (
      'name' => 'idx_revenue_line_items_name_del',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'name',
        1 => 'deleted',
      ),
    ),
    0 => 
    array (
      'name' => 'idx_rli_user_dc_timestamp',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'id',
        1 => 'assigned_user_id',
        2 => 'date_closed_timestamp',
      ),
    ),
    1 => 
    array (
      'name' => 'idx_revenuelineitem_sales_stage',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'sales_stage',
      ),
    ),
    2 => 
    array (
      'name' => 'idx_revenuelineitem_probability',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'probability',
      ),
    ),
    3 => 
    array (
      'name' => 'idx_revenuelineitem_commit_stage',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'commit_stage',
      ),
    ),
    4 => 
    array (
      'name' => 'idx_revenuelineitem_quantity',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'quantity',
      ),
    ),
    5 => 
    array (
      'name' => 'idx_revenuelineitem_oppid',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'opportunity_id',
      ),
    ),
    'assigned_user_id' => 
    array (
      'name' => 'idx_revenue_line_items_assigned_del',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'deleted',
        1 => 'assigned_user_id',
      ),
    ),
    'team_set_revenue_line_items' => 
    array (
      'name' => 'idx_revenue_line_items_tmst_id',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'team_set_id',
      ),
    ),
  ),
  'relationships' => 
  array (
    'revenuelineitems_modified_user' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'RevenueLineItems',
      'rhs_table' => 'revenue_line_items',
      'rhs_key' => 'modified_user_id',
      'relationship_type' => 'one-to-many',
    ),
    'revenuelineitems_created_by' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'RevenueLineItems',
      'rhs_table' => 'revenue_line_items',
      'rhs_key' => 'created_by',
      'relationship_type' => 'one-to-many',
    ),
    'revenuelineitem_activities' => 
    array (
      'lhs_module' => 'RevenueLineItems',
      'lhs_table' => 'revenue_line_items',
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
      'relationship_role_column_value' => 'RevenueLineItems',
    ),
    'revenuelineitem_tasks' => 
    array (
      'lhs_module' => 'RevenueLineItems',
      'lhs_table' => 'revenue_line_items',
      'lhs_key' => 'id',
      'rhs_module' => 'Tasks',
      'rhs_table' => 'tasks',
      'rhs_key' => 'parent_id',
      'relationship_type' => 'one-to-many',
      'relationship_role_column' => 'parent_type',
      'relationship_role_column_value' => 'RevenueLineItems',
    ),
    'revenuelineitem_notes' => 
    array (
      'lhs_module' => 'RevenueLineItems',
      'lhs_table' => 'revenue_line_items',
      'lhs_key' => 'id',
      'rhs_module' => 'Notes',
      'rhs_table' => 'notes',
      'rhs_key' => 'parent_id',
      'relationship_type' => 'one-to-many',
      'relationship_role_column' => 'parent_type',
      'relationship_role_column_value' => 'RevenueLineItems',
    ),
    'revenuelineitems_accounts' => 
    array (
      'lhs_module' => 'Accounts',
      'lhs_table' => 'accounts',
      'lhs_key' => 'id',
      'rhs_module' => 'RevenueLineItems',
      'rhs_table' => 'revenue_line_items',
      'rhs_key' => 'account_id',
      'relationship_type' => 'one-to-many',
    ),
    'revenuelineitem_categories' => 
    array (
      'lhs_module' => 'ProductCategories',
      'lhs_table' => 'product_categories',
      'lhs_key' => 'id',
      'rhs_module' => 'RevenueLineItems',
      'rhs_table' => 'revenue_line_items',
      'rhs_key' => 'category_id',
      'relationship_type' => 'one-to-many',
    ),
    'revenuelineitem_templates' => 
    array (
      'lhs_module' => 'ProductTemplates',
      'lhs_table' => 'product_templates',
      'lhs_key' => 'id',
      'rhs_module' => 'RevenueLineItems',
      'rhs_table' => 'revenue_line_items',
      'rhs_key' => 'product_template_id',
      'relationship_type' => 'one-to-many',
    ),
    'revenuelineitem_types' => 
    array (
      'lhs_module' => 'ProductTypes',
      'lhs_table' => 'product_types',
      'lhs_key' => 'id',
      'rhs_module' => 'RevenueLineItems',
      'rhs_table' => 'revenue_line_items',
      'rhs_key' => 'type_id',
      'relationship_type' => 'one-to-many',
    ),
    'revenuelineitem_calls' => 
    array (
      'lhs_module' => 'RevenueLineItems',
      'lhs_table' => 'revenue_line_items',
      'lhs_key' => 'id',
      'rhs_module' => 'Calls',
      'rhs_table' => 'calls',
      'rhs_key' => 'parent_id',
      'relationship_type' => 'one-to-many',
      'relationship_role_column' => 'parent_type',
      'relationship_role_column_value' => 'RevenueLineItems',
    ),
    'revenuelineitem_meetings' => 
    array (
      'lhs_module' => 'RevenueLineItems',
      'lhs_table' => 'revenue_line_items',
      'lhs_key' => 'id',
      'rhs_module' => 'Meetings',
      'rhs_table' => 'meetings',
      'rhs_key' => 'parent_id',
      'relationship_type' => 'one-to-many',
      'relationship_role_column' => 'parent_type',
      'relationship_role_column_value' => 'RevenueLineItems',
    ),
    'revenuelineitems_manufacturers' => 
    array (
      'lhs_module' => 'Manufacturers',
      'lhs_table' => 'manufacturers',
      'lhs_key' => 'id',
      'rhs_module' => 'RevenueLineItems',
      'rhs_table' => 'revenue_line_items',
      'rhs_key' => 'manufacturer_id',
      'relationship_type' => 'one-to-many',
    ),
    'revenuelineitems_following' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'RevenueLineItems',
      'rhs_table' => 'revenue_line_items',
      'rhs_key' => 'id',
      'relationship_type' => 'user-based',
      'join_table' => 'subscriptions',
      'join_key_lhs' => 'created_by',
      'join_key_rhs' => 'parent_id',
      'relationship_role_column' => 'parent_type',
      'relationship_role_column_value' => 'RevenueLineItems',
      'user_field' => 'created_by',
    ),
    'revenuelineitems_favorite' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'RevenueLineItems',
      'rhs_table' => 'revenue_line_items',
      'rhs_key' => 'id',
      'relationship_type' => 'user-based',
      'join_table' => 'sugarfavorites',
      'join_key_lhs' => 'modified_user_id',
      'join_key_rhs' => 'record_id',
      'relationship_role_column' => 'module',
      'relationship_role_column_value' => 'RevenueLineItems',
      'user_field' => 'created_by',
    ),
    'revenuelineitems_tags' => 
    array (
      'lhs_module' => 'RevenueLineItems',
      'lhs_table' => 'revenue_line_items',
      'lhs_key' => 'id',
      'rhs_module' => 'Tags',
      'rhs_table' => 'tags',
      'rhs_key' => 'id',
      'relationship_type' => 'many-to-many',
      'join_table' => 'tag_bean_rel',
      'join_key_lhs' => 'bean_id',
      'join_key_rhs' => 'tag_id',
      'relationship_role_column' => 'bean_module',
      'relationship_role_column_value' => 'RevenueLineItems',
      'dynamic_subpanel' => true,
    ),
    'revenuelineitems_assigned_user' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'RevenueLineItems',
      'rhs_table' => 'revenue_line_items',
      'rhs_key' => 'assigned_user_id',
      'relationship_type' => 'one-to-many',
    ),
    'revenuelineitems_team_count_relationship' => 
    array (
      'lhs_module' => 'Teams',
      'lhs_table' => 'team_sets',
      'lhs_key' => 'id',
      'rhs_module' => 'RevenueLineItems',
      'rhs_table' => 'revenue_line_items',
      'rhs_key' => 'team_set_id',
      'relationship_type' => 'one-to-many',
    ),
    'revenuelineitems_teams' => 
    array (
      'lhs_module' => 'RevenueLineItems',
      'lhs_table' => 'revenue_line_items',
      'lhs_key' => 'team_set_id',
      'rhs_module' => 'Teams',
      'rhs_table' => 'teams',
      'rhs_key' => 'id',
      'relationship_type' => 'many-to-many',
      'join_table' => 'team_sets_teams',
      'join_key_lhs' => 'team_set_id',
      'join_key_rhs' => 'team_id',
    ),
    'revenuelineitems_team' => 
    array (
      'lhs_module' => 'Teams',
      'lhs_table' => 'teams',
      'lhs_key' => 'id',
      'rhs_module' => 'RevenueLineItems',
      'rhs_table' => 'revenue_line_items',
      'rhs_key' => 'team_id',
      'relationship_type' => 'one-to-many',
    ),
    'revenuelineitems_currencies' => 
    array (
      'lhs_module' => 'Currencies',
      'lhs_table' => 'currencies',
      'lhs_key' => 'id',
      'rhs_module' => 'RevenueLineItems',
      'rhs_table' => 'revenue_line_items',
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
          '$and' => 
          array (
            0 => 
            array (
              'opportunity_id' => 
              array (
                '$equals' => '$opportunity_id',
              ),
            ),
            1 => 
            array (
              'name' => 
              array (
                '$starts' => '$name',
              ),
            ),
          ),
        ),
      ),
      'ranking_fields' => 
      array (
        0 => 
        array (
          'in_field_name' => 'opportunity_id',
          'dupe_field_name' => 'opportunity_id',
        ),
        1 => 
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
  ),
  'favorites' => true,
  'templates' => 
  array (
    'basic' => 'basic',
    'following' => 'following',
    'favorite' => 'favorite',
    'taggable' => 'taggable',
    'assignable' => 'assignable',
    'team_security' => 'team_security',
    'currency' => 'currency',
  ),
  'custom_fields' => false,
  'related_calc_fields' => 
  array (
  ),
);