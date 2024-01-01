/*
 * @Author: tackchen
 * @Date: 2022-09-22 10:11:01
 * @Description: Coding something
 */
import { App } from '../app';
import { AppNames } from '../app-config';

export class SystemPreferences extends App {

    constructor () {
        super({
            title: 'System Settings',
            name: AppNames.systemPreferences,
            msgCount: 3,
        });
    }
    onOpen () {
        this.msgCount = 0;
        return super.onOpen();
    }
}