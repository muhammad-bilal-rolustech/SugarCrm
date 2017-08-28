<?php

if(!defined('sugarEntry') || !sugarEntry) die('Not A Valid Entry Point');
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

$connector_strings = array (
    'LBL_LICENSING_INFO' => '<table border="0" cellspacing="1"><tr><td valign="top" width="35%" class="dataLabel">Zdobądź Poufny klucz klienta z IBM SmartCloud, rejestrując swoją instancję Sugar jako nową aplikację.<br>
&nbsp;<br>
Etapy rejestracji instancji:<br>
&nbsp;<br>
<ol>
<li>Zaloguj się na swoje konto IBM SmartCloud (musisz być administratorem)</li>
<li>Przejdż do opcji Administracja -> Zarządzanie organizacją</li>
<li>Przejdź do łącza Zintegrowane aplikacje zewnętrzne na pasku bocznym i włącz opcję SugarCRM dla wszystkich użytkowników.</li>
<li>Przejdż do opcji Aplikacje wewnętrzne na pasku bocznym i wybierz opcję Zarejestruj aplikację</li>
<li>Wprowadź dowolną nazwę aplikacji (np. SugarCRM Produkcja) i upewnij się, że okienko wyboru OAuth 2.x na dole wyskakującego okienka NIE zostało zaznaczone.</li>
<li>Po utworzeniu aplikacji kliknij mały trójkąt znajdujący się z prawej strony nazwy aplikacji i wybierz opcję Pokaż dane uwierzytelniające z listy rozwijalnej.</li>
<li>Skopiuj te dane uwierzytelniające poniżej.</li>
</ol>
</td></tr></table>',
    'oauth_consumer_key' => 'Unikalny klucz licencyjny OAuth',
    'oauth_consumer_secret' => 'Poufny klucz klienta OAuth',
);

