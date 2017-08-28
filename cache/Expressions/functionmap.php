<?php
$FUNCTION_MAP = array(
			'time' => array(
						'class'	=>	'DefineTimeExpression',
						'src'	=>	'include/Expressions/Expression/Time/DefineTimeExpression.php',
			),
			'hourOfDay' => array(
						'class'	=>	'HourOfDayExpression',
						'src'	=>	'include/Expressions/Expression/Time/HourOfDayExpression.php',
			),
			'forecastCommitStage' => array(
						'class'	=>	'ForecastCommitStageExpression',
						'src'	=>	'include/Expressions/Expression/String/ForecastCommitStageExpression.php',
			),
			'contains' => array(
						'class'	=>	'ContainsExpression',
						'src'	=>	'include/Expressions/Expression/String/ContainsExpression.php',
			),
			'strToLower' => array(
						'class'	=>	'StrToLowerExpression',
						'src'	=>	'include/Expressions/Expression/String/StrToLowerExpression.php',
			),
			'concat' => array(
						'class'	=>	'ConcatenateExpression',
						'src'	=>	'include/Expressions/Expression/String/ConcatenateExpression.php',
			),
			'subStr' => array(
						'class'	=>	'SubStrExpression',
						'src'	=>	'include/Expressions/Expression/String/SubStrExpression.php',
			),
			'formatName' => array(
						'class'	=>	'FormatedNameExpression',
						'src'	=>	'include/Expressions/Expression/String/FormatedNameExpression.php',
			),
			'toString' => array(
						'class'	=>	'DefineStringExpression',
						'src'	=>	'include/Expressions/Expression/String/DefineStringExpression.php',
			),
			'string' => array(
						'class'	=>	'DefineStringExpression',
						'src'	=>	'include/Expressions/Expression/String/DefineStringExpression.php',
			),
			'charAt' => array(
						'class'	=>	'CharacterAtExpression',
						'src'	=>	'include/Expressions/Expression/String/CharacterAtExpression.php',
			),
			'translateLabel' => array(
						'class'	=>	'SugarTranslateExpression',
						'src'	=>	'include/Expressions/Expression/String/SugarTranslateExpression.php',
			),
			'translate' => array(
						'class'	=>	'SugarTranslateExpression',
						'src'	=>	'include/Expressions/Expression/String/SugarTranslateExpression.php',
			),
			'strToUpper' => array(
						'class'	=>	'StrToUpperExpression',
						'src'	=>	'include/Expressions/Expression/String/StrToUpperExpression.php',
			),
			'getDropdownValue' => array(
						'class'	=>	'SugarDropDownValueExpression',
						'src'	=>	'include/Expressions/Expression/String/SugarDropDownValueExpression.php',
			),
			'getDDValue' => array(
						'class'	=>	'SugarDropDownValueExpression',
						'src'	=>	'include/Expressions/Expression/String/SugarDropDownValueExpression.php',
			),
			'getListWhere' => array(
						'class'	=>	'SugarListWhereExpression',
						'src'	=>	'include/Expressions/Expression/Enum/SugarListWhereExpression.php',
			),
			'createList' => array(
						'class'	=>	'DefineEnumExpression',
						'src'	=>	'include/Expressions/Expression/Enum/DefineEnumExpression.php',
			),
			'enum' => array(
						'class'	=>	'DefineEnumExpression',
						'src'	=>	'include/Expressions/Expression/Enum/DefineEnumExpression.php',
			),
			'getDropdownKeySet' => array(
						'class'	=>	'SugarDropDownExpression',
						'src'	=>	'include/Expressions/Expression/Enum/SugarDropDownExpression.php',
			),
			'getDD' => array(
						'class'	=>	'SugarDropDownExpression',
						'src'	=>	'include/Expressions/Expression/Enum/SugarDropDownExpression.php',
			),
			'forecastSalesStages' => array(
						'class'	=>	'ForecastSalesStageExpression',
						'src'	=>	'include/Expressions/Expression/Enum/ForecastSalesStageExpression.php',
			),
			'getDropdownValueSet' => array(
						'class'	=>	'SugarTranslatedDropDownExpression',
						'src'	=>	'include/Expressions/Expression/Enum/SugarTranslatedDropDownExpression.php',
			),
			'getTransDD' => array(
						'class'	=>	'SugarTranslatedDropDownExpression',
						'src'	=>	'include/Expressions/Expression/Enum/SugarTranslatedDropDownExpression.php',
			),
			'forecastIncludedCommitStages' => array(
						'class'	=>	'ForecastIncludedCommitStagesExpression',
						'src'	=>	'include/Expressions/Expression/Enum/ForecastIncludedCommitStagesExpression.php',
			),
			'isInList' => array(
						'class'	=>	'IsInEnumExpression',
						'src'	=>	'include/Expressions/Expression/Boolean/IsInEnumExpression.php',
			),
			'isInEnum' => array(
						'class'	=>	'IsInEnumExpression',
						'src'	=>	'include/Expressions/Expression/Boolean/IsInEnumExpression.php',
			),
			'isValidDBName' => array(
						'class'	=>	'IsValidDBNameExpression',
						'src'	=>	'include/Expressions/Expression/Boolean/IsValidDBNameExpression.php',
			),
			'isNumeric' => array(
						'class'	=>	'IsNumericExpression',
						'src'	=>	'include/Expressions/Expression/Boolean/IsNumericExpression.php',
			),
			'isForecastClosedLost' => array(
						'class'	=>	'IsForecastClosedLostExpression',
						'src'	=>	'include/Expressions/Expression/Boolean/IsForecastClosedLostExpression.php',
			),
			'not' => array(
						'class'	=>	'NotExpression',
						'src'	=>	'include/Expressions/Expression/Boolean/NotExpression.php',
			),
			'isAlphaNumeric' => array(
						'class'	=>	'IsAlphaNumericExpression',
						'src'	=>	'include/Expressions/Expression/Boolean/IsAlphaNumericExpression.php',
			),
			'isForecastClosed' => array(
						'class'	=>	'IsForecastClosedExpression',
						'src'	=>	'include/Expressions/Expression/Boolean/IsForecastClosedExpression.php',
			),
			'isBefore' => array(
						'class'	=>	'isBeforeExpression',
						'src'	=>	'include/Expressions/Expression/Boolean/isBeforeExpression.php',
			),
			'and' => array(
						'class'	=>	'AndExpression',
						'src'	=>	'include/Expressions/Expression/Boolean/AndExpression.php',
			),
			'isRequiredCollection' => array(
						'class'	=>	'IsRequiredCollectionExpression',
						'src'	=>	'include/Expressions/Expression/Boolean/IsRequiredCollectionExpression.php',
			),
			'isAfter' => array(
						'class'	=>	'isAfterExpression',
						'src'	=>	'include/Expressions/Expression/Boolean/isAfterExpression.php',
			),
			'isValidEmail' => array(
						'class'	=>	'IsValidEmailExpression',
						'src'	=>	'include/Expressions/Expression/Boolean/IsValidEmailExpression.php',
			),
			'isValidTime' => array(
						'class'	=>	'IsValidTimeExpression',
						'src'	=>	'include/Expressions/Expression/Boolean/IsValidTimeExpression.php',
			),
			'greaterThan' => array(
						'class'	=>	'GreaterThanExpression',
						'src'	=>	'include/Expressions/Expression/Boolean/GreaterThanExpression.php',
			),
			'isForecastClosedWon' => array(
						'class'	=>	'IsForecastClosedWonExpression',
						'src'	=>	'include/Expressions/Expression/Boolean/IsForecastClosedWonExpression.php',
			),
			'or' => array(
						'class'	=>	'OrExpression',
						'src'	=>	'include/Expressions/Expression/Boolean/OrExpression.php',
			),
			'equal' => array(
						'class'	=>	'EqualExpression',
						'src'	=>	'include/Expressions/Expression/Boolean/EqualExpression.php',
			),
			'doBothExist' => array(
						'class'	=>	'BinaryDependencyExpression',
						'src'	=>	'include/Expressions/Expression/Boolean/BinaryDependencyExpression.php',
			),
			'isValidPhone' => array(
						'class'	=>	'IsValidPhoneExpression',
						'src'	=>	'include/Expressions/Expression/Boolean/IsValidPhoneExpression.php',
			),
			'isWithinRange' => array(
						'class'	=>	'IsInRangeExpression',
						'src'	=>	'include/Expressions/Expression/Boolean/IsInRangeExpression.php',
			),
			'isValidDate' => array(
						'class'	=>	'IsValidDateExpression',
						'src'	=>	'include/Expressions/Expression/Boolean/IsValidDateExpression.php',
			),
			'isAlpha' => array(
						'class'	=>	'IsAlphaExpression',
						'src'	=>	'include/Expressions/Expression/Boolean/IsAlphaExpression.php',
			),
			'rollupConditionalSum' => array(
						'class'	=>	'SumConditionalRelatedExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/SumConditionalRelatedExpression.php',
			),
			'strlen' => array(
						'class'	=>	'StringLengthExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/StringLengthExpression.php',
			),
			'median' => array(
						'class'	=>	'MedianExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/MedianExpression.php',
			),
			'round' => array(
						'class'	=>	'RoundExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/RoundExpression.php',
			),
			'rollupAve' => array(
						'class'	=>	'AverageRelatedExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/AverageRelatedExpression.php',
			),
			'rollupAvg' => array(
						'class'	=>	'AverageRelatedExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/AverageRelatedExpression.php',
			),
			'ceil' => array(
						'class'	=>	'CeilingExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/CeilingExpression.php',
			),
			'ceiling' => array(
						'class'	=>	'CeilingExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/CeilingExpression.php',
			),
			'ln' => array(
						'class'	=>	'NaturalLogExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/NaturalLogExpression.php',
			),
			'pow' => array(
						'class'	=>	'PowerExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/PowerExpression.php',
			),
			'rollupMax' => array(
						'class'	=>	'MaxRelatedExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/MaxRelatedExpression.php',
			),
			'count' => array(
						'class'	=>	'CountRelatedExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/CountRelatedExpression.php',
			),
			'stddev' => array(
						'class'	=>	'StandardDeviationExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/StandardDeviationExpression.php',
			),
			'average' => array(
						'class'	=>	'AverageExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/AverageExpression.php',
			),
			'avg' => array(
						'class'	=>	'AverageExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/AverageExpression.php',
			),
			'min' => array(
						'class'	=>	'MinimumExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/MinimumExpression.php',
			),
			'multiply' => array(
						'class'	=>	'MultiplyExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/MultiplyExpression.php',
			),
			'currencyMultiply' => array(
						'class'	=>	'MultiplyExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/MultiplyExpression.php',
			),
			'mul' => array(
						'class'	=>	'MultiplyExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/MultiplyExpression.php',
			),
			'log' => array(
						'class'	=>	'LogExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/LogExpression.php',
			),
			'negate' => array(
						'class'	=>	'NegateExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/NegateExpression.php',
			),
			'rollupMin' => array(
						'class'	=>	'MinRelatedExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/MinRelatedExpression.php',
			),
			'floor' => array(
						'class'	=>	'FloorExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/FloorExpression.php',
			),
			'subtract' => array(
						'class'	=>	'SubtractExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/SubtractExpression.php',
			),
			'currencySubtract' => array(
						'class'	=>	'SubtractExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/SubtractExpression.php',
			),
			'sub' => array(
						'class'	=>	'SubtractExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/SubtractExpression.php',
			),
			'rollupSum' => array(
						'class'	=>	'SumRelatedExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/SumRelatedExpression.php',
			),
			'rollupCurrencySum' => array(
						'class'	=>	'SumRelatedExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/SumRelatedExpression.php',
			),
			'max' => array(
						'class'	=>	'MaximumExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/MaximumExpression.php',
			),
			'number' => array(
						'class'	=>	'ValueOfExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/ValueOfExpression.php',
			),
			'abs' => array(
						'class'	=>	'AbsoluteValueExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/AbsoluteValueExpression.php',
			),
			'indexOf' => array(
						'class'	=>	'IndexOfExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/IndexOfExpression.php',
			),
			'divide' => array(
						'class'	=>	'DivideExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/DivideExpression.php',
			),
			'currencyDivide' => array(
						'class'	=>	'DivideExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/DivideExpression.php',
			),
			'div' => array(
						'class'	=>	'DivideExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/DivideExpression.php',
			),
			'add' => array(
						'class'	=>	'AddExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/AddExpression.php',
			),
			'currencyAdd' => array(
						'class'	=>	'AddExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/AddExpression.php',
			),
			'countConditional' => array(
						'class'	=>	'CountConditionalRelatedExpression',
						'src'	=>	'include/Expressions/Expression/Numeric/CountConditionalRelatedExpression.php',
			),
			'currencyRate' => array(
						'class'	=>	'CurrencyRateExpression',
						'src'	=>	'include/Expressions/Expression/Generic/CurrencyRateExpression.php',
			),
			'ifElse' => array(
						'class'	=>	'ConditionExpression',
						'src'	=>	'include/Expressions/Expression/Generic/ConditionExpression.php',
			),
			'cond' => array(
						'class'	=>	'ConditionExpression',
						'src'	=>	'include/Expressions/Expression/Generic/ConditionExpression.php',
			),
			'related' => array(
						'class'	=>	'RelatedFieldExpression',
						'src'	=>	'include/Expressions/Expression/Generic/RelatedFieldExpression.php',
			),
			'valueAt' => array(
						'class'	=>	'IndexValueExpression',
						'src'	=>	'include/Expressions/Expression/Generic/IndexValueExpression.php',
			),
			'sugarField' => array(
						'class'	=>	'SugarFieldExpression',
						'src'	=>	'include/Expressions/Expression/Generic/SugarFieldExpression.php',
			),
			'dayofweek' => array(
						'class'	=>	'DayOfWeekExpression',
						'src'	=>	'include/Expressions/Expression/Date/DayOfWeekExpression.php',
			),
			'timestamp' => array(
						'class'	=>	'TimestampExpression',
						'src'	=>	'include/Expressions/Expression/Date/TimestampExpression.php',
			),
			'hoursUntil' => array(
						'class'	=>	'HoursUntilExpression',
						'src'	=>	'include/Expressions/Expression/Date/HoursUntilExpression.php',
			),
			'maxRelatedDate' => array(
						'class'	=>	'MaxRelatedDateExpression',
						'src'	=>	'include/Expressions/Expression/Date/MaxRelatedDateExpression.php',
			),
			'daysUntil' => array(
						'class'	=>	'DaysUntilExpression',
						'src'	=>	'include/Expressions/Expression/Date/DaysUntilExpression.php',
			),
			'now' => array(
						'class'	=>	'NowExpression',
						'src'	=>	'include/Expressions/Expression/Date/NowExpression.php',
			),
			'today' => array(
						'class'	=>	'TodayExpression',
						'src'	=>	'include/Expressions/Expression/Date/TodayExpression.php',
			),
			'addDays' => array(
						'class'	=>	'AddDaysExpression',
						'src'	=>	'include/Expressions/Expression/Date/AddDaysExpression.php',
			),
			'monthofyear' => array(
						'class'	=>	'MonthOfYearExpression',
						'src'	=>	'include/Expressions/Expression/Date/MonthOfYearExpression.php',
			),
			'date' => array(
						'class'	=>	'DefineDateExpression',
						'src'	=>	'include/Expressions/Expression/Date/DefineDateExpression.php',
			),
);
?>