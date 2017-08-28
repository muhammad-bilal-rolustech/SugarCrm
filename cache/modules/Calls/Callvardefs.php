<?php 
 $GLOBALS["dictionary"]["Call"]=array (
  'table' => 'calls',
  'comment' => 'A Call is an activity representing a phone call',
  'activity_enabled' => true,
  'unified_search' => true,
  'full_text_search' => true,
  'unified_search_default_enabled' => true,
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
      'vname' => 'LBL_SUBJECT',
      'dbType' => 'varchar',
      'type' => 'name',
      'len' => '50',
      'comment' => 'Brief description of the call',
      'unified_search' => true,
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => true,
        'boost' => 1.4099999999999999,
      ),
      'required' => true,
      'importable' => 'required',
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
        'boost' => 0.54000000000000004,
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
      'relationship' => 'calls_created_by',
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
      'relationship' => 'calls_modified_user',
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
      'relationship' => 'call_activities',
      'vname' => 'LBL_ACTIVITY_STREAM',
      'link_type' => 'many',
      'module' => 'Activities',
      'bean_name' => 'Activity',
      'source' => 'non-db',
    ),
    'duration_hours' => 
    array (
      'name' => 'duration_hours',
      'vname' => 'LBL_DURATION_HOURS',
      'type' => 'int',
      'comment' => 'Call duration, hours portion',
      'required' => true,
      'massupdate' => false,
      'studio' => false,
      'processes' => true,
      'default' => 0,
    ),
    'duration_minutes' => 
    array (
      'name' => 'duration_minutes',
      'vname' => 'LBL_DURATION_MINUTES',
      'type' => 'enum',
      'dbType' => 'int',
      'options' => 'duration_intervals',
      'group' => 'duration_hours',
      'importable' => 'required',
      'len' => '2',
      'comment' => 'Call duration, minutes portion',
      'required' => true,
      'massupdate' => false,
      'studio' => false,
      'processes' => true,
    ),
    'date_start' => 
    array (
      'name' => 'date_start',
      'vname' => 'LBL_CALENDAR_START_DATE',
      'type' => 'datetimecombo',
      'dbType' => 'datetime',
      'comment' => 'Date in which call is schedule to (or did) start',
      'importable' => 'required',
      'required' => true,
      'massupdate' => false,
      'enable_range_search' => true,
      'options' => 'date_range_search_dom',
      'validation' => 
      array (
        'type' => 'isbefore',
        'compareto' => 'date_end',
        'blank' => false,
      ),
      'studio' => 
      array (
        'recordview' => false,
        'wirelesseditview' => false,
      ),
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => false,
      ),
    ),
    'date_end' => 
    array (
      'name' => 'date_end',
      'vname' => 'LBL_CALENDAR_END_DATE',
      'type' => 'datetimecombo',
      'dbType' => 'datetime',
      'massupdate' => false,
      'comment' => 'Date is which call is scheduled to (or did) end',
      'enable_range_search' => true,
      'options' => 'date_range_search_dom',
      'studio' => 
      array (
        'recordview' => false,
        'wirelesseditview' => false,
      ),
      'readonly' => true,
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => false,
      ),
    ),
    'parent_type' => 
    array (
      'name' => 'parent_type',
      'vname' => 'LBL_PARENT_TYPE',
      'type' => 'parent_type',
      'dbType' => 'varchar',
      'required' => false,
      'group' => 'parent_name',
      'options' => 'parent_type_display',
      'len' => 255,
      'studio' => 
      array (
        'wirelesslistview' => false,
      ),
      'comment' => 'The Sugar object to which the call is related',
    ),
    'parent_name' => 
    array (
      'name' => 'parent_name',
      'parent_type' => 'record_type_display',
      'type_name' => 'parent_type',
      'id_name' => 'parent_id',
      'vname' => 'LBL_LIST_RELATED_TO',
      'type' => 'parent',
      'group' => 'parent_name',
      'source' => 'non-db',
      'options' => 'parent_type_display',
      'studio' => true,
    ),
    'status' => 
    array (
      'name' => 'status',
      'vname' => 'LBL_STATUS',
      'type' => 'enum',
      'len' => 100,
      'options' => 'call_status_dom',
      'comment' => 'The status of the call (Held, Not Held, etc.)',
      'required' => true,
      'importable' => 'required',
      'default' => 'Planned',
      'duplicate_on_record_copy' => 'no',
      'studio' => 
      array (
        'detailview' => false,
      ),
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => false,
      ),
    ),
    'direction' => 
    array (
      'name' => 'direction',
      'vname' => 'LBL_DIRECTION',
      'type' => 'enum',
      'len' => 100,
      'options' => 'call_direction_dom',
      'comment' => 'Indicates whether call is inbound or outbound',
    ),
    'parent_id' => 
    array (
      'name' => 'parent_id',
      'vname' => 'LBL_LIST_RELATED_TO_ID',
      'type' => 'id',
      'group' => 'parent_name',
      'reportable' => false,
      'comment' => 'The ID of the parent Sugar object identified by parent_type',
    ),
    'reminder_checked' => 
    array (
      'name' => 'reminder_checked',
      'vname' => 'LBL_REMINDER',
      'type' => 'bool',
      'source' => 'non-db',
      'comment' => 'checkbox indicating whether or not the reminder value is set (Meta-data only)',
      'massupdate' => false,
      'studio' => false,
    ),
    'reminder_time' => 
    array (
      'name' => 'reminder_time',
      'vname' => 'LBL_POPUP_REMINDER_TIME',
      'type' => 'enum',
      'dbType' => 'int',
      'options' => 'reminder_time_options',
      'reportable' => false,
      'massupdate' => false,
      'default' => -1,
      'comment' => 'Specifies when a reminder alert should be issued; -1 means no alert; otherwise the number of seconds prior to the start',
      'studio' => 
      array (
        'recordview' => false,
        'wirelesseditview' => false,
      ),
    ),
    'email_reminder_checked' => 
    array (
      'name' => 'email_reminder_checked',
      'vname' => 'LBL_EMAIL_REMINDER',
      'type' => 'bool',
      'source' => 'non-db',
      'comment' => 'checkbox indicating whether or not the email reminder value is set (Meta-data only)',
      'massupdate' => false,
      'studio' => false,
    ),
    'email_reminder_time' => 
    array (
      'name' => 'email_reminder_time',
      'vname' => 'LBL_EMAIL_REMINDER_TIME',
      'type' => 'enum',
      'dbType' => 'int',
      'options' => 'reminder_time_options',
      'reportable' => false,
      'massupdate' => false,
      'default' => -1,
      'comment' => 'Specifies when a email reminder alert should be issued; -1 means no alert; otherwise the number of seconds prior to the start',
      'studio' => 
      array (
        'recordview' => false,
        'wirelesseditview' => false,
      ),
    ),
    'email_reminder_sent' => 
    array (
      'name' => 'email_reminder_sent',
      'vname' => 'LBL_EMAIL_REMINDER_SENT',
      'default' => 0,
      'type' => 'bool',
      'comment' => 'Whether email reminder is already sent',
      'studio' => false,
      'massupdate' => false,
    ),
    'outlook_id' => 
    array (
      'name' => 'outlook_id',
      'vname' => 'LBL_OUTLOOK_ID',
      'type' => 'varchar',
      'len' => '255',
      'reportable' => false,
      'comment' => 'When the Sugar Plug-in for Microsoft Outlook syncs an Outlook appointment, this is the Outlook appointment item ID',
      'studio' => false,
    ),
    'accept_status' => 
    array (
      'name' => 'accept_status',
      'vname' => 'LBL_ACCEPT_STATUS',
      'dbType' => 'varchar',
      'type' => 'varchar',
      'len' => '20',
      'source' => 'non-db',
    ),
    'set_accept_links' => 
    array (
      'name' => 'set_accept_links',
      'vname' => 'LBL_ACCEPT_LINK',
      'dbType' => 'varchar',
      'type' => 'varchar',
      'len' => '20',
      'source' => 'non-db',
    ),
    'contact_name' => 
    array (
      'name' => 'contact_name',
      'rname' => 'name',
      'db_concat_fields' => 
      array (
        0 => 'first_name',
        1 => 'last_name',
      ),
      'id_name' => 'contact_id',
      'massupdate' => false,
      'vname' => 'LBL_CONTACT_NAME',
      'type' => 'relate',
      'link' => 'contacts',
      'table' => 'contacts',
      'isnull' => 'true',
      'module' => 'Contacts',
      'join_name' => 'contacts',
      'dbType' => 'varchar',
      'source' => 'non-db',
      'len' => 36,
      'importable' => 'false',
      'studio' => false,
    ),
    'opportunities' => 
    array (
      'name' => 'opportunities',
      'type' => 'link',
      'relationship' => 'opportunity_calls',
      'source' => 'non-db',
      'link_type' => 'one',
      'vname' => 'LBL_OPPORTUNITY',
    ),
    'leads' => 
    array (
      'name' => 'leads',
      'type' => 'link',
      'relationship' => 'calls_leads',
      'source' => 'non-db',
      'vname' => 'LBL_LEADS',
    ),
    'project' => 
    array (
      'name' => 'project',
      'type' => 'link',
      'relationship' => 'projects_calls',
      'source' => 'non-db',
      'vname' => 'LBL_PROJECTS',
    ),
    'cases' => 
    array (
      'name' => 'cases',
      'type' => 'link',
      'relationship' => 'case_calls',
      'source' => 'non-db',
      'link_type' => 'one',
      'vname' => 'LBL_CASE',
    ),
    'accounts' => 
    array (
      'name' => 'accounts',
      'type' => 'link',
      'relationship' => 'account_calls',
      'module' => 'Accounts',
      'bean_name' => 'Account',
      'source' => 'non-db',
      'vname' => 'LBL_ACCOUNT',
    ),
    'revenuelineitems' => 
    array (
      'name' => 'revenuelineitems',
      'type' => 'link',
      'relationship' => 'revenuelineitem_calls',
      'module' => 'RevenueLineItems',
      'bean_name' => 'RevenueLineItem',
      'source' => 'non-db',
      'vname' => 'LBL_REVENUELINEITEMS',
      'workflow' => false,
    ),
    'products' => 
    array (
      'name' => 'products',
      'type' => 'link',
      'relationship' => 'product_calls',
      'module' => 'Products',
      'bean_name' => 'Product',
      'source' => 'non-db',
      'vname' => 'LBL_PRODUCTS',
    ),
    'bugs' => 
    array (
      'name' => 'bugs',
      'type' => 'link',
      'relationship' => 'bug_calls',
      'source' => 'non-db',
      'vname' => 'LBL_BUGS',
      'module' => 'Bugs',
    ),
    'contacts' => 
    array (
      'name' => 'contacts',
      'type' => 'link',
      'module' => 'Contacts',
      'relationship' => 'calls_contacts',
      'source' => 'non-db',
      'vname' => 'LBL_CONTACTS',
    ),
    'prospects' => 
    array (
      'name' => 'prospects',
      'type' => 'link',
      'relationship' => 'prospect_calls',
      'source' => 'non-db',
      'vname' => 'LBL_PROSPECTS',
      'module' => 'Prospects',
    ),
    'quotes' => 
    array (
      'name' => 'quotes',
      'type' => 'link',
      'relationship' => 'quote_calls',
      'source' => 'non-db',
      'vname' => 'LBL_QUOTES',
    ),
    'users' => 
    array (
      'name' => 'users',
      'type' => 'link',
      'relationship' => 'calls_users',
      'source' => 'non-db',
      'vname' => 'LBL_USERS',
    ),
    'accept_status_users' => 
    array (
      'massupdate' => false,
      'name' => 'accept_status_users',
      'type' => 'enum',
      'studio' => 'false',
      'source' => 'non-db',
      'vname' => 'LBL_ACCEPT_STATUS',
      'options' => 'dom_meeting_accept_status',
      'importable' => 'false',
      'link' => 'users',
      'rname_link' => 'accept_status',
    ),
    'notes' => 
    array (
      'name' => 'notes',
      'type' => 'link',
      'relationship' => 'calls_notes',
      'module' => 'Notes',
      'bean_name' => 'Note',
      'source' => 'non-db',
      'vname' => 'LBL_NOTES',
    ),
    'assigned_user_link' => 
    array (
      'name' => 'assigned_user_link',
      'type' => 'link',
      'relationship' => 'calls_assigned_user',
      'vname' => 'LBL_ASSIGNED_TO_USER',
      'link_type' => 'one',
      'module' => 'Users',
      'bean_name' => 'User',
      'source' => 'non-db',
      'duplicate_merge' => 'enabled',
      'id_name' => 'assigned_user_id',
      'table' => 'users',
    ),
    'contact_id' => 
    array (
      'name' => 'contact_id',
      'type' => 'relate',
      'rname' => 'id',
      'vname' => 'LBL_CONTACT_ID',
      'link' => 'contacts',
      'source' => 'non-db',
      'studio' => false,
    ),
    'repeat_type' => 
    array (
      'name' => 'repeat_type',
      'vname' => 'LBL_CALENDAR_REPEAT_TYPE',
      'type' => 'enum',
      'len' => 36,
      'options' => 'repeat_type_dom',
      'comment' => 'Type of recurrence',
      'importable' => 'false',
      'massupdate' => false,
      'reportable' => false,
      'studio' => 'false',
    ),
    'repeat_interval' => 
    array (
      'name' => 'repeat_interval',
      'vname' => 'LBL_CALENDAR_REPEAT_INTERVAL',
      'type' => 'int',
      'len' => 3,
      'default' => 1,
      'comment' => 'Interval of recurrence',
      'importable' => 'false',
      'massupdate' => false,
      'reportable' => false,
      'studio' => 'false',
    ),
    'repeat_dow' => 
    array (
      'name' => 'repeat_dow',
      'vname' => 'LBL_CALENDAR_REPEAT_DOW',
      'type' => 'varchar',
      'len' => 7,
      'comment' => 'Days of week in recurrence',
      'importable' => 'false',
      'massupdate' => false,
      'reportable' => false,
      'studio' => 'false',
    ),
    'repeat_until' => 
    array (
      'name' => 'repeat_until',
      'vname' => 'LBL_CALENDAR_REPEAT_UNTIL_DATE',
      'type' => 'date',
      'comment' => 'Repeat until specified date',
      'importable' => 'false',
      'massupdate' => false,
      'reportable' => false,
      'studio' => 'false',
    ),
    'repeat_count' => 
    array (
      'name' => 'repeat_count',
      'vname' => 'LBL_CALENDAR_REPEAT_COUNT',
      'type' => 'int',
      'len' => 7,
      'comment' => 'Number of recurrence',
      'importable' => 'false',
      'massupdate' => false,
      'reportable' => false,
      'studio' => 'false',
    ),
    'repeat_parent_id' => 
    array (
      'name' => 'repeat_parent_id',
      'vname' => 'LBL_REPEAT_PARENT_ID',
      'type' => 'id',
      'len' => 36,
      'comment' => 'Id of the first element of recurring records',
      'importable' => 'false',
      'massupdate' => false,
      'reportable' => false,
      'studio' => 'false',
    ),
    'recurring_source' => 
    array (
      'name' => 'recurring_source',
      'vname' => 'LBL_RECURRING_SOURCE',
      'type' => 'varchar',
      'len' => 36,
      'comment' => 'Source of recurring call',
      'importable' => false,
      'massupdate' => false,
      'reportable' => false,
      'studio' => false,
    ),
    'send_invites' => 
    array (
      'name' => 'send_invites',
      'vname' => 'LBL_SEND_INVITES',
      'type' => 'bool',
      'source' => 'non-db',
      'comment' => 'checkbox indicating whether or not to send out invites (Meta-data only)',
      'massupdate' => false,
    ),
    'invitees' => 
    array (
      'name' => 'invitees',
      'source' => 'non-db',
      'type' => 'collection',
      'vname' => 'LBL_INVITEES',
      'links' => 
      array (
        0 => 'contacts',
        1 => 'leads',
        2 => 'users',
      ),
      'order_by' => 'name:asc',
      'studio' => false,
    ),
    'auto_invite_parent' => 
    array (
      'name' => 'auto_invite_parent',
      'type' => 'bool',
      'source' => 'non-db',
      'comment' => 'Flag to allow for turning off auto invite of parent record -  (Meta-data only)',
      'massupdate' => false,
    ),
    'contact_parent' => 
    array (
      'name' => 'contact_parent',
      'type' => 'link',
      'relationship' => 'contact_calls_parent',
      'source' => 'non-db',
      'reportable' => false,
    ),
    'task_parent' => 
    array (
      'name' => 'task_parent',
      'type' => 'link',
      'relationship' => 'task_calls_parent',
      'source' => 'non-db',
      'reportable' => false,
    ),
    'lead_parent' => 
    array (
      'name' => 'lead_parent',
      'type' => 'link',
      'relationship' => 'lead_calls',
      'source' => 'non-db',
      'reportable' => false,
    ),
    'kbcontents_parent' => 
    array (
      'name' => 'kbcontents_parent',
      'type' => 'link',
      'relationship' => 'kbcontent_calls',
      'source' => 'non-db',
      'vname' => 'LBL_KBDOCUMENTS',
      'reportable' => false,
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
      'relationship' => 'calls_following',
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
      'relationship' => 'calls_favorite',
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
      'relationship' => 'calls_tags',
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
      'relationship' => 'calls_team',
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
      'relationship' => 'calls_team_count_relationship',
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
      'relationship' => 'calls_teams',
      'bean_filter_field' => 'team_set_id',
      'rhs_key_override' => true,
      'source' => 'non-db',
      'vname' => 'LBL_TEAMS',
      'link_class' => 'TeamSetLink',
      'link_file' => 'modules/Teams/TeamSetLink.php',
      'studio' => 'false',
      'reportable' => false,
    ),
  ),
  'indices' => 
  array (
    'id' => 
    array (
      'name' => 'idx_calls_pk',
      'type' => 'primary',
      'fields' => 
      array (
        0 => 'id',
      ),
    ),
    'date_modified' => 
    array (
      'name' => 'idx_calls_date_modfied',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'date_modified',
      ),
    ),
    'deleted' => 
    array (
      'name' => 'idx_calls_id_del',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'id',
        1 => 'deleted',
      ),
    ),
    'date_entered' => 
    array (
      'name' => 'idx_calls_date_entered',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'date_entered',
      ),
    ),
    'name_del' => 
    array (
      'name' => 'idx_calls_name_del',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'name',
        1 => 'deleted',
      ),
    ),
    0 => 
    array (
      'name' => 'idx_call_name',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'name',
      ),
    ),
    1 => 
    array (
      'name' => 'idx_status',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'status',
      ),
    ),
    2 => 
    array (
      'name' => 'idx_calls_date_start',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'date_start',
      ),
    ),
    3 => 
    array (
      'name' => 'idx_calls_date_start_end_del',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'date_start',
        1 => 'date_end',
        2 => 'deleted',
      ),
    ),
    4 => 
    array (
      'name' => 'idx_calls_repeat_parent_id',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'repeat_parent_id',
        1 => 'deleted',
      ),
    ),
    5 => 
    array (
      'name' => 'idx_calls_date_start_reminder',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'date_start',
        1 => 'reminder_time',
      ),
    ),
    6 => 
    array (
      'name' => 'idx_calls_par_del',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'parent_id',
        1 => 'parent_type',
        2 => 'deleted',
      ),
    ),
    7 => 
    array (
      'name' => 'idx_call_direction',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'direction',
      ),
    ),
    'assigned_user_id' => 
    array (
      'name' => 'idx_calls_assigned_del',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'deleted',
        1 => 'assigned_user_id',
      ),
    ),
    'team_set_calls' => 
    array (
      'name' => 'idx_calls_tmst_id',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'team_set_id',
      ),
    ),
  ),
  'relationships' => 
  array (
    'calls_modified_user' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'Calls',
      'rhs_table' => 'calls',
      'rhs_key' => 'modified_user_id',
      'relationship_type' => 'one-to-many',
    ),
    'calls_created_by' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'Calls',
      'rhs_table' => 'calls',
      'rhs_key' => 'created_by',
      'relationship_type' => 'one-to-many',
    ),
    'call_activities' => 
    array (
      'lhs_module' => 'Calls',
      'lhs_table' => 'calls',
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
      'relationship_role_column_value' => 'Calls',
    ),
    'calls_assigned_user' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'Calls',
      'rhs_table' => 'calls',
      'rhs_key' => 'assigned_user_id',
      'relationship_type' => 'one-to-many',
    ),
    'calls_notes' => 
    array (
      'lhs_module' => 'Calls',
      'lhs_table' => 'calls',
      'lhs_key' => 'id',
      'rhs_module' => 'Notes',
      'rhs_table' => 'notes',
      'rhs_key' => 'parent_id',
      'relationship_type' => 'one-to-many',
      'relationship_role_column' => 'parent_type',
      'relationship_role_column_value' => 'Calls',
    ),
    'calls_following' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'Calls',
      'rhs_table' => 'calls',
      'rhs_key' => 'id',
      'relationship_type' => 'user-based',
      'join_table' => 'subscriptions',
      'join_key_lhs' => 'created_by',
      'join_key_rhs' => 'parent_id',
      'relationship_role_column' => 'parent_type',
      'relationship_role_column_value' => 'Calls',
      'user_field' => 'created_by',
    ),
    'calls_favorite' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'Calls',
      'rhs_table' => 'calls',
      'rhs_key' => 'id',
      'relationship_type' => 'user-based',
      'join_table' => 'sugarfavorites',
      'join_key_lhs' => 'modified_user_id',
      'join_key_rhs' => 'record_id',
      'relationship_role_column' => 'module',
      'relationship_role_column_value' => 'Calls',
      'user_field' => 'created_by',
    ),
    'calls_tags' => 
    array (
      'lhs_module' => 'Calls',
      'lhs_table' => 'calls',
      'lhs_key' => 'id',
      'rhs_module' => 'Tags',
      'rhs_table' => 'tags',
      'rhs_key' => 'id',
      'relationship_type' => 'many-to-many',
      'join_table' => 'tag_bean_rel',
      'join_key_lhs' => 'bean_id',
      'join_key_rhs' => 'tag_id',
      'relationship_role_column' => 'bean_module',
      'relationship_role_column_value' => 'Calls',
      'dynamic_subpanel' => true,
    ),
    'calls_team_count_relationship' => 
    array (
      'lhs_module' => 'Teams',
      'lhs_table' => 'team_sets',
      'lhs_key' => 'id',
      'rhs_module' => 'Calls',
      'rhs_table' => 'calls',
      'rhs_key' => 'team_set_id',
      'relationship_type' => 'one-to-many',
    ),
    'calls_teams' => 
    array (
      'lhs_module' => 'Calls',
      'lhs_table' => 'calls',
      'lhs_key' => 'team_set_id',
      'rhs_module' => 'Teams',
      'rhs_table' => 'teams',
      'rhs_key' => 'id',
      'relationship_type' => 'many-to-many',
      'join_table' => 'team_sets_teams',
      'join_key_lhs' => 'team_set_id',
      'join_key_rhs' => 'team_id',
    ),
    'calls_team' => 
    array (
      'lhs_module' => 'Teams',
      'lhs_table' => 'teams',
      'lhs_key' => 'id',
      'rhs_module' => 'Calls',
      'rhs_table' => 'calls',
      'rhs_key' => 'team_id',
      'relationship_type' => 'one-to-many',
    ),
  ),
  'acls' => 
  array (
    'SugarACLOpi' => true,
    'SugarACLStatic' => true,
  ),
  'optimistic_locking' => true,
  'duplicate_check' => 
  array (
    'enabled' => false,
  ),
  'name_format_map' => 
  array (
  ),
  'visibility' => 
  array (
    'TeamSecurity' => true,
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
  ),
  'custom_fields' => false,
  'related_calc_fields' => 
  array (
  ),
);