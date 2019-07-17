<?php

$vendorDir = dirname(__DIR__);
$rootDir = dirname(dirname(__DIR__));

return array (
  'craftcms/redactor' => 
  array (
    'class' => 'craft\\redactor\\Plugin',
    'basePath' => $vendorDir . '/craftcms/redactor/src',
    'handle' => 'redactor',
    'aliases' => 
    array (
      '@craft/redactor' => $vendorDir . '/craftcms/redactor/src',
    ),
    'name' => 'Redactor',
    'version' => '2.3.3.2',
    'description' => 'Edit rich text content in Craft CMS using Redactor by Imperavi.',
    'developer' => 'Pixel & Tonic',
    'developerUrl' => 'https://pixelandtonic.com/',
    'developerEmail' => 'support@craftcms.com',
    'documentationUrl' => 'https://github.com/craftcms/redactor/blob/v2/README.md',
  ),
  'craftcms/contact-form' => 
  array (
    'class' => 'craft\\contactform\\Plugin',
    'basePath' => $vendorDir . '/craftcms/contact-form/src',
    'handle' => 'contact-form',
    'aliases' => 
    array (
      '@craft/contactform' => $vendorDir . '/craftcms/contact-form/src',
    ),
    'name' => 'Contact Form',
    'version' => '2.2.5',
    'description' => 'Add a simple contact form to your Craft CMS site',
    'developer' => 'Pixel & Tonic',
    'developerUrl' => 'https://pixelandtonic.com/',
    'developerEmail' => 'support@craftcms.com',
    'documentationUrl' => 'https://github.com/craftcms/contact-form/blob/v2/README.md',
    'components' => 
    array (
      'mailer' => 'craft\\contactform\\Mailer',
    ),
  ),
  'matt-west/craft-recaptcha' => 
  array (
    'class' => 'mattwest\\craftrecaptcha\\CraftRecaptcha',
    'basePath' => $vendorDir . '/matt-west/craft-recaptcha/src',
    'handle' => 'recaptcha',
    'aliases' => 
    array (
      '@mattwest/craftrecaptcha' => $vendorDir . '/matt-west/craft-recaptcha/src',
    ),
    'name' => 'reCAPTCHA',
    'version' => '1.3.0',
    'description' => 'Integrate Google’s reCAPTCHA into your forms.',
    'developer' => 'Matt West',
    'developerUrl' => 'https://mattwest.io',
    'changelogUrl' => 'https://raw.githubusercontent.com/matt-west/craft-recaptcha/master/CHANGELOG.md',
    'hasCpSettings' => true,
    'hasCpSection' => false,
    'components' => 
    array (
      'craftRecaptchaService' => 'mattwest\\craftrecaptcha\\services\\CraftRecaptchaService',
    ),
  ),
);
