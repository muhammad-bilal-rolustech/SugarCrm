<?php 
 $GLOBALS["dictionary"]["Account"]=array (
  'table' => 'accounts',
  'audited' => true,
  'activity_enabled' => true,
  'unified_search' => true,
  'full_text_search' => true,
  'unified_search_default_enabled' => true,
  'duplicate_merge' => true,
  'comment' => 'Accounts are organizations or entities that are the target of selling, support, and marketing activities, or have already purchased products or services',
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
      'type' => 'name',
      'dbType' => 'varchar',
      'vname' => 'LBL_NAME',
      'len' => 150,
      'comment' => 'Name of the Company',
      'unified_search' => true,
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => true,
        'boost' => 1.9099999999999999,
      ),
      'audited' => true,
      'required' => true,
      'importable' => 'required',
      'duplicate_on_record_copy' => 'always',
      'merge_filter' => 'selected',
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
        'boost' => 0.71999999999999997,
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
      'relationship' => 'accounts_created_by',
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
      'relationship' => 'accounts_modified_user',
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
      'relationship' => 'account_activities',
      'vname' => 'LBL_ACTIVITY_STREAM',
      'link_type' => 'many',
      'module' => 'Activities',
      'bean_name' => 'Activity',
      'source' => 'non-db',
    ),
    'facebook' => 
    array (
      'name' => 'facebook',
      'vname' => 'LBL_FACEBOOK',
      'type' => 'varchar',
      'len' => '100',
      'duplicate_on_record_copy' => 'always',
      'comment' => 'The facebook name of the company',
    ),
    'twitter' => 
    array (
      'name' => 'twitter',
      'vname' => 'LBL_TWITTER',
      'type' => 'varchar',
      'len' => '100',
      'duplicate_on_record_copy' => 'always',
      'comment' => 'The twitter name of the company',
    ),
    'googleplus' => 
    array (
      'name' => 'googleplus',
      'vname' => 'LBL_GOOGLEPLUS',
      'type' => 'varchar',
      'len' => '100',
      'duplicate_on_record_copy' => 'always',
      'comment' => 'The Google Plus name of the company',
    ),
    'account_type' => 
    array (
      'name' => 'account_type',
      'vname' => 'LBL_TYPE',
      'type' => 'enum',
      'options' => 'account_type_dom',
      'len' => 50,
      'duplicate_on_record_copy' => 'always',
      'comment' => 'The Company is of this type',
    ),
    'industry' => 
    array (
      'name' => 'industry',
      'vname' => 'LBL_INDUSTRY',
      'type' => 'enum',
      'options' => 'industry_dom',
      'len' => 50,
      'duplicate_on_record_copy' => 'always',
      'comment' => 'The company belongs in this industry',
      'merge_filter' => 'enabled',
    ),
    'annual_revenue' => 
    array (
      'name' => 'annual_revenue',
      'vname' => 'LBL_ANNUAL_REVENUE',
      'type' => 'varchar',
      'len' => 100,
      'duplicate_on_record_copy' => 'always',
      'comment' => 'Annual revenue for this company',
      'merge_filter' => 'enabled',
    ),
    'phone_fax' => 
    array (
      'name' => 'phone_fax',
      'vname' => 'LBL_FAX',
      'type' => 'phone',
      'dbType' => 'varchar',
      'len' => 100,
      'unified_search' => true,
      'duplicate_on_record_copy' => 'always',
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => true,
        'boost' => 1.04,
      ),
      'comment' => 'The fax phone number of this company',
    ),
    'billing_address_street' => 
    array (
      'name' => 'billing_address_street',
      'vname' => 'LBL_BILLING_ADDRESS_STREET',
      'type' => 'text',
      'dbType' => 'varchar',
      'len' => '150',
      'comment' => 'The street address used for billing address',
      'group' => 'billing_address',
      'merge_filter' => 'enabled',
      'duplicate_on_record_copy' => 'always',
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => true,
        'boost' => 0.34999999999999998,
      ),
    ),
    'billing_address_street_2' => 
    array (
      'name' => 'billing_address_street_2',
      'vname' => 'LBL_BILLING_ADDRESS_STREET_2',
      'type' => 'varchar',
      'len' => '150',
      'source' => 'non-db',
      'duplicate_on_record_copy' => 'always',
    ),
    'billing_address_street_3' => 
    array (
      'name' => 'billing_address_street_3',
      'vname' => 'LBL_BILLING_ADDRESS_STREET_3',
      'type' => 'varchar',
      'len' => '150',
      'source' => 'non-db',
      'duplicate_on_record_copy' => 'always',
    ),
    'billing_address_street_4' => 
    array (
      'name' => 'billing_address_street_4',
      'vname' => 'LBL_BILLING_ADDRESS_STREET_4',
      'type' => 'varchar',
      'len' => '150',
      'source' => 'non-db',
      'duplicate_on_record_copy' => 'always',
    ),
    'billing_address_city' => 
    array (
      'name' => 'billing_address_city',
      'vname' => 'LBL_BILLING_ADDRESS_CITY',
      'type' => 'varchar',
      'len' => '100',
      'comment' => 'The city used for billing address',
      'group' => 'billing_address',
      'merge_filter' => 'enabled',
      'duplicate_on_record_copy' => 'always',
    ),
    'billing_address_state' => 
    array (
      'name' => 'billing_address_state',
      'vname' => 'LBL_BILLING_ADDRESS_STATE',
      'type' => 'varchar',
      'len' => '100',
      'group' => 'billing_address',
      'comment' => 'The state used for billing address',
      'merge_filter' => 'enabled',
      'duplicate_on_record_copy' => 'always',
    ),
    'billing_address_postalcode' => 
    array (
      'name' => 'billing_address_postalcode',
      'vname' => 'LBL_BILLING_ADDRESS_POSTALCODE',
      'type' => 'varchar',
      'len' => '20',
      'group' => 'billing_address',
      'comment' => 'The postal code used for billing address',
      'merge_filter' => 'enabled',
      'duplicate_on_record_copy' => 'always',
    ),
    'billing_address_country' => 
    array (
      'name' => 'billing_address_country',
      'vname' => 'LBL_BILLING_ADDRESS_COUNTRY',
      'type' => 'varchar',
      'group' => 'billing_address',
      'comment' => 'The country used for the billing address',
      'merge_filter' => 'enabled',
      'duplicate_on_record_copy' => 'always',
    ),
    'rating' => 
    array (
      'name' => 'rating',
      'vname' => 'LBL_RATING',
      'type' => 'varchar',
      'len' => 100,
      'duplicate_on_record_copy' => 'always',
      'comment' => 'An arbitrary rating for this company for use in comparisons with others',
    ),
    'phone_office' => 
    array (
      'name' => 'phone_office',
      'vname' => 'LBL_PHONE_OFFICE',
      'type' => 'phone',
      'dbType' => 'varchar',
      'len' => 100,
      'audited' => true,
      'unified_search' => true,
      'duplicate_on_record_copy' => 'always',
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => true,
        'boost' => 1.05,
      ),
      'comment' => 'The office phone number',
      'merge_filter' => 'enabled',
    ),
    'phone_alternate' => 
    array (
      'name' => 'phone_alternate',
      'vname' => 'LBL_PHONE_ALT',
      'type' => 'phone',
      'group' => 'phone_office',
      'dbType' => 'varchar',
      'len' => 100,
      'unified_search' => true,
      'duplicate_on_record_copy' => 'always',
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => true,
        'boost' => 1.03,
      ),
      'comment' => 'An alternate phone number',
      'merge_filter' => 'enabled',
    ),
    'website' => 
    array (
      'name' => 'website',
      'vname' => 'LBL_WEBSITE',
      'type' => 'url',
      'dbType' => 'varchar',
      'len' => 255,
      'duplicate_on_record_copy' => 'always',
      'comment' => 'URL of website for the company',
    ),
    'ownership' => 
    array (
      'name' => 'ownership',
      'vname' => 'LBL_OWNERSHIP',
      'type' => 'varchar',
      'len' => 100,
      'duplicate_on_record_copy' => 'always',
      'comment' => '',
    ),
    'employees' => 
    array (
      'name' => 'employees',
      'vname' => 'LBL_EMPLOYEES',
      'type' => 'varchar',
      'len' => 10,
      'duplicate_on_record_copy' => 'always',
      'comment' => 'Number of employees, varchar to accomodate for both number (100) or range (50-100)',
    ),
    'ticker_symbol' => 
    array (
      'name' => 'ticker_symbol',
      'vname' => 'LBL_TICKER_SYMBOL',
      'type' => 'varchar',
      'len' => 10,
      'duplicate_on_record_copy' => 'always',
      'comment' => 'The stock trading (ticker) symbol for the company',
      'merge_filter' => 'enabled',
    ),
    'shipping_address_street' => 
    array (
      'name' => 'shipping_address_street',
      'vname' => 'LBL_SHIPPING_ADDRESS_STREET',
      'type' => 'text',
      'dbType' => 'varchar',
      'len' => 150,
      'group' => 'shipping_address',
      'duplicate_on_record_copy' => 'always',
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => true,
        'boost' => 0.34000000000000002,
      ),
      'comment' => 'The street address used for for shipping purposes',
      'merge_filter' => 'enabled',
    ),
    'shipping_address_street_2' => 
    array (
      'name' => 'shipping_address_street_2',
      'vname' => 'LBL_SHIPPING_ADDRESS_STREET_2',
      'type' => 'varchar',
      'len' => 150,
      'duplicate_on_record_copy' => 'always',
      'source' => 'non-db',
    ),
    'shipping_address_street_3' => 
    array (
      'name' => 'shipping_address_street_3',
      'vname' => 'LBL_SHIPPING_ADDRESS_STREET_3',
      'type' => 'varchar',
      'len' => 150,
      'duplicate_on_record_copy' => 'always',
      'source' => 'non-db',
    ),
    'shipping_address_street_4' => 
    array (
      'name' => 'shipping_address_street_4',
      'vname' => 'LBL_SHIPPING_ADDRESS_STREET_4',
      'type' => 'varchar',
      'len' => 150,
      'duplicate_on_record_copy' => 'always',
      'source' => 'non-db',
    ),
    'shipping_address_city' => 
    array (
      'name' => 'shipping_address_city',
      'vname' => 'LBL_SHIPPING_ADDRESS_CITY',
      'type' => 'varchar',
      'len' => 100,
      'group' => 'shipping_address',
      'duplicate_on_record_copy' => 'always',
      'comment' => 'The city used for the shipping address',
      'merge_filter' => 'enabled',
    ),
    'shipping_address_state' => 
    array (
      'name' => 'shipping_address_state',
      'vname' => 'LBL_SHIPPING_ADDRESS_STATE',
      'type' => 'varchar',
      'len' => 100,
      'group' => 'shipping_address',
      'duplicate_on_record_copy' => 'always',
      'comment' => 'The state used for the shipping address',
      'merge_filter' => 'enabled',
    ),
    'shipping_address_postalcode' => 
    array (
      'name' => 'shipping_address_postalcode',
      'vname' => 'LBL_SHIPPING_ADDRESS_POSTALCODE',
      'type' => 'varchar',
      'len' => 20,
      'group' => 'shipping_address',
      'duplicate_on_record_copy' => 'always',
      'comment' => 'The zip code used for the shipping address',
      'merge_filter' => 'enabled',
    ),
    'shipping_address_country' => 
    array (
      'name' => 'shipping_address_country',
      'vname' => 'LBL_SHIPPING_ADDRESS_COUNTRY',
      'type' => 'varchar',
      'group' => 'shipping_address',
      'duplicate_on_record_copy' => 'always',
      'comment' => 'The country used for the shipping address',
      'merge_filter' => 'enabled',
    ),
    'parent_id' => 
    array (
      'name' => 'parent_id',
      'vname' => 'LBL_PARENT_ACCOUNT_ID',
      'type' => 'id',
      'required' => false,
      'reportable' => false,
      'audited' => true,
      'comment' => 'Account ID of the parent of this account',
    ),
    'sic_code' => 
    array (
      'name' => 'sic_code',
      'vname' => 'LBL_SIC_CODE',
      'type' => 'varchar',
      'len' => 10,
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => true,
        'boost' => 1.21,
        'type' => 'exact',
      ),
      'comment' => 'SIC code of the account',
      'merge_filter' => 'enabled',
    ),
    'duns_num' => 
    array (
      'name' => 'duns_num',
      'vname' => 'LBL_DUNS_NUM',
      'type' => 'varchar',
      'len' => 15,
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => true,
        'boost' => 1.23,
        'type' => 'exact',
      ),
      'comment' => 'DUNS number of the account',
    ),
    'parent_name' => 
    array (
      'name' => 'parent_name',
      'rname' => 'name',
      'id_name' => 'parent_id',
      'vname' => 'LBL_MEMBER_OF',
      'type' => 'relate',
      'isnull' => 'true',
      'module' => 'Accounts',
      'table' => 'accounts',
      'massupdate' => false,
      'source' => 'non-db',
      'len' => 36,
      'link' => 'member_of',
      'unified_search' => true,
      'importable' => 'true',
    ),
    'members' => 
    array (
      'name' => 'members',
      'type' => 'link',
      'relationship' => 'member_accounts',
      'module' => 'Accounts',
      'bean_name' => 'Account',
      'source' => 'non-db',
      'vname' => 'LBL_MEMBERS',
    ),
    'member_of' => 
    array (
      'name' => 'member_of',
      'type' => 'link',
      'relationship' => 'member_accounts',
      'module' => 'Accounts',
      'bean_name' => 'Account',
      'link_type' => 'one',
      'source' => 'non-db',
      'vname' => 'LBL_MEMBER_OF',
      'side' => 'right',
    ),
    'cases' => 
    array (
      'name' => 'cases',
      'type' => 'link',
      'relationship' => 'account_cases',
      'module' => 'Cases',
      'bean_name' => 'aCase',
      'source' => 'non-db',
      'vname' => 'LBL_CASES',
    ),
    'tasks' => 
    array (
      'name' => 'tasks',
      'type' => 'link',
      'relationship' => 'account_tasks',
      'module' => 'Tasks',
      'bean_name' => 'Task',
      'source' => 'non-db',
      'vname' => 'LBL_TASKS',
    ),
    'notes' => 
    array (
      'name' => 'notes',
      'type' => 'link',
      'relationship' => 'account_notes',
      'module' => 'Notes',
      'bean_name' => 'Note',
      'source' => 'non-db',
      'vname' => 'LBL_NOTES',
    ),
    'meetings' => 
    array (
      'name' => 'meetings',
      'type' => 'link',
      'relationship' => 'account_meetings',
      'module' => 'Meetings',
      'bean_name' => 'Meeting',
      'source' => 'non-db',
      'vname' => 'LBL_MEETINGS',
    ),
    'calls' => 
    array (
      'name' => 'calls',
      'type' => 'link',
      'relationship' => 'account_calls',
      'module' => 'Calls',
      'bean_name' => 'Call',
      'source' => 'non-db',
      'vname' => 'LBL_CALLS',
    ),
    'emails' => 
    array (
      'name' => 'emails',
      'type' => 'link',
      'relationship' => 'emails_accounts_rel',
      'module' => 'Emails',
      'bean_name' => 'Email',
      'source' => 'non-db',
      'vname' => 'LBL_EMAILS',
      'studio' => 
      array (
        'formula' => false,
      ),
    ),
    'archived_emails' => 
    array (
      'name' => 'archived_emails',
      'type' => 'link',
      'link_file' => 'modules/Emails/ArchivedEmailsBeanLink.php',
      'link_class' => 'ArchivedEmailsBeanLink',
      'link' => 'contacts',
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
      'relationship' => 'documents_accounts',
      'source' => 'non-db',
      'vname' => 'LBL_DOCUMENTS_SUBPANEL_TITLE',
    ),
    'bugs' => 
    array (
      'name' => 'bugs',
      'type' => 'link',
      'relationship' => 'accounts_bugs',
      'module' => 'Bugs',
      'bean_name' => 'Bug',
      'source' => 'non-db',
      'vname' => 'LBL_BUGS',
    ),
    'contacts' => 
    array (
      'name' => 'contacts',
      'type' => 'link',
      'relationship' => 'accounts_contacts',
      'module' => 'Contacts',
      'bean_name' => 'Contact',
      'source' => 'non-db',
      'vname' => 'LBL_CONTACTS',
    ),
    'opportunities' => 
    array (
      'name' => 'opportunities',
      'type' => 'link',
      'relationship' => 'accounts_opportunities',
      'module' => 'Opportunities',
      'bean_name' => 'Opportunity',
      'source' => 'non-db',
      'vname' => 'LBL_OPPORTUNITY',
    ),
    'quotes' => 
    array (
      'name' => 'quotes',
      'type' => 'link',
      'relationship' => 'quotes_billto_accounts',
      'source' => 'non-db',
      'module' => 'Quotes',
      'bean_name' => 'Quote',
      'ignore_role' => true,
      'vname' => 'LBL_QUOTES',
    ),
    'quotes_shipto' => 
    array (
      'name' => 'quotes_shipto',
      'type' => 'link',
      'relationship' => 'quotes_shipto_accounts',
      'module' => 'Quotes',
      'bean_name' => 'Quote',
      'source' => 'non-db',
      'vname' => 'LBL_QUOTES_SHIP_TO',
    ),
    'project' => 
    array (
      'name' => 'project',
      'type' => 'link',
      'relationship' => 'projects_accounts',
      'module' => 'Project',
      'bean_name' => 'Project',
      'source' => 'non-db',
      'vname' => 'LBL_PROJECTS',
    ),
    'leads' => 
    array (
      'name' => 'leads',
      'type' => 'link',
      'relationship' => 'account_leads',
      'module' => 'Leads',
      'bean_name' => 'Lead',
      'source' => 'non-db',
      'vname' => 'LBL_LEADS',
      'populate_list' => 
      array (
        'name' => 'account_name',
        'phone_office' => 'phone_work',
      ),
    ),
    'campaigns' => 
    array (
      'name' => 'campaigns',
      'type' => 'link',
      'relationship' => 'account_campaign_log',
      'module' => 'CampaignLog',
      'bean_name' => 'CampaignLog',
      'source' => 'non-db',
      'vname' => 'LBL_CAMPAIGNLOG',
      'studio' => 
      array (
        'formula' => false,
      ),
    ),
    'campaign_accounts' => 
    array (
      'name' => 'campaign_accounts',
      'type' => 'link',
      'vname' => 'LBL_CAMPAIGNS',
      'relationship' => 'campaign_accounts',
      'source' => 'non-db',
    ),
    'revenuelineitems' => 
    array (
      'name' => 'revenuelineitems',
      'type' => 'link',
      'relationship' => 'revenuelineitems_accounts',
      'vname' => 'LBL_REVENUELINEITEMS',
      'module' => 'RevenueLineItems',
      'bean_name' => 'RevenueLineItem',
      'source' => 'non-db',
      'workflow' => false,
    ),
    'forecastworksheets' => 
    array (
      'name' => 'forecastworksheets',
      'type' => 'link',
      'relationship' => 'forecastworksheets_accounts',
      'vname' => 'LBL_FORECAST_WORKSHEET',
      'module' => 'ForecastWorksheets',
      'bean_name' => 'ForecastWorksheet',
      'source' => 'non-db',
    ),
    'products' => 
    array (
      'name' => 'products',
      'type' => 'link',
      'link_file' => 'modules/Products/AccountLink.php',
      'link_class' => 'AccountLink',
      'relationship' => 'products_accounts',
      'source' => 'non-db',
      'vname' => 'LBL_PRODUCTS',
    ),
    'contracts' => 
    array (
      'name' => 'contracts',
      'type' => 'link',
      'relationship' => 'account_contracts',
      'source' => 'non-db',
      'vname' => 'LBL_CONTRACTS',
    ),
    'campaign_id' => 
    array (
      'name' => 'campaign_id',
      'comment' => 'Campaign that generated Account',
      'vname' => 'LBL_CAMPAIGN_ID',
      'rname' => 'id',
      'id_name' => 'campaign_id',
      'type' => 'id',
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
      'vname' => 'LBL_CAMPAIGN',
      'type' => 'relate',
      'reportable' => false,
      'source' => 'non-db',
      'table' => 'campaigns',
      'id_name' => 'campaign_id',
      'link' => 'campaign_accounts',
      'module' => 'Campaigns',
      'duplicate_merge' => 'disabled',
      'comment' => 'The first campaign name for Account (Meta-data only)',
    ),
    'prospect_lists' => 
    array (
      'name' => 'prospect_lists',
      'type' => 'link',
      'relationship' => 'prospect_list_accounts',
      'module' => 'ProspectLists',
      'source' => 'non-db',
      'vname' => 'LBL_PROSPECT_LIST',
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
      'relationship' => 'accounts_following',
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
      'relationship' => 'accounts_favorite',
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
      'relationship' => 'accounts_tags',
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
    'assigned_user_link' => 
    array (
      'name' => 'assigned_user_link',
      'type' => 'link',
      'relationship' => 'accounts_assigned_user',
      'vname' => 'LBL_ASSIGNED_TO_USER',
      'link_type' => 'one',
      'module' => 'Users',
      'bean_name' => 'User',
      'source' => 'non-db',
      'duplicate_merge' => 'enabled',
      'id_name' => 'assigned_user_id',
      'table' => 'users',
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
      'relationship' => 'accounts_team',
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
      'relationship' => 'accounts_team_count_relationship',
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
      'relationship' => 'accounts_teams',
      'bean_filter_field' => 'team_set_id',
      'rhs_key_override' => true,
      'source' => 'non-db',
      'vname' => 'LBL_TEAMS',
      'link_class' => 'TeamSetLink',
      'link_file' => 'modules/Teams/TeamSetLink.php',
      'studio' => 'false',
      'reportable' => false,
    ),
    'email' => 
    array (
      'name' => 'email',
      'type' => 'email',
      'query_type' => 'default',
      'source' => 'non-db',
      'operator' => 'subquery',
      'subquery' => 'SELECT eabr.bean_id FROM email_addr_bean_rel eabr JOIN email_addresses ea ON (ea.id = eabr.email_address_id) WHERE eabr.deleted=0 AND ea.email_address LIKE',
      'db_field' => 
      array (
        0 => 'id',
      ),
      'vname' => 'LBL_ANY_EMAIL',
      'studio' => 
      array (
        'visible' => true,
        'searchview' => true,
        'editview' => true,
        'editField' => true,
      ),
      'duplicate_on_record_copy' => 'always',
      'len' => 100,
      'link' => 'email_addresses_primary',
      'rname' => 'email_address',
      'module' => 'EmailAddresses',
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => true,
        'boost' => 1.8899999999999999,
      ),
    ),
    'email1' => 
    array (
      'name' => 'email1',
      'vname' => 'LBL_EMAIL_ADDRESS',
      'type' => 'varchar',
      'function' => 
      array (
        'name' => 'getEmailAddressWidget',
        'returns' => 'html',
      ),
      'source' => 'non-db',
      'link' => 'email_addresses_primary',
      'rname' => 'email_address',
      'group' => 'email1',
      'merge_filter' => 'enabled',
      'module' => 'EmailAddresses',
      'studio' => false,
      'duplicate_on_record_copy' => 'always',
      'importable' => false,
    ),
    'email2' => 
    array (
      'name' => 'email2',
      'vname' => 'LBL_OTHER_EMAIL_ADDRESS',
      'type' => 'varchar',
      'function' => 
      array (
        'name' => 'getEmailAddressWidget',
        'returns' => 'html',
      ),
      'source' => 'non-db',
      'group' => 'email2',
      'merge_filter' => 'enabled',
      'studio' => 'false',
      'duplicate_on_record_copy' => 'always',
      'importable' => false,
      'workflow' => false,
    ),
    'invalid_email' => 
    array (
      'name' => 'invalid_email',
      'vname' => 'LBL_INVALID_EMAIL',
      'source' => 'non-db',
      'type' => 'bool',
      'link' => 'email_addresses_primary',
      'rname' => 'invalid_email',
      'massupdate' => false,
      'studio' => 'false',
      'duplicate_on_record_copy' => 'always',
    ),
    'email_opt_out' => 
    array (
      'name' => 'email_opt_out',
      'vname' => 'LBL_EMAIL_OPT_OUT',
      'source' => 'non-db',
      'type' => 'bool',
      'link' => 'email_addresses_primary',
      'rname' => 'opt_out',
      'massupdate' => false,
      'studio' => 'false',
      'duplicate_on_record_copy' => 'always',
    ),
    'email_addresses_primary' => 
    array (
      'name' => 'email_addresses_primary',
      'type' => 'link',
      'relationship' => 'accounts_email_addresses_primary',
      'source' => 'non-db',
      'vname' => 'LBL_EMAIL_ADDRESS_PRIMARY',
      'duplicate_merge' => 'disabled',
      'primary_only' => true,
    ),
    'email_addresses' => 
    array (
      'name' => 'email_addresses',
      'type' => 'link',
      'relationship' => 'accounts_email_addresses',
      'source' => 'non-db',
      'vname' => 'LBL_EMAIL_ADDRESSES',
      'reportable' => false,
      'unified_search' => true,
      'rel_fields' => 
      array (
        'primary_address' => 
        array (
          'type' => 'bool',
        ),
      ),
    ),
    'email_addresses_non_primary' => 
    array (
      'name' => 'email_addresses_non_primary',
      'type' => 'varchar',
      'source' => 'non-db',
      'vname' => 'LBL_EMAIL_NON_PRIMARY',
      'studio' => false,
      'reportable' => false,
      'massupdate' => false,
    ),
  ),
  'indices' => 
  array (
    'id' => 
    array (
      'name' => 'idx_accounts_pk',
      'type' => 'primary',
      'fields' => 
      array (
        0 => 'id',
      ),
    ),
    'date_modified' => 
    array (
      'name' => 'idx_accounts_date_modfied',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'date_modified',
      ),
    ),
    'deleted' => 
    array (
      'name' => 'idx_accounts_id_del',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'id',
        1 => 'deleted',
      ),
    ),
    'date_entered' => 
    array (
      'name' => 'idx_accounts_date_entered',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'date_entered',
      ),
    ),
    'name_del' => 
    array (
      'name' => 'idx_accounts_name_del',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'name',
        1 => 'deleted',
      ),
    ),
    0 => 
    array (
      'name' => 'idx_accnt_parent_id',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'parent_id',
      ),
    ),
    1 => 
    array (
      'name' => 'idx_account_billing_address_city',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'billing_address_city',
      ),
    ),
    2 => 
    array (
      'name' => 'idx_account_billing_address_country',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'billing_address_country',
      ),
    ),
    'assigned_user_id' => 
    array (
      'name' => 'idx_accounts_assigned_del',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'deleted',
        1 => 'assigned_user_id',
      ),
    ),
    'team_set_accounts' => 
    array (
      'name' => 'idx_accounts_tmst_id',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'team_set_id',
      ),
    ),
  ),
  'relationships' => 
  array (
    'accounts_modified_user' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'Accounts',
      'rhs_table' => 'accounts',
      'rhs_key' => 'modified_user_id',
      'relationship_type' => 'one-to-many',
    ),
    'accounts_created_by' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'Accounts',
      'rhs_table' => 'accounts',
      'rhs_key' => 'created_by',
      'relationship_type' => 'one-to-many',
    ),
    'account_activities' => 
    array (
      'lhs_module' => 'Accounts',
      'lhs_table' => 'accounts',
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
      'relationship_role_column_value' => 'Accounts',
    ),
    'member_accounts' => 
    array (
      'lhs_module' => 'Accounts',
      'lhs_table' => 'accounts',
      'lhs_key' => 'id',
      'rhs_module' => 'Accounts',
      'rhs_table' => 'accounts',
      'rhs_key' => 'parent_id',
      'relationship_type' => 'one-to-many',
    ),
    'account_cases' => 
    array (
      'lhs_module' => 'Accounts',
      'lhs_table' => 'accounts',
      'lhs_key' => 'id',
      'rhs_module' => 'Cases',
      'rhs_table' => 'cases',
      'rhs_key' => 'account_id',
      'relationship_type' => 'one-to-many',
    ),
    'account_tasks' => 
    array (
      'lhs_module' => 'Accounts',
      'lhs_table' => 'accounts',
      'lhs_key' => 'id',
      'rhs_module' => 'Tasks',
      'rhs_table' => 'tasks',
      'rhs_key' => 'parent_id',
      'relationship_type' => 'one-to-many',
      'relationship_role_column' => 'parent_type',
      'relationship_role_column_value' => 'Accounts',
    ),
    'account_notes' => 
    array (
      'lhs_module' => 'Accounts',
      'lhs_table' => 'accounts',
      'lhs_key' => 'id',
      'rhs_module' => 'Notes',
      'rhs_table' => 'notes',
      'rhs_key' => 'parent_id',
      'relationship_type' => 'one-to-many',
      'relationship_role_column' => 'parent_type',
      'relationship_role_column_value' => 'Accounts',
    ),
    'account_meetings' => 
    array (
      'lhs_module' => 'Accounts',
      'lhs_table' => 'accounts',
      'lhs_key' => 'id',
      'rhs_module' => 'Meetings',
      'rhs_table' => 'meetings',
      'rhs_key' => 'parent_id',
      'relationship_type' => 'one-to-many',
      'relationship_role_column' => 'parent_type',
      'relationship_role_column_value' => 'Accounts',
    ),
    'account_calls' => 
    array (
      'lhs_module' => 'Accounts',
      'lhs_table' => 'accounts',
      'lhs_key' => 'id',
      'rhs_module' => 'Calls',
      'rhs_table' => 'calls',
      'rhs_key' => 'parent_id',
      'relationship_type' => 'one-to-many',
      'relationship_role_column' => 'parent_type',
      'relationship_role_column_value' => 'Accounts',
    ),
    'account_emails' => 
    array (
      'lhs_module' => 'Accounts',
      'lhs_table' => 'accounts',
      'lhs_key' => 'id',
      'rhs_module' => 'Emails',
      'rhs_table' => 'emails',
      'rhs_key' => 'parent_id',
      'relationship_type' => 'one-to-many',
      'relationship_role_column' => 'parent_type',
      'relationship_role_column_value' => 'Accounts',
    ),
    'account_leads' => 
    array (
      'lhs_module' => 'Accounts',
      'lhs_table' => 'accounts',
      'lhs_key' => 'id',
      'rhs_module' => 'Leads',
      'rhs_table' => 'leads',
      'rhs_key' => 'account_id',
      'relationship_type' => 'one-to-many',
    ),
    'accounts_assigned_user' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'Accounts',
      'rhs_table' => 'accounts',
      'rhs_key' => 'assigned_user_id',
      'relationship_type' => 'one-to-many',
    ),
    'account_campaign_log' => 
    array (
      'lhs_module' => 'Accounts',
      'lhs_table' => 'accounts',
      'lhs_key' => 'id',
      'rhs_module' => 'CampaignLog',
      'rhs_table' => 'campaign_log',
      'rhs_key' => 'target_id',
      'relationship_type' => 'one-to-many',
    ),
    'accounts_following' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'Accounts',
      'rhs_table' => 'accounts',
      'rhs_key' => 'id',
      'relationship_type' => 'user-based',
      'join_table' => 'subscriptions',
      'join_key_lhs' => 'created_by',
      'join_key_rhs' => 'parent_id',
      'relationship_role_column' => 'parent_type',
      'relationship_role_column_value' => 'Accounts',
      'user_field' => 'created_by',
    ),
    'accounts_favorite' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'Accounts',
      'rhs_table' => 'accounts',
      'rhs_key' => 'id',
      'relationship_type' => 'user-based',
      'join_table' => 'sugarfavorites',
      'join_key_lhs' => 'modified_user_id',
      'join_key_rhs' => 'record_id',
      'relationship_role_column' => 'module',
      'relationship_role_column_value' => 'Accounts',
      'user_field' => 'created_by',
    ),
    'accounts_tags' => 
    array (
      'lhs_module' => 'Accounts',
      'lhs_table' => 'accounts',
      'lhs_key' => 'id',
      'rhs_module' => 'Tags',
      'rhs_table' => 'tags',
      'rhs_key' => 'id',
      'relationship_type' => 'many-to-many',
      'join_table' => 'tag_bean_rel',
      'join_key_lhs' => 'bean_id',
      'join_key_rhs' => 'tag_id',
      'relationship_role_column' => 'bean_module',
      'relationship_role_column_value' => 'Accounts',
      'dynamic_subpanel' => true,
    ),
    'accounts_team_count_relationship' => 
    array (
      'lhs_module' => 'Teams',
      'lhs_table' => 'team_sets',
      'lhs_key' => 'id',
      'rhs_module' => 'Accounts',
      'rhs_table' => 'accounts',
      'rhs_key' => 'team_set_id',
      'relationship_type' => 'one-to-many',
    ),
    'accounts_teams' => 
    array (
      'lhs_module' => 'Accounts',
      'lhs_table' => 'accounts',
      'lhs_key' => 'team_set_id',
      'rhs_module' => 'Teams',
      'rhs_table' => 'teams',
      'rhs_key' => 'id',
      'relationship_type' => 'many-to-many',
      'join_table' => 'team_sets_teams',
      'join_key_lhs' => 'team_set_id',
      'join_key_rhs' => 'team_id',
    ),
    'accounts_team' => 
    array (
      'lhs_module' => 'Teams',
      'lhs_table' => 'teams',
      'lhs_key' => 'id',
      'rhs_module' => 'Accounts',
      'rhs_table' => 'accounts',
      'rhs_key' => 'team_id',
      'relationship_type' => 'one-to-many',
    ),
    'accounts_email_addresses' => 
    array (
      'lhs_module' => 'Accounts',
      'lhs_table' => 'accounts',
      'lhs_key' => 'id',
      'rhs_module' => 'EmailAddresses',
      'rhs_table' => 'email_addresses',
      'rhs_key' => 'id',
      'relationship_type' => 'many-to-many',
      'join_table' => 'email_addr_bean_rel',
      'join_key_lhs' => 'bean_id',
      'join_key_rhs' => 'email_address_id',
      'relationship_role_column' => 'bean_module',
      'relationship_role_column_value' => 'Accounts',
    ),
    'accounts_email_addresses_primary' => 
    array (
      'lhs_module' => 'Accounts',
      'lhs_table' => 'accounts',
      'lhs_key' => 'id',
      'rhs_module' => 'EmailAddresses',
      'rhs_table' => 'email_addresses',
      'rhs_key' => 'id',
      'relationship_type' => 'many-to-many',
      'join_table' => 'email_addr_bean_rel',
      'join_key_lhs' => 'bean_id',
      'join_key_rhs' => 'email_address_id',
      'relationship_role_column' => 'bean_module',
      'relationship_role_column_value' => 'Accounts',
      'primary_flag_column' => 'primary_address',
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
          '$or' => 
          array (
            0 => 
            array (
              'name' => 
              array (
                '$equals' => '$name',
              ),
            ),
            1 => 
            array (
              'duns_num' => 
              array (
                '$equals' => '$duns_num',
              ),
            ),
            2 => 
            array (
              '$and' => 
              array (
                0 => 
                array (
                  'name' => 
                  array (
                    '$starts' => '$name',
                  ),
                ),
                1 => 
                array (
                  '$or' => 
                  array (
                    0 => 
                    array (
                      'billing_address_city' => 
                      array (
                        '$starts' => '$billing_address_city',
                      ),
                    ),
                    1 => 
                    array (
                      'shipping_address_city' => 
                      array (
                        '$starts' => '$shipping_address_city',
                      ),
                    ),
                  ),
                ),
              ),
            ),
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
        1 => 
        array (
          'in_field_name' => 'billing_address_city',
          'dupe_field_name' => 'billing_address_city',
        ),
        2 => 
        array (
          'in_field_name' => 'shipping_address_city',
          'dupe_field_name' => 'shipping_address_city',
        ),
      ),
    ),
  ),
  'optimistic_locking' => true,
  'name_format_map' => 
  array (
  ),
  'visibility' => 
  array (
    'TeamSecurity' => true,
  ),
  'acls' => 
  array (
    'SugarACLEmailAddress' => true,
    'SugarACLStatic' => true,
  ),
  'templates' => 
  array (
    'company' => 'company',
    'basic' => 'basic',
    'following' => 'following',
    'favorite' => 'favorite',
    'taggable' => 'taggable',
    'assignable' => 'assignable',
    'team_security' => 'team_security',
    'email_address' => 'email_address',
  ),
  'favorites' => true,
  'custom_fields' => false,
  'related_calc_fields' => 
  array (
    0 => 'forecastworksheets',
  ),
);