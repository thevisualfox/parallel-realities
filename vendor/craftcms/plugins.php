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
  'clarknelson/craft-recaptcha-3' => 
  array (
    'class' => 'clarknelson\\craftrecaptcha3\\CraftRecaptcha3',
    'basePath' => $vendorDir . '/clarknelson/craft-recaptcha-3/src',
    'handle' => 'craft-recaptcha-3',
    'aliases' => 
    array (
      '@clarknelson/craftrecaptcha3' => $vendorDir . '/clarknelson/craft-recaptcha-3/src',
    ),
    'name' => 'Craft reCAPTCHA 3',
    'version' => '1.0.6',
    'description' => 'Verifies via Google the site and secret codes required to verify humanity through reCAPTCHA v3.',
    'developer' => 'Clark Nelson',
    'developerUrl' => 'http://clarknelson.com',
    'changelogUrl' => 'https://raw.githubusercontent.com/clarknelson/craft-recaptcha-3/master/CHANGELOG.md',
    'hasCpSettings' => true,
    'hasCpSection' => false,
  ),
);
