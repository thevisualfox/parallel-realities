<?php
/**
 * Yii Application Config
 * File: /config/app.php OR /config/app.web.php
 *
 * This is an example of how to enable the MAMP helper module.
 */
return [
    'modules' => [
        'mamp-helper' => \modules\MampHelper::class,
    ],
    'bootstrap' => ['mamp-helper'],
];
