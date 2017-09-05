<?php

    class ContactsMonitoring
    {
        function after_relationship_delete_method($bean, $event, $arguments)
        {


          //  if ($arguments.related_module =='Accounts'){

                  $beantemp = BeanFactory::getBean('Accounts',$bean->account_id);
                  $beantemp->description = $beantemp->description."   ".$bean->name ." Deleted";//$arguments[‘module’];
                  if (!empty ($beantemp->id)) {
                  $beantemp->save();
                  }


            //}
        }
        /*
        function after_relationship_add_method($bean, $event, $arguments)
        {



                 $contacts = new $arguments['module']();
                 //$contacts = new Contact();
                 $contacts->retrieve($arguments['id']);
                // $tasks = $contacts->get_linked_beans('tasks',$arguments['related_module']);
                 $tasks = $contacts->get_linked_beans('tasks','Task');
                 foreach($tasks as $t) {
                      if ($t->id != $arguments['related_id']) {
                          // $bean->mark_relationships_deleted($t_id);
                          $bean->description = "Allah ka shukar ha";
                      }
                 }

        }
        */
    }
?>
