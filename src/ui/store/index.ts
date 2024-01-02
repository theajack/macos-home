/*
 * @Author: theajack
 * @Date: 2023-04-05 20:10:30
 * @Description: Coding something
 */
import { defineStore, acceptHMRUpdate } from 'pinia';
import { DeskTopMenuList } from '../components/common/context-menu/context-menu';
import { WindowHeight, WindowWidth } from '../style/common';
import { throttle } from '@/lib/utils';
import { getAppManager } from '@/core/context';

export const useGlobalStore = defineStore('store', {
    state: () => ({
        windowMaxZIndex: -1,
        inDragging: false,
        deskTopMenuList: DeskTopMenuList,
        dockContextAppName: '',
        showLauncher: false,
        windowWidth: WindowWidth,
        windowHeight: WindowHeight,

        statusMenu: getAppManager().finder.statusMenu,
    }),
    actions: {
        drag (bool = true) {
            this.inDragging = bool;
        },
        openDockAppMenu (name: string) {
            this.dockContextAppName = name;
        },
        closeDockAppMenu () {
            this.dockContextAppName = '';
        }
    },
    getters: {
    }
});

window.addEventListener('resize', throttle(() => {
    const store = useGlobalStore();
    store.windowWidth = WindowWidth;
    store.windowHeight = WindowHeight;
}));

// @ts-ignore
if (import.meta.hot) {
    // @ts-ignore
    import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot));
}