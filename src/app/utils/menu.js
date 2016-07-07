import _ from 'lodash'

const MENU_MAPPER = 'MENU_MAPPER';

module.exports = {

    saveChildrenMenu(menus, menusMapper) {
        function _handler(menus, menusMapper) {
            let _length = menus.length;
            for (var i = 0; i < _length; i++) {
                let sub = menus[i];

                if (sub.children) {
                    for (var j = 0; j < sub.children.length; j++) {
                        let menu = sub.children[j];
                        if (menu.children) {
                            _handler(menu.children, menusMapper);
                        } else {
                            let keyPath = new Array()
                            keyPath[0] = menu.key //菜单项
                            keyPath[1] = menu.name
                            keyPath[2] = sub.key //菜单
                            keyPath[3] = sub.name
                            menusMapper[menu.url] = keyPath
                        }
                    }
                }
            }
        }
        _handler(menus, menusMapper)
    },

    saveMenu(menus) {
        let menusMapper = {}
        this.saveChildrenMenu(menus, menusMapper)
        localStorage.setItem(MENU_MAPPER, JSON.stringify(menusMapper));
    },

    getNavPath() {
        let path = location.pathname.replace('/', '').split('/')[0]
        if (path != '' && path != 'home') {
            let navPath = []
            let menusMapper = JSON.parse(localStorage.getItem(MENU_MAPPER))

            if (menusMapper[path] != null) {
                navPath[0] = {
                    key: menusMapper[path][2],
                    name: menusMapper[path][3]
                }
                navPath[1] = {
                    key: menusMapper[path][0],
                    name: menusMapper[path][1]
                }
            }
            return navPath
        }
        return []
    }
}