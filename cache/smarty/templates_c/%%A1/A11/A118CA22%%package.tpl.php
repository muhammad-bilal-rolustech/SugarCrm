<?php /* Smarty version 2.6.11, created on 2017-08-28 11:35:19
         compiled from modules/ModuleBuilder/tpls/MBPackage/package.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 'sugar_csrf_form_token', 'modules/ModuleBuilder/tpls/MBPackage/package.tpl', 14, false),array('function', 'sugar_getimage', 'modules/ModuleBuilder/tpls/MBPackage/package.tpl', 62, false),array('function', 'counter', 'modules/ModuleBuilder/tpls/MBPackage/package.tpl', 79, false),array('function', 'sugar_image', 'modules/ModuleBuilder/tpls/MBPackage/package.tpl', 83, false),array('function', 'sugar_getimagepath', 'modules/ModuleBuilder/tpls/MBPackage/package.tpl', 138, false),array('modifier', 'cat', 'modules/ModuleBuilder/tpls/MBPackage/package.tpl', 94, false),)), $this); ?>
<form name='CreatePackage' id='CreatePackage'>
<?php echo smarty_function_sugar_csrf_form_token(array(), $this);?>

<input type='hidden' name='module' value='ModuleBuilder'>
<input type='hidden' name='action' value='SavePackage'>
<input type='hidden' name='duplicate' value='0'>
<input type='hidden' name='to_pdf' value='1'>
<input type='hidden' name='original_name' value='<?php echo $this->_tpl_vars['package']->name; ?>
'>

<h2><?php echo $this->_tpl_vars['package']->title; ?>
</h2>
<table class='mbTable' >
	<tr><td></td><td><input style="padding-bottom:0px;" type='button' name='savebtn' value='<?php echo $this->_tpl_vars['mod_strings']['LBL_BTN_SAVE']; ?>
' class='button' onclick="document.CreatePackage.action.value='SavePackage';ModuleBuilder.handleSave('CreatePackage');">&nbsp;
		<?php if (! empty ( $this->_tpl_vars['package']->name )): ?>
			<input style="padding-bottom:0px;" type='button' name='duplicatebtn' value='<?php echo $this->_tpl_vars['mod_strings']['LBL_BTN_DUPLICATE']; ?>
' class='button' onclick="document.CreatePackage.action.value='SavePackage';document.CreatePackage.duplicate.value=1;ModuleBuilder.handleSave('CreatePackage');">
            &nbsp;<input style="padding-bottom:0px;" type='button' name='deploybtn' value='<?php echo $this->_tpl_vars['mod_strings']['LBL_BTN_DEPLOY']; ?>
' class='button' onclick="ModuleBuilder.packageDeploy('CreatePackage', <?php echo $this->_tpl_vars['package_already_deployed']; ?>
);">
			&nbsp;<input style="padding-bottom:0px;" type='button' name='publishbtn' value='<?php echo $this->_tpl_vars['mod_strings']['LBL_BTN_PUBLISH']; ?>
' class='button' onclick="ModuleBuilder.packagePublish('CreatePackage');">
			&nbsp;<input style="padding-bottom:0px;" type='button' name='exportbtn' value='<?php echo $this->_tpl_vars['mod_strings']['LBL_BTN_EXP']; ?>
' class='button' onclick="ModuleBuilder.packageExport('CreatePackage');">
			&nbsp;<input style="padding-bottom:0px;" type='button' name='deletebtn' value='<?php echo $this->_tpl_vars['mod_strings']['LBL_BTN_DELETE']; ?>
' class='button' onclick="ModuleBuilder.packageDelete('<?php echo $this->_tpl_vars['package']->name; ?>
');"><?php endif; ?></td></tr>
	<tr>
		<td height='100%'>&nbsp;</td><td>&nbsp;</td>
	</tr>
	<?php if (! empty ( $this->_tpl_vars['package']->name )): ?>
	<tr><td class='mbLBL'  ><b><?php echo $this->_tpl_vars['mod_strings']['LBL_LAST_MODIFIED']; ?>
</b></td><td><?php echo $this->_tpl_vars['package']->date_modified; ?>
</td></tr>
	<?php endif; ?>
	<tr>
		<td class='mbLBL' ><font color="#ff0000"> * </font><b><?php echo $this->_tpl_vars['mod_strings']['LBL_PACKAGE_NAME']; ?>
</b></td><td>
		<input type='text' name='name' size='36' maxlength='36' value='<?php echo $this->_tpl_vars['package']->name; ?>
'>
		</td>
	</tr>
	<tr>
		<td class='mbLBL' ><b><?php echo $this->_tpl_vars['mod_strings']['LBL_AUTHOR']; ?>
</b></td><td><input type='text' name='author' size='36' maxlength='36' value='<?php echo $this->_tpl_vars['package']->author; ?>
'></td>
	</tr>
	
	<tr>
	
		<td class='mbLBL' ><font color="#ff0000"> * </font><b><?php echo $this->_tpl_vars['mod_strings']['LBL_KEY']; ?>
</b></td>
		<td>
		<?php if (empty ( $this->_tpl_vars['package']->key )): ?>
		<input type='text' name='key' size='5' maxlength='5' value='<?php echo $this->_tpl_vars['package']->key; ?>
'>
		<?php else: ?>
			<?php echo $this->_tpl_vars['package']->key; ?>
<input type='hidden' name='key' size='5' maxlength='5' value='<?php echo $this->_tpl_vars['package']->key; ?>
'>
		<?php endif; ?>
		</td>
	</tr>

	<tr>
		<td class='mbLBL'  ><b><?php echo $this->_tpl_vars['mod_strings']['LBL_DESCRIPTION']; ?>
</b></td><td><textarea name='description' cols='60' rows='5'><?php echo $this->_tpl_vars['package']->description; ?>
</textarea></td>
	</tr>

	<tr>	
		<td></td><td id='readme'><?php echo smarty_function_sugar_getimage(array('name' => 'advanced_search','ext' => ".gif",'alt' => $this->_tpl_vars['mod_strings']['LBL_HIDEOPTIONS'],'other_attributes' => 'border="0" id="options" '), $this);?>
<a style="text-decoration:none" href="javascript: void(0)" onclick ="toggleEl('readmefield');"><b><?php echo $this->_tpl_vars['mod_strings']['LBL_ADD_README']; ?>
</b></a></td>
	</tr>
	<tr>
		<td height='100%'>&nbsp;</td><td>&nbsp;</td>
	</tr>
	<tr id='readmefield' style="display:none;">
		<td></td>
		<td ><textarea name='readme' cols='60' rows='10'><?php echo $this->_tpl_vars['package']->readme; ?>
</textarea></td>
	</tr>
	
	<?php if (! empty ( $this->_tpl_vars['package']->name )): ?>
	
	<tr>
		<td class='mbLBL'><b><?php echo $this->_tpl_vars['mod_strings']['LBL_MODULES']; ?>
</b></td>
		<td >
			<table>
				<tr id="package_modules">
					<?php echo smarty_function_counter(array('name' => 'items','assign' => 'items','start' => 1), $this);?>

					<td align='center'>
						<table id="new_module" onclick="ModuleBuilder.addModule('<?php echo $this->_tpl_vars['package']->name; ?>
')" class='wizardButton' onmousedown="ModuleBuilder.buttonDown(this);return false;" onmouseout="ModuleBuilder.buttonOut(this);">
						<tr>
						<td  align='center'><?php echo smarty_function_sugar_image(array('name' => 'NewModule','width' => 32,'height' => 32), $this);?>
</td>
						</tr>
						<tr><td>
						  <a  class='studiolink' href="javascript:void(0)" onclick="ModuleBuilder.addModule('<?php echo $this->_tpl_vars['package']->name; ?>
')">
						      <?php echo $this->_tpl_vars['mod_strings']['LBL_NEW_MODULE']; ?>
</a>
						</td></tr>
						</table>
						
						
					</td>
					<?php $_from = $this->_tpl_vars['package']->moduleTypes; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['name'] => $this->_tpl_vars['type']):
?>
					<?php $this->assign('imgurl', ((is_array($_tmp=$this->_tpl_vars['type'])) ? $this->_run_mod_handler('cat', true, $_tmp, '_32') : smarty_modifier_cat($_tmp, '_32'))); ?>
						<?php if ($this->_tpl_vars['items'] % 4 == 0 && $this->_tpl_vars['items'] != 0): ?>
							</tr><tr>
						<?php endif; ?>
						<td align='center'>
						<table id= "existing_module" onclick="ModuleBuilder.viewModule('<?php echo $this->_tpl_vars['package']->name; ?>
', '<?php echo $this->_tpl_vars['name']; ?>
')" class='wizardButton' onmousedown="ModuleBuilder.buttonDown(this);return false;" onmouseout="ModuleBuilder.buttonOut(this);">
						  <tr>
						      <td  align='center'><?php echo smarty_function_sugar_image(array('name' => $this->_tpl_vars['imgurl'],'width' => 32,'height' => 32), $this);?>
</td>
						  </tr><tr><td align='center'>
						      <a  class='studiolink' href="javascript:void(0)" onclick="ModuleBuilder.viewModule('<?php echo $this->_tpl_vars['package']->name; ?>
', '<?php echo $this->_tpl_vars['name']; ?>
')">
				              <?php echo $this->_tpl_vars['name']; ?>
</a>
				          </td></tr>
				        </table></td>
					<?php echo smarty_function_counter(array('name' => 'items'), $this);?>
	
					<?php endforeach; endif; unset($_from); ?>
					   
					</tr>
	</table>
		</td>
	</tr>
	
	<?php endif; ?>
	
	<tr>
		<td height='100%'>&nbsp;</td><td>&nbsp;</td>
	</tr>
</table>
</form>
<?php echo '
<script>
addForm(\'CreatePackage\');
addToValidate(\'CreatePackage\', \'name\', \'DBName\', true, \'';  echo $this->_tpl_vars['mod_strings']['LBL_JS_VALIDATE_NAME'];  echo '\');
addToValidateIsInArray(\'CreatePackage\', \'name\', \'in_array\', false, \'';  echo $this->_tpl_vars['mod_strings']['LBL_JS_VALIDATE_PACKAGE_NAME']; ?>
','<?php echo $this->_tpl_vars['package_labels']; ?>
'<?php echo ', \'u==\');
addToValidate(\'CreatePackage\', \'key\', \'DBNameRaw\', true, \'';  echo $this->_tpl_vars['mod_strings']['LBL_JS_VALIDATE_KEY'];  echo '\');
addToValidateIsInArray(\'CreatePackage\', \'key\', \'in_array\', false, \'';  echo $this->_tpl_vars['mod_strings']['LBL_JS_VALIDATE_PACKAGE_KEY']; ?>
','<?php echo $this->_tpl_vars['key_labels'];  echo '\', \'u==\');

ModuleBuilder.helpRegister(\'CreatePackage\');
ModuleBuilder.helpRegisterByID(\'CreatePackage\',\'td\');
if(document.getElementById(\'package_modules\'))
	ModuleBuilder.helpRegisterByID(\'package_modules\', \'table\');
ModuleBuilder.helpSetup('; ?>
'<?php echo $this->_tpl_vars['package']->help['group']; ?>
','<?php echo $this->_tpl_vars['package']->help['default']; ?>
'<?php echo ');
function toggleEl(){
		var display = document.getElementById(\'readmefield\').style.display;
		if(display==\'table-row\' || display==\'inline-block\'){
			document.getElementById(\'options\').src = "';  echo smarty_function_sugar_getimagepath(array('file' => 'advanced_search.gif'), $this); echo '";
			document.getElementById(\'readmefield\').style.display =\'none\';
		}else if (display==\'none\'){
			document.getElementById(\'options\').src = "';  echo smarty_function_sugar_getimagepath(array('file' => 'basic_search.gif'), $this); echo '";
			document.getElementById(\'readmefield\').style.display = (navigator.appName=="Microsoft Internet Explorer")? \'inline-block\' : \'table-row\';
		}
	}
</script>
'; ?>

<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => 'modules/ModuleBuilder/tpls/assistantJavascript.tpl', 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>