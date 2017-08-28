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

namespace Sugarcrm\Sugarcrm\Security\Validator;

use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Validator\Validation;

/**
 *
 * Validation service
 *
 * The validator service object is available by using the Validator
 * service factory `Validator::getService()`.
 *
 */
class Validator
{
    /**
     * @var ValidatorInterface
     */
    private static $service;

    /**
     * Service class, dont instantiate.
     */
    private function __construct()
    {
    }

    /**
     * Get service
     * @return ValidatorInterface
     */
    public static function getService()
    {
        if (empty(self::$service)) {
            self::$service = self::create();
        }
        return static::$service;
    }

    /**
     * Create new Validator service object. Use `Validator::getService()`
     * unless you know what you are doing.
     *
     * @return ValidatorInterface
     */
    public static function create()
    {
        $validatorFactory = new ConstraintValidatorFactory();

        // TODO add metadatacache when adding actual SugarBean validators

        return Validation::createValidatorBuilder()
            ->disableAnnotationMapping()
            ->setConstraintValidatorFactory($validatorFactory)
            ->getValidator();
    }
}
