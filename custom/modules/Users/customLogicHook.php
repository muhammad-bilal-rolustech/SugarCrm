<?php

    class UsersMonitoring
    {

        function after_relationship_add_method($bean, $event, $arguments)
        {


                 $role = new ACLRole();
                 $users = new User();
                 //$contacts = new Contact();
                // $GLOBALS['log']->fatal("asdjwehfuwehfuhfwrrrrrrrrrrrhhhhhhh".$arguments['id']);

                 $users->retrieve($arguments['id']);
                 $bean->description =$arguments['related_id']."  wow" ;

              //   $tasks = $contacts->get_linked_beans('tasks',$arguments['related_module']);

                $roles = array();
                $roles = ACLRole::getUserRoles($arguments['id'] );

                // $roles = $users->get_linked_beans('roles_users','Role');

                if (!empty ($roles)) {
                        foreach($roles as $r) {
                        //   if ($t->id != $arguments['related_id']) {
                        //       $role->mark_relationships_deleted($r->id);
                      //     $GLOBALS['log']->fatal("asdjwehfuwehfuhfwrrrrrrrrrrrhhhhhhh".$t->id);
                    //  $bean->description =$bean->description ."  dr  ".$t->id ;
                        // $role->clear_user_relationship($t->id ,$arguments['id'] );
                              // $bean->description =$bean->description ." and ". $t->id ."    does match" ;
                      //  }

                        //   $bean->description =$bean->description ." and " .$roles->id ."" ;
                 }
               }
               else {
                     $bean->description = "Not Done";
                }




        }
    }
?>
