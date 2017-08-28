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
  'key' => 'bus',
  'author' => 'Admin',
  'description' => '',
  'icon' => '',
  'is_uninstallable' => true,
  'name' => 'BusSystemPackage',
  'published_date' => '2017-08-28 09:15:19',
  'type' => 'module',
  'version' => 1503911719,
  'remove_tables' => 'prompt',
);


$installdefs = array (
  'id' => 'BusSystemPackage',
  'beans' => 
  array (
    0 => 
    array (
      'module' => 'bus_BusManagment',
      'class' => 'bus_BusManagment',
      'path' => 'modules/bus_BusManagment/bus_BusManagment.php',
      'tab' => true,
    ),
    1 => 
    array (
      'module' => 'bus_Passenger',
      'class' => 'bus_Passenger',
      'path' => 'modules/bus_Passenger/bus_Passenger.php',
      'tab' => true,
    ),
  ),
  'layoutdefs' => 
  array (
    0 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/layoutdefs/bus_busmanagment_bus_passenger_bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
    ),
  ),
  'relationships' => 
  array (
    0 => 
    array (
      'meta_data' => '<basepath>/SugarModules/relationships/relationships/bus_busmanagment_bus_passengerMetaData.php',
    ),
  ),
  'image_dir' => '<basepath>/icons',
  'copy' => 
  array (
    0 => 
    array (
      'from' => '<basepath>/SugarModules/modules/bus_BusManagment',
      'to' => 'modules/bus_BusManagment',
    ),
    1 => 
    array (
      'from' => '<basepath>/SugarModules/modules/bus_Passenger',
      'to' => 'modules/bus_Passenger',
    ),
  ),
  'language' => 
  array (
    0 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'en_us',
    ),
    1 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'bg_BG',
    ),
    2 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'cs_CZ',
    ),
    3 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'da_DK',
    ),
    4 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'de_DE',
    ),
    5 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'el_EL',
    ),
    6 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'es_ES',
    ),
    7 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'fr_FR',
    ),
    8 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'he_IL',
    ),
    9 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'hu_HU',
    ),
    10 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'it_it',
    ),
    11 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'lt_LT',
    ),
    12 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'ja_JP',
    ),
    13 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'ko_KR',
    ),
    14 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'lv_LV',
    ),
    15 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'nb_NO',
    ),
    16 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'nl_NL',
    ),
    17 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'pl_PL',
    ),
    18 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'pt_PT',
    ),
    19 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'ro_RO',
    ),
    20 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'ru_RU',
    ),
    21 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'sv_SE',
    ),
    22 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'tr_TR',
    ),
    23 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'zh_TW',
    ),
    24 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'zh_CN',
    ),
    25 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'pt_BR',
    ),
    26 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'ca_ES',
    ),
    27 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'en_UK',
    ),
    28 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'sr_RS',
    ),
    29 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'sk_SK',
    ),
    30 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'sq_AL',
    ),
    31 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'et_EE',
    ),
    32 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'es_LA',
    ),
    33 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'fi_FI',
    ),
    34 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'ar_SA',
    ),
    35 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_Passenger.php',
      'to_module' => 'bus_Passenger',
      'language' => 'uk_UA',
    ),
    36 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'en_us',
    ),
    37 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'bg_BG',
    ),
    38 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'cs_CZ',
    ),
    39 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'da_DK',
    ),
    40 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'de_DE',
    ),
    41 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'el_EL',
    ),
    42 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'es_ES',
    ),
    43 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'fr_FR',
    ),
    44 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'he_IL',
    ),
    45 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'hu_HU',
    ),
    46 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'it_it',
    ),
    47 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'lt_LT',
    ),
    48 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'ja_JP',
    ),
    49 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'ko_KR',
    ),
    50 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'lv_LV',
    ),
    51 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'nb_NO',
    ),
    52 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'nl_NL',
    ),
    53 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'pl_PL',
    ),
    54 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'pt_PT',
    ),
    55 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'ro_RO',
    ),
    56 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'ru_RU',
    ),
    57 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'sv_SE',
    ),
    58 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'tr_TR',
    ),
    59 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'zh_TW',
    ),
    60 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'zh_CN',
    ),
    61 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'pt_BR',
    ),
    62 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'ca_ES',
    ),
    63 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'en_UK',
    ),
    64 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'sr_RS',
    ),
    65 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'sk_SK',
    ),
    66 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'sq_AL',
    ),
    67 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'et_EE',
    ),
    68 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'es_LA',
    ),
    69 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'fi_FI',
    ),
    70 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
      'language' => 'ar_SA',
    ),
    71 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/language/bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
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
      'from' => '<basepath>/SugarModules/clients/base/layouts/subpanels/bus_busmanagment_bus_passenger_bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
    ),
    1 => 
    array (
      'from' => '<basepath>/SugarModules/clients/mobile/layouts/subpanels/bus_busmanagment_bus_passenger_bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
    ),
  ),
  'vardefs' => 
  array (
    0 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/vardefs/bus_busmanagment_bus_passenger_bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
    ),
    1 => 
    array (
      'from' => '<basepath>/SugarModules/relationships/vardefs/bus_busmanagment_bus_passenger_bus_Passenger.php',
      'to_module' => 'bus_Passenger',
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
      'from' => '<basepath>/SugarModules/relationships/wirelesslayoutdefs/bus_busmanagment_bus_passenger_bus_BusManagment.php',
      'to_module' => 'bus_BusManagment',
    ),
  ),
);