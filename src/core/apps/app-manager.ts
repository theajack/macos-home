/*
 * @Author: tackchen
 * @Date: 2022-09-25 20:42:26
 * @Description: Coding something
 */

import { Dir } from '../disk/files/dir';
import { OS } from '../os/os';
import { createApp, createDefaultApps, IAppConfig } from './app-config';
import { File } from '../disk/files/file';
import { IJson } from '../type';
import { App } from './app';
import { StringText } from '../string';
import { ISelectItem } from '../types/component';
import { toast } from '@/ui/components/common/toast/toast';
import { getApps } from '../context';

const onClick = function (this: ISelectItem) {
    toast({
        from: getApps()[0],
        title: '收到一条消息',
        content: this.name || '',
        buttonText: 'Reply'
    });
};

const mainStatus: ISelectItem[] = [
    {
        name: 'About This Mac',
        onClick
    }, {
        isSplit: true,
    }, {
        name: 'System Preferences...',
        onClick
    }, {
        name: 'App Store...',
        onClick,
        children: [ {
            name: 'test1',
            onClick,
        }, {
            name: 'test2',
            onClick,
        } ]
    }, {
        isSplit: true
    }, {
        name: 'Recent Items',
        onClick,
        children: [ {
            name: 'test1',
            onClick,
        }, {
            name: 'test2',
            onClick,
        } ]
    }, {
        isSplit: true
    }, {
        name: 'Force Quit...',
        onClick,
    }, {
        isSplit: true
    }, {
        name: 'Sleep',
        onClick,
    }, {
        name: 'Restart...',
        onClick,
    }, {
        name: 'Shut Down...',
        onClick,
    }, {
        isSplit: true
    }, {
        name: 'Lock Screen',
        onClick,
    }, {
        name: 'Log Out tackchen...',
        onClick,
    }
];

export class AppManager {
    static DIR_NAME = StringText.appDir;
    static CONFIG_FILE_NAME = StringText.appConfigFile;

    appDir: Dir;
    appConfigFile: File;

    appConfig: {
        installedApps: string[],
        dockApps: string[],
    } = {
            installedApps: [],
            dockApps: [],
        };

    mainStatus = mainStatus;

    installedApps: App[];
    runningApps: App[];
    dockApps: App[];
    currentApp: App;

    parent: OS;

    constructor (os: OS) {
        this.parent = os;
    }

    async initAppsDirectory () {
        const { disk } = this.parent;
        this.appDir = await disk.createDir({
            name: AppManager.DIR_NAME,
        }, {
            returnIfExists: true,
        }) as Dir;
        await this.initAppConfig();
        await this.initApps();
        this.currentApp = this.installedApps.find(item => item.name === 'finder') as App;
    }

    private async initAppConfig () {
        this.appConfigFile = await this.appDir.createFile({
            name: AppManager.CONFIG_FILE_NAME,
            content: createDefaultApps()
        }, {
            returnIfExists: true,
        }) as any as File;
    }

    private async initApps () {
        const config = this.appConfigFile.content as IJson<IAppConfig>;

        const all: Promise<App>[] = [];

        for (const key in config) {
            const value = config[key];
            all.push(createApp(value));
        }

        const installApps = await Promise.all(all);

        this.installedApps = installApps;

        this.appConfig.installedApps = installApps.map(item => item.name);

        this.dockApps = installApps
            .filter(item => {
                return typeof config[item.name]?.dockIndex === 'number';
            })
            .sort((a, b) => {
                const aIndex = config[a.name].dockIndex || 0;
                const bIndex = config[b.name].dockIndex || 0;
                return aIndex > bIndex ? 1 : -1;
            });

        this.appConfig.dockApps = this.dockApps.map(item => item.name);
    }
}