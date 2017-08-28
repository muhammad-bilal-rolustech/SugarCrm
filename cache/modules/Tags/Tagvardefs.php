<?php 
 $GLOBALS["dictionary"]["Tag"]=array (
  'comment' => 'Tagging module',
  'table' => 'tags',
  'audited' => true,
  'activity_enabled' => false,
  'favorites' => true,
  'optimistic_locking' => false,
  'unified_search' => true,
  'full_text_search' => true,
  'unified_search_default_enabled' => true,
  'required_import_indexes' => 
  array (
    0 => 'idx_tag_name::name',
  ),
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
      'type' => 'name',
      'dbType' => 'varchar',
      'len' => 255,
      'unified_search' => true,
      'full_text_search' => 
      array (
        'enabled' => true,
        'searchable' => true,
        'boost' => 1.55,
      ),
      'required' => true,
      'importable' => 'required',
      'duplicate_merge' => 'enabled',
      'merge_filter' => 'selected',
      'duplicate_on_record_copy' => 'always',
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
      'relationship' => 'tags_created_by',
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
      'relationship' => 'tags_modified_user',
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
      'relationship' => 'tag_activities',
      'vname' => 'LBL_ACTIVITY_STREAM',
      'link_type' => 'many',
      'module' => 'Activities',
      'bean_name' => 'Activity',
      'source' => 'non-db',
    ),
    'name_lower' => 
    array (
      'name' => 'name_lower',
      'vname' => 'LBL_NAME_LOWER',
      'type' => 'varchar',
      'len' => 255,
      'unified_search' => true,
      'required' => true,
      'reportable' => false,
      'studio' => false,
      'exportable' => false,
    ),
    'aclrolesets_link' => 
    array (
      'name' => 'aclrolesets_link',
      'vname' => 'ACLRoleSets',
      'type' => 'link',
      'relationship' => 'aclrolesets_tags',
      'source' => 'non-db',
    ),
    'leads_link' => 
    array (
      'name' => 'leads_link',
      'vname' => 'Leads',
      'type' => 'link',
      'relationship' => 'leads_tags',
      'source' => 'non-db',
    ),
    'cases_link' => 
    array (
      'name' => 'cases_link',
      'vname' => 'Cases',
      'type' => 'link',
      'relationship' => 'cases_tags',
      'source' => 'non-db',
    ),
    'bugs_link' => 
    array (
      'name' => 'bugs_link',
      'vname' => 'Bugs',
      'type' => 'link',
      'relationship' => 'bugs_tags',
      'source' => 'non-db',
    ),
    'prospectlists_link' => 
    array (
      'name' => 'prospectlists_link',
      'vname' => 'ProspectLists',
      'type' => 'link',
      'relationship' => 'prospectlists_tags',
      'source' => 'non-db',
    ),
    'prospects_link' => 
    array (
      'name' => 'prospects_link',
      'vname' => 'Prospects',
      'type' => 'link',
      'relationship' => 'prospects_tags',
      'source' => 'non-db',
    ),
    'contacts_link' => 
    array (
      'name' => 'contacts_link',
      'vname' => 'Contacts',
      'type' => 'link',
      'relationship' => 'contacts_tags',
      'source' => 'non-db',
    ),
    'accounts_link' => 
    array (
      'name' => 'accounts_link',
      'vname' => 'Accounts',
      'type' => 'link',
      'relationship' => 'accounts_tags',
      'source' => 'non-db',
    ),
    'opportunities_link' => 
    array (
      'name' => 'opportunities_link',
      'vname' => 'Opportunities',
      'type' => 'link',
      'relationship' => 'opportunities_tags',
      'source' => 'non-db',
    ),
    'notes_link' => 
    array (
      'name' => 'notes_link',
      'vname' => 'Notes',
      'type' => 'link',
      'relationship' => 'notes_tags',
      'source' => 'non-db',
    ),
    'calls_link' => 
    array (
      'name' => 'calls_link',
      'vname' => 'Calls',
      'type' => 'link',
      'relationship' => 'calls_tags',
      'source' => 'non-db',
    ),
    'meetings_link' => 
    array (
      'name' => 'meetings_link',
      'vname' => 'Meetings',
      'type' => 'link',
      'relationship' => 'meetings_tags',
      'source' => 'non-db',
    ),
    'tasks_link' => 
    array (
      'name' => 'tasks_link',
      'vname' => 'Tasks',
      'type' => 'link',
      'relationship' => 'tasks_tags',
      'source' => 'non-db',
    ),
    'revenuelineitems_link' => 
    array (
      'name' => 'revenuelineitems_link',
      'vname' => 'RevenueLineItems',
      'type' => 'link',
      'relationship' => 'revenuelineitems_tags',
      'source' => 'non-db',
    ),
    'products_link' => 
    array (
      'name' => 'products_link',
      'vname' => 'Products',
      'type' => 'link',
      'relationship' => 'products_tags',
      'source' => 'non-db',
    ),
    'producttemplates_link' => 
    array (
      'name' => 'producttemplates_link',
      'vname' => 'ProductTemplates',
      'type' => 'link',
      'relationship' => 'producttemplates_tags',
      'source' => 'non-db',
    ),
    'dashboards_link' => 
    array (
      'name' => 'dashboards_link',
      'vname' => 'Dashboards',
      'type' => 'link',
      'relationship' => 'dashboards_tags',
      'source' => 'non-db',
    ),
    'kbcontents_link' => 
    array (
      'name' => 'kbcontents_link',
      'vname' => 'KBContents',
      'type' => 'link',
      'relationship' => 'kbcontents_tags',
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
      'relationship' => 'tags_following',
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
      'relationship' => 'tags_favorite',
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
    'source_id' => 
    array (
      'name' => 'source_id',
      'vname' => 'LBL_SOURCE_ID',
      'type' => 'varchar',
      'comment' => '',
    ),
    'source_type' => 
    array (
      'name' => 'source_type',
      'vname' => 'LBL_SOURCE_TYPE',
      'type' => 'varchar',
      'comment' => '',
    ),
    'source_meta' => 
    array (
      'name' => 'source_meta',
      'vname' => 'LBL_SOURCE_META',
      'type' => 'text',
      'comment' => '',
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
      'relationship' => 'tags_assigned_user',
      'vname' => 'LBL_ASSIGNED_TO_USER',
      'link_type' => 'one',
      'module' => 'Users',
      'bean_name' => 'User',
      'source' => 'non-db',
      'duplicate_merge' => 'enabled',
      'id_name' => 'assigned_user_id',
      'table' => 'users',
    ),
  ),
  'relationships' => 
  array (
    'tags_modified_user' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'Tags',
      'rhs_table' => 'tags',
      'rhs_key' => 'modified_user_id',
      'relationship_type' => 'one-to-many',
    ),
    'tags_created_by' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'Tags',
      'rhs_table' => 'tags',
      'rhs_key' => 'created_by',
      'relationship_type' => 'one-to-many',
    ),
    'tag_activities' => 
    array (
      'lhs_module' => 'Tags',
      'lhs_table' => 'tags',
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
      'relationship_role_column_value' => 'Tags',
    ),
    'tags_following' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'Tags',
      'rhs_table' => 'tags',
      'rhs_key' => 'id',
      'relationship_type' => 'user-based',
      'join_table' => 'subscriptions',
      'join_key_lhs' => 'created_by',
      'join_key_rhs' => 'parent_id',
      'relationship_role_column' => 'parent_type',
      'relationship_role_column_value' => 'Tags',
      'user_field' => 'created_by',
    ),
    'tags_favorite' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'Tags',
      'rhs_table' => 'tags',
      'rhs_key' => 'id',
      'relationship_type' => 'user-based',
      'join_table' => 'sugarfavorites',
      'join_key_lhs' => 'modified_user_id',
      'join_key_rhs' => 'record_id',
      'relationship_role_column' => 'module',
      'relationship_role_column_value' => 'Tags',
      'user_field' => 'created_by',
    ),
    'tags_assigned_user' => 
    array (
      'lhs_module' => 'Users',
      'lhs_table' => 'users',
      'lhs_key' => 'id',
      'rhs_module' => 'Tags',
      'rhs_table' => 'tags',
      'rhs_key' => 'assigned_user_id',
      'relationship_type' => 'one-to-many',
    ),
  ),
  'indices' => 
  array (
    'id' => 
    array (
      'name' => 'idx_tags_pk',
      'type' => 'primary',
      'fields' => 
      array (
        0 => 'id',
      ),
    ),
    'date_modified' => 
    array (
      'name' => 'idx_tags_date_modfied',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'date_modified',
      ),
    ),
    'deleted' => 
    array (
      'name' => 'idx_tags_id_del',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'id',
        1 => 'deleted',
      ),
    ),
    'date_entered' => 
    array (
      'name' => 'idx_tags_date_entered',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'date_entered',
      ),
    ),
    'name_del' => 
    array (
      'name' => 'idx_tags_name_del',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'name',
        1 => 'deleted',
      ),
    ),
    'name' => 
    array (
      'name' => 'idx_tag_name',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'name',
      ),
    ),
    'name_lower' => 
    array (
      'name' => 'idx_tag_name_lower',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'name_lower',
      ),
    ),
    'assigned_user_id' => 
    array (
      'name' => 'idx_tags_assigned_del',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'deleted',
        1 => 'assigned_user_id',
      ),
    ),
  ),
  'load_fields' => 
  array (
    'class' => 'TagsRelatedModulesUtilities',
    'method' => 'getRelatedFields',
  ),
  'ignore_templates' => 
  array (
    0 => 'taggable',
  ),
  'acls' => 
  array (
    'SugarACLDeveloperOrAdmin' => 
    array (
      'aclModule' => 'Tags',
      'allowUserRead' => true,
    ),
    'SugarACLStatic' => true,
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
            '$equals' => '$name',
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
  ),
  'templates' => 
  array (
    'basic' => 'basic',
    'following' => 'following',
    'favorite' => 'favorite',
    'external_source' => 'external_source',
    'assignable' => 'assignable',
  ),
  'custom_fields' => false,
  'related_calc_fields' => 
  array (
  ),
);