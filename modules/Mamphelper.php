<?php
namespace modules;

use Craft;

/**
 * MAMP Helper class.
 * File: /modules/MampHelper.php
 *
 * MySQL database backups triggered from the Craft 3 Control Panel fail because,
 * by default, Craft expects to use `mysqldump` in an `exec()` command. In MAMP,
 * `mysqldump` is not available to PHP in the `PATH` env variable. A few Google
 * searches will surface some solutions that work for some people, not for others.
 *
 * Craft provides two configuration options to help with this: `backupCommand`
 * and `restoreCommand`. With these you can add your own commands and use tokens
 * for parameters like `{password}` for the database password or `{file}` for
 * the destination file in the `/storage/backups` directory. These commands
 * will override Craft's default commands, but using them requires specific
 * knowlege about MySQL command line usage.
 *
 * This module helps by taking Craft's default commands, altering them to point
 * to MAMP's executables (`msyql` and `mysqldump`), then adds them to the
 * config under the appropriate keys, `backupCommand` and `restoreCommand`.
 *
 * Drop this file in your `/modules` directory. Then in `/config/app.php`
 * (or `/config/web.app.php` if you prefer) make it look like this:
 *
 * ```
 * return [
 *     'modules' => [
 *         'mamp-helper' => \modules\MampHelper::class,
 *     ],
 *   'bootstrap' => ['mamp-helper'],
 * ];
 * ```
 *
 * Be sure not to step on previously existing modules, of course.
 * Now you should be able to upgrade with backups, restore, and generate
 * backups without MAMP hacks.
 */
class MampHelper extends \yii\base\Module
{
    /**
     * Initializes the module.
     */
    public function init()
    {
        parent::init();

        // Only on CP request, using mysql, and MAMP exists
        if (
            Craft::$app->request->getIsCpRequest() &&
            Craft::$app->config->db->driver === 'mysql' &&
            file_exists('/Applications/MAMP/Library/bin')
        ) {
            // Set the general config 'backupCommand' to Craft's own
            // default backup command, just with the full path to
            // MAMP's `mysqldump` executable.
            Craft::$app->config->general->backupCommand = str_replace(
                'mysqldump',
                '/Applications/MAMP/Library/bin/mysqldump',
                Craft::$app->db->getSchema()->getDefaultBackupCommand()
            );

            // Set the general config 'restoreCommand' to Craft's own
            // default restore command, just with the full path to
            // MAMP's `mysql` executable.
            Craft::$app->config->general->restoreCommand = str_replace(
                'mysql',
                '/Applications/MAMP/Library/bin/mysql',
                Craft::$app->db->getSchema()->getDefaultRestoreCommand()
            );
        }
    }
}
