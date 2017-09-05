<?php

    $hook_array['after_delete'][] = array(
        1,
        'Deleted  Contact  will b e written into  description of Accounts',
        'custom/modules/Contacts/customLogicHook.php',
        'ContactsMonitoring',
        'after_relationship_delete_method'
    );
/*
    $hook_array['after_relationship_add'][] = array(
        1,
        'Deleted  Contact  will b e written into  description of Accounts',
        'custom/modules/Contacts/customLogicHook.php',
        'ContactsMonitoring',
        'after_relationship_add_method'
    );
    */
?>
