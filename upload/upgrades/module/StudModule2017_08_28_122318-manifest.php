<?php
/*
 * Your installation or use of this SugarCRM file is subject to the applicable
 * terms available at
 * http://support.sugarcrm.com/06_Customer_Center/10_Master_Subscription_Agreements/.
 * If you do not agree to all of the applicable terms or do not have the
 * authority to bind the entity as an authorized representative, then do not
 * install or use this SugarCRM file.
 *
 * Copyright (C) SugarCRM Inc. All rights reserved.
 */

// THIS CONTENT IS GENERATED BY MBPackage.php
$manifest = array (
  'built_in_version' => '7.7.1.2',
  'acceptable_sugar_versions' => 
  array (
    0 => '',
  ),
  'acceptable_sugar_flavors' => 
  array (
    0 => 'PRO',
    1 => 'CORP',
    2 => 'ENT',
    3 => 'ULT',
  ),
  'readme' => '',
  'key' => 'stud',
  'author' => 'Admin',
  'description' => '',
  'icon' => '',
  'is_uninstallable' => true,
  'name' => 'StudModule',
  'published_date' => '2017-08-28 07:23:18',
  'type' => 'module',
  'version' => 1503904998,
  'remove_tables' => 'prompt',
);


$installdefs = array (
  'id' => 'StudModule',
  'beans' => 
  array (
    0 => 
    array (
      'module' => 'stud_StudentNew',
      'class' => 'stud_StudentNew',
      'path' => 'modules/stud_StudentNew/stud_StudentNew.php',
      'tab' => true,
    ),
  ),
  'layoutdefs' => 
  array (
    0 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/layoutdefs/stud_studentnew_tech_teachernew_tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
    ),
  ),
  'relationships' => 
  array (
    0 => 
    array (
      'meta_data' => '<basepath>/SugarModules/relationships/relationships/stud_studentnew_tech_teachernewMetaData.php',
    ),
  ),
  'image_dir' => '<basepath>/icons',
  'copy' => 
  array (
    0 => 
    array (
      'from' => '<basepath>/SugarModules/modules/stud_StudentNew',
      'to' => 'modules/stud_StudentNew',
    ),
  ),
  'language' => 
  array (
    0 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'en_us',
    ),
    1 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'bg_BG',
    ),
    2 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'cs_CZ',
    ),
    3 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'da_DK',
    ),
    4 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'de_DE',
    ),
    5 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'el_EL',
    ),
    6 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'es_ES',
    ),
    7 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'fr_FR',
    ),
    8 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'he_IL',
    ),
    9 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'hu_HU',
    ),
    10 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'it_it',
    ),
    11 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'lt_LT',
    ),
    12 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'ja_JP',
    ),
    13 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'ko_KR',
    ),
    14 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'lv_LV',
    ),
    15 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'nb_NO',
    ),
    16 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'nl_NL',
    ),
    17 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'pl_PL',
    ),
    18 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'pt_PT',
    ),
    19 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'ro_RO',
    ),
    20 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'ru_RU',
    ),
    21 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'sv_SE',
    ),
    22 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'tr_TR',
    ),
    23 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'zh_TW',
    ),
    24 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'zh_CN',
    ),
    25 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'pt_BR',
    ),
    26 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'ca_ES',
    ),
    27 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'en_UK',
    ),
    28 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'sr_RS',
    ),
    29 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'sk_SK',
    ),
    30 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'sq_AL',
    ),
    31 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'et_EE',
    ),
    32 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'es_LA',
    ),
    33 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'fi_FI',
    ),
    34 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'ar_SA',
    ),
    35 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
      'language' => 'uk_UA',
    ),
    36 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'en_us',
    ),
    37 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'bg_BG',
    ),
    38 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'cs_CZ',
    ),
    39 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'da_DK',
    ),
    40 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'de_DE',
    ),
    41 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'el_EL',
    ),
    42 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'es_ES',
    ),
    43 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'fr_FR',
    ),
    44 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'he_IL',
    ),
    45 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'hu_HU',
    ),
    46 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'it_it',
    ),
    47 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'lt_LT',
    ),
    48 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'ja_JP',
    ),
    49 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'ko_KR',
    ),
    50 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'lv_LV',
    ),
    51 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'nb_NO',
    ),
    52 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'nl_NL',
    ),
    53 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'pl_PL',
    ),
    54 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'pt_PT',
    ),
    55 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'ro_RO',
    ),
    56 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'ru_RU',
    ),
    57 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'sv_SE',
    ),
    58 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'tr_TR',
    ),
    59 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'zh_TW',
    ),
    60 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'zh_CN',
    ),
    61 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'pt_BR',
    ),
    62 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'ca_ES',
    ),
    63 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'en_UK',
    ),
    64 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'sr_RS',
    ),
    65 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'sk_SK',
    ),
    66 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'sq_AL',
    ),
    67 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'et_EE',
    ),
    68 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'es_LA',
    ),
    69 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'fi_FI',
    ),
    70 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'ar_SA',
    ),
    71 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
      'language' => 'uk_UA',
    ),
    72 => 
    array (
      'from' => '<basepath>/SugarModules/language/application/en_us.lang.php',
      'to_module' => 'application',
      'language' => 'en_us',
    ),
  ),
  'sidecar' => 
  array (
    0 => 
    array (
      'from' => '<basepath>/SugarModules/clients/base/layouts/subpanels/stud_studentnew_tech_teachernew_tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
    ),
    1 => 
    array (
      'from' => '<basepath>/SugarModules/clients/mobile/layouts/subpanels/stud_studentnew_tech_teachernew_tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
    ),
  ),
  'vardefs' => 
  array (
    0 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/vardefs/stud_studentnew_tech_teachernew_tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
    ),
    1 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/vardefs/stud_studentnew_tech_teachernew_stud_StudentNew.php',
      'to_module' => 'stud_StudentNew',
    ),
  ),
  'layoutfields' => 
  array (
    0 => 
    array (
      'additional_fields' => 
      array (
      ),
    ),
  ),
  'wireless_subpanels' => 
  array (
    0 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/wirelesslayoutdefs/stud_studentnew_tech_teachernew_tech_TeacherNew.php',
      'to_module' => 'tech_TeacherNew',
    ),
  ),
);