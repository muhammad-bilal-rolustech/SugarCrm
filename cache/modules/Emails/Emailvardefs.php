<?php 
 $GLOBALS["dictionary"]["Email"]=array (
  'table' => 'emails',
  'acl_fields' => false,
  'full_text_search' => true,
  'activity_enabled' => true,
  'comment' => 'Contains a record of emails sent to and from the Sugar application',
  'fields' => 
  array (
    'id' => 
    array (
      'name' => 'id',
      'vname' => 'LBL_ID',
      'type' => 'id',
      'required' => true,
      'reportable' => true,
      'comment' => 'Unique identifier',
    ),
    'date_entered' => 
    array (
      'name' => 'date_entered',
      'vname' => 'LBL_DATE_ENTERED',
      'type' => 'datetime',
      'required' => true,
      'comment' => 'Date record created',
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
      'required' => true,
      'comment' => 'Date record last modified',
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
    ),
    'assigned_user_id' => 
    array (
      'name' => 'assigned_user_id',
      'vname' => 'LBL_ASSIGNED_TO',
      'type' => 'id',
      'isnull' => false,
      'reportable' => false,
      'comment' => 'User ID that last modified record',
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
      'id_name' => 'assigned_user_id',
      'vname' => 'LBL_ASSIGNED_TO',
      'link' => 'assigned_user_link',
      'rname' => 'full_name',
      'type' => 'relate',
      'reportable' => false,
      'source' => 'non-db',
      'table' => 'users',
      'module' => 'Users',
    ),
    'modified_user_id' => 
    array (
      'name' => 'modified_user_id',
      'rname' => 'user_name',
      'id_name' => 'modified_user_id',
      'vname' => 'LBL_MODIFIED_BY',
      'type' => 'assigned_user_name',
      'table' => 'users',
      'isnull' => false,
      'reportable' => true,
      'dbType' => 'id',
      'comment' => 'User ID that last modified record',
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
      'vname' => 'LBL_MODIFIED_NAME',
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
    ),
    'created_by' => 
    array (
      'name' => 'created_by',
      'vname' => 'LBL_CREATED_BY',
      'type' => 'id',
      'len' => '36',
      'reportable' => false,
      'comment' => 'User name who created record',
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
    ),
    'deleted' => 
    array (
      'name' => 'deleted',
      'vname' => 'LBL_DELETED',
      'type' => 'bool',
      'required' => false,
      'reportable' => false,
      'comment' => 'Record deletion indicator',
    ),
    'from_addr_name' => 
    array (
      'name' => 'from_addr_name',
      'type' => 'varchar',
      'vname' => 'from_addr_name',
      'source' => 'non-db',
    ),
    'reply_to_addr' => 
    array (
      'name' => 'reply_to_addr',
      'type' => 'varchar',
      'vname' => 'reply_to_addr',
      'source' => 'non-db',
    ),
    'to_addrs_names' => 
    array (
      'name' => 'to_addrs_names',
      'type' => 'varchar',
      'vname' => 'to_addrs_names',
      'source' => 'non-db',
    ),
    'cc_addrs_names' => 
    array (
      'name' => 'cc_addrs_names',
      'type' => 'varchar',
      'vname' => 'cc_addrs_names',
      'source' => 'non-db',
    ),
    'bcc_addrs_names' => 
    array (
      'name' => 'bcc_addrs_names',
      'type' => 'varchar',
      'vname' => 'bcc_addrs_names',
      'source' => 'non-db',
    ),
    'raw_source' => 
    array (
      'name' => 'raw_source',
      'type' => 'varchar',
      'vname' => 'raw_source',
      'source' => 'non-db',
    ),
    'description_html' => 
    array (
      'name' => 'description_html',
      'type' => 'varchar',
      'vname' => 'description_html',
      'source' => 'non-db',
    ),
    'description' => 
    array (
      'name' => 'description',
      'type' => 'varchar',
      'vname' => 'description',
      'source' => 'non-db',
      'full_text_search' => 
      array (
        'enabled' => false,
        'searchable' => true,
        'type' => 'text',
      ),
    ),
    'date_sent' => 
    array (
      'name' => 'date_sent',
      'vname' => 'LBL_DATE_SENT',
      'type' => 'datetime',
    ),
    'message_id' => 
    array (
      'name' => 'message_id',
      'vname' => 'LBL_MESSAGE_ID',
      'type' => 'varchar',
      'len' => 255,
      'comment' => 'ID of the email item obtained from the email transport system',
    ),
    'message_uid' => 
    array (
      'name' => 'message_uid',
      'vname' => 'LBL_MESSAGE_UID',
      'type' => 'varchar',
      'len' => 64,
      'comment' => 'UID of the email item obtained from the email transport system',
    ),
    'name' => 
    array (
      'name' => 'name',
      'vname' => 'LBL_SUBJECT',
      'type' => 'name',
      'dbType' => 'varchar',
      'required' => false,
      'len' => '255',
      'comment' => 'The subject of the email',
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => true,
      ),
    ),
    'type' => 
    array (
      'name' => 'type',
      'vname' => 'LBL_LIST_TYPE',
      'type' => 'enum',
      'options' => 'dom_email_types',
      'len' => 100,
      'massupdate' => false,
      'comment' => 'Type of email (ex: draft)',
    ),
    'status' => 
    array (
      'name' => 'status',
      'vname' => 'LBL_STATUS',
      'type' => 'enum',
      'len' => 100,
      'options' => 'dom_email_status',
    ),
    'flagged' => 
    array (
      'name' => 'flagged',
      'vname' => 'LBL_EMAIL_FLAGGED',
      'type' => 'bool',
      'required' => false,
      'reportable' => false,
      'comment' => 'flagged status',
    ),
    'reply_to_status' => 
    array (
      'name' => 'reply_to_status',
      'vname' => 'LBL_EMAIL_REPLY_TO_STATUS',
      'type' => 'bool',
      'required' => false,
      'reportable' => false,
      'comment' => 'I you reply to an email then reply to status of original email is set',
    ),
    'intent' => 
    array (
      'name' => 'intent',
      'vname' => 'LBL_INTENT',
      'type' => 'varchar',
      'len' => 100,
      'default' => 'pick',
      'comment' => 'Target of action used in Inbound Email assignment',
    ),
    'mailbox_id' => 
    array (
      'name' => 'mailbox_id',
      'vname' => 'LBL_MAILBOX_ID',
      'type' => 'id',
      'len' => '36',
      'reportable' => false,
    ),
    'created_by_link' => 
    array (
      'name' => 'created_by_link',
      'type' => 'link',
      'relationship' => 'emails_created_by',
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
      'relationship' => 'emails_modified_user',
      'vname' => 'LBL_MODIFIED_BY_USER',
      'link_type' => 'one',
      'module' => 'Users',
      'bean_name' => 'User',
      'source' => 'non-db',
    ),
    'assigned_user_link' => 
    array (
      'name' => 'assigned_user_link',
      'type' => 'link',
      'relationship' => 'emails_assigned_user',
      'vname' => 'LBL_ASSIGNED_TO_USER',
      'link_type' => 'one',
      'module' => 'Users',
      'bean_name' => 'User',
      'source' => 'non-db',
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
      'reportable' => false,
      'source' => 'non-db',
      'options' => 'parent_type_display',
    ),
    'parent_type' => 
    array (
      'name' => 'parent_type',
      'vname' => 'LBL_PARENT_TYPE',
      'type' => 'parent_type',
      'dbType' => 'varchar',
      'group' => 'parent_name',
      'options' => 'parent_type_display',
      'reportable' => false,
      'comment' => 'Identifier of Sugar module to which this email is associated',
    ),
    'parent_id' => 
    array (
      'name' => 'parent_id',
      'vname' => 'LBL_PARENT_ID',
      'type' => 'id',
      'group' => 'parent_name',
      'reportable' => false,
      'comment' => 'ID of Sugar object referenced by parent_type',
    ),
    'accounts' => 
    array (
      'name' => 'accounts',
      'vname' => 'LBL_EMAILS_ACCOUNTS_REL',
      'type' => 'link',
      'relationship' => 'emails_accounts_rel',
      'module' => 'Accounts',
      'bean_name' => 'Account',
      'source' => 'non-db',
    ),
    'bugs' => 
    array (
      'name' => 'bugs',
      'vname' => 'LBL_EMAILS_BUGS_REL',
      'type' => 'link',
      'relationship' => 'emails_bugs_rel',
      'module' => 'Bugs',
      'bean_name' => 'Bug',
      'source' => 'non-db',
    ),
    'cases' => 
    array (
      'name' => 'cases',
      'vname' => 'LBL_EMAILS_CASES_REL',
      'type' => 'link',
      'relationship' => 'emails_cases_rel',
      'module' => 'Cases',
      'bean_name' => 'Case',
      'source' => 'non-db',
    ),
    'contacts' => 
    array (
      'name' => 'contacts',
      'vname' => 'LBL_EMAILS_CONTACTS_REL',
      'type' => 'link',
      'relationship' => 'emails_contacts_rel',
      'module' => 'Contacts',
      'bean_name' => 'Contact',
      'source' => 'non-db',
    ),
    'leads' => 
    array (
      'name' => 'leads',
      'vname' => 'LBL_EMAILS_LEADS_REL',
      'type' => 'link',
      'relationship' => 'emails_leads_rel',
      'module' => 'Leads',
      'bean_name' => 'Lead',
      'source' => 'non-db',
    ),
    'opportunities' => 
    array (
      'name' => 'opportunities',
      'vname' => 'LBL_EMAILS_OPPORTUNITIES_REL',
      'type' => 'link',
      'relationship' => 'emails_opportunities_rel',
      'module' => 'Opportunities',
      'bean_name' => 'Opportunity',
      'source' => 'non-db',
    ),
    'project' => 
    array (
      'name' => 'project',
      'vname' => 'LBL_EMAILS_PROJECT_REL',
      'type' => 'link',
      'relationship' => 'emails_projects_rel',
      'module' => 'Project',
      'bean_name' => 'Project',
      'source' => 'non-db',
    ),
    'projecttask' => 
    array (
      'name' => 'projecttask',
      'vname' => 'LBL_EMAILS_PROJECT_TASK_REL',
      'type' => 'link',
      'relationship' => 'emails_project_task_rel',
      'module' => 'ProjectTask',
      'bean_name' => 'ProjectTask',
      'source' => 'non-db',
    ),
    'prospects' => 
    array (
      'name' => 'prospects',
      'vname' => 'LBL_EMAILS_PROSPECT_REL',
      'type' => 'link',
      'relationship' => 'emails_prospects_rel',
      'module' => 'Prospects',
      'bean_name' => 'Prospect',
      'source' => 'non-db',
    ),
    'quotes' => 
    array (
      'name' => 'quotes',
      'vname' => 'LBL_EMAILS_QUOTES_REL',
      'type' => 'link',
      'relationship' => 'emails_quotes',
      'module' => 'Quotes',
      'bean_name' => 'Quote',
      'source' => 'non-db',
    ),
    'revenuelineitems' => 
    array (
      'name' => 'revenuelineitems',
      'vname' => 'LBL_EMAILS_REVENUELINEITEMS_REL',
      'type' => 'link',
      'relationship' => 'emails_revenuelineitems_rel',
      'module' => 'RevenueLineItems',
      'bean_name' => 'RevenueLineItem',
      'source' => 'non-db',
      'workflow' => false,
    ),
    'products' => 
    array (
      'name' => 'products',
      'vname' => 'LBL_EMAILS_PRODUCTS_REL',
      'type' => 'link',
      'relationship' => 'emails_products_rel',
      'module' => 'Products',
      'bean_name' => 'Product',
      'source' => 'non-db',
    ),
    'tasks' => 
    array (
      'name' => 'tasks',
      'vname' => 'LBL_EMAILS_TASKS_REL',
      'type' => 'link',
      'relationship' => 'emails_tasks_rel',
      'module' => 'Tasks',
      'bean_name' => 'Task',
      'source' => 'non-db',
    ),
    'users' => 
    array (
      'name' => 'users',
      'vname' => 'LBL_EMAILS_USERS_REL',
      'type' => 'link',
      'relationship' => 'emails_users_rel',
      'module' => 'Users',
      'bean_name' => 'User',
      'source' => 'non-db',
    ),
    'notes' => 
    array (
      'name' => 'notes',
      'vname' => 'LBL_EMAILS_NOTES_REL',
      'type' => 'link',
      'relationship' => 'emails_notes_rel',
      'module' => 'Notes',
      'bean_name' => 'Note',
      'source' => 'non-db',
    ),
    'meetings' => 
    array (
      'name' => 'meetings',
      'vname' => 'LBL_EMAILS_MEETINGS_REL',
      'type' => 'link',
      'relationship' => 'emails_meetings_rel',
      'module' => 'Meetings',
      'bean_name' => 'Meeting',
      'source' => 'non-db',
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
      'relationship' => 'emails_team',
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
      'relationship' => 'emails_team_count_relationship',
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
      'relationship' => 'emails_teams',
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
  'relationships' => 
  array (
    'emails_assigned_user' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'Emails',
      'rhs_table' => 'emails',
      'rhs_key' => 'assigned_user_id',
      'relationship_type' => 'one-to-many',
    ),
    'emails_modified_user' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'Emails',
      'rhs_table' => 'emails',
      'rhs_key' => 'modified_user_id',
      'relationship_type' => 'one-to-many',
    ),
    'emails_created_by' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'Emails',
      'rhs_table' => 'emails',
      'rhs_key' => 'created_by',
      'relationship_type' => 'one-to-many',
    ),
    'emails_notes_rel' => 
    array (
      'lhs_module' => 'Emails',
      'lhs_table' => 'emails',
      'lhs_key' => 'id',
      'rhs_module' => 'Notes',
      'rhs_table' => 'notes',
      'rhs_key' => 'parent_id',
      'relationship_type' => 'one-to-many',
    ),
    'emails_contacts_rel' => 
    array (
      'lhs_module' => 'Emails',
      'lhs_table' => 'emails',
      'lhs_key' => 'id',
      'rhs_module' => 'Contacts',
      'rhs_table' => 'contacts',
      'rhs_key' => 'id',
      'relationship_type' => 'many-to-many',
      'join_table' => 'emails_beans',
      'join_key_lhs' => 'email_id',
      'join_key_rhs' => 'bean_id',
      'relationship_role_column' => 'bean_module',
      'relationship_role_column_value' => 'Contacts',
    ),
    'emails_accounts_rel' => 
    array (
      'lhs_module' => 'Emails',
      'lhs_table' => 'emails',
      'lhs_key' => 'id',
      'rhs_module' => 'Accounts',
      'rhs_table' => 'accounts',
      'rhs_key' => 'id',
      'relationship_type' => 'many-to-many',
      'join_table' => 'emails_beans',
      'join_key_lhs' => 'email_id',
      'join_key_rhs' => 'bean_id',
      'relationship_role_column' => 'bean_module',
      'relationship_role_column_value' => 'Accounts',
    ),
    'emails_leads_rel' => 
    array (
      'lhs_module' => 'Emails',
      'lhs_table' => 'emails',
      'lhs_key' => 'id',
      'rhs_module' => 'Leads',
      'rhs_table' => 'leads',
      'rhs_key' => 'id',
      'relationship_type' => 'many-to-many',
      'join_table' => 'emails_beans',
      'join_key_lhs' => 'email_id',
      'join_key_rhs' => 'bean_id',
      'relationship_role_column' => 'bean_module',
      'relationship_role_column_value' => 'Leads',
    ),
    'emails_revenuelineitems_rel' => 
    array (
      'lhs_module' => 'Emails',
      'lhs_table' => 'emails',
      'lhs_key' => 'id',
      'rhs_module' => 'RevenueLineItems',
      'rhs_table' => 'revenue_line_items',
      'rhs_key' => 'id',
      'relationship_type' => 'many-to-many',
      'join_table' => 'emails_beans',
      'join_key_lhs' => 'email_id',
      'join_key_rhs' => 'bean_id',
      'relationship_role_column' => 'bean_module',
      'relationship_role_column_value' => 'RevenueLineItems',
    ),
    'emails_products_rel' => 
    array (
      'lhs_module' => 'Emails',
      'lhs_table' => 'emails',
      'lhs_key' => 'id',
      'rhs_module' => 'Products',
      'rhs_table' => 'products',
      'rhs_key' => 'id',
      'relationship_type' => 'many-to-many',
      'join_table' => 'emails_beans',
      'join_key_lhs' => 'email_id',
      'join_key_rhs' => 'bean_id',
      'relationship_role_column' => 'bean_module',
      'relationship_role_column_value' => 'Products',
    ),
    'emails_meetings_rel' => 
    array (
      'lhs_module' => 'Emails',
      'lhs_table' => 'emails',
      'lhs_key' => 'id',
      'rhs_module' => 'Meetings',
      'rhs_table' => 'meetings',
      'rhs_key' => 'parent_id',
      'relationship_type' => 'one-to-many',
    ),
    'emails_team_count_relationship' => 
    array (
      'lhs_module' => 'Teams',
      'lhs_table' => 'team_sets',
      'lhs_key' => 'id',
      'rhs_module' => 'Emails',
      'rhs_table' => 'emails',
      'rhs_key' => 'team_set_id',
      'relationship_type' => 'one-to-many',
    ),
    'emails_teams' => 
    array (
      'lhs_module' => 'Emails',
      'lhs_table' => 'emails',
      'lhs_key' => 'team_set_id',
      'rhs_module' => 'Teams',
      'rhs_table' => 'teams',
      'rhs_key' => 'id',
      'relationship_type' => 'many-to-many',
      'join_table' => 'team_sets_teams',
      'join_key_lhs' => 'team_set_id',
      'join_key_rhs' => 'team_id',
    ),
    'emails_team' => 
    array (
      'lhs_module' => 'Teams',
      'lhs_table' => 'teams',
      'lhs_key' => 'id',
      'rhs_module' => 'Emails',
      'rhs_table' => 'emails',
      'rhs_key' => 'team_id',
      'relationship_type' => 'one-to-many',
    ),
  ),
  'indices' => 
  array (
    0 => 
    array (
      'name' => 'emailspk',
      'type' => 'primary',
      'fields' => 
      array (
        0 => 'id',
      ),
    ),
    1 => 
    array (
      'name' => 'idx_email_name',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'name',
      ),
    ),
    2 => 
    array (
      'name' => 'idx_message_id',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'message_id',
      ),
    ),
    3 => 
    array (
      'name' => 'idx_email_parent_id',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'parent_id',
      ),
    ),
    4 => 
    array (
      'name' => 'idx_email_assigned',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'assigned_user_id',
        1 => 'type',
        2 => 'status',
      ),
    ),
    'team_set_emails' => 
    array (
      'name' => 'idx_emails_tmst_id',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'team_set_id',
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
  'templates' => 
  array (
    'team_security' => 'team_security',
  ),
  'custom_fields' => false,
  'related_calc_fields' => 
  array (
  ),
);