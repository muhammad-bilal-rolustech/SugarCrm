<?php

    class LeadsMonitoring
    {
        function before_save_method($bean, $event, $arguments)
        {
            //$displayFieldValue = $GLOBALS['app_list_strings'][$bean->field_defs[$lead_source]['options'][$bean->$lead_source]];
            //$key = array_search($bean->lead_source,$app_list_strings['lead_source_dom'])
            $bean->description = $bean->lead_source ."=>" ;
 ;
            //  $bean->processed = true;
            $bean->save();
        }
    }
?>
