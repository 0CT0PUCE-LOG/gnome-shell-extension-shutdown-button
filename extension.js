/**********************************************************************
 *
 *   Extension created by :
 *   ___   _____ _______ ___  _____  _    _  _____ ______
 *  / _ \ / ____|__   __/ _ \|  __ \| |  | |/ ____|  ____|
 * | | | | |       | | | | | | |__) | |  | | |    | |__
 * | | | | |       | | | | | |  ___/| |  | | |    |  __|
 * | |_| | |____   | | | |_| | |    | |__| | |____| |____
 *  \___/ \_____|  |_|  \___/|_|     \____/ \_____|______|
 *
 * ShutdownButton is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 **********************************************************************/

const GETTEXT_DOMAIN = 'my-indicator-extension';
const { GObject, St, Gio } = imports.gi;
const ExtensionUtils = imports.misc.extensionUtils;
const Main = imports.ui.main;
const GLib = imports.gi.GLib;
const PanelMenu = imports.ui.panelMenu;
const _ = ExtensionUtils.gettext;

const Indicator = GObject.registerClass(
    class Indicator extends PanelMenu.Button {
        _init() {
            super._init(0.0, _('My Shiny Indicator'));

            let button;

            button = new St.Bin({
                style_class: "panel-button",
                reactive: true,
                can_focus: false,
                track_hover: false,
            });

            let icon = new St.Icon({
                icon_name: "system-shutdown-symbolic",
                style_class: "system-status-icon"
            });

            button.set_child(icon);

            function shutdown() {
                GLib.spawn_command_line_async('poweroff');
            }

            button.connect("button-press-event", shutdown);

            this.add_child(button);
        }
    });

class Extension {
    constructor(uuid) {
        this._uuid = uuid;
        ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
    }
    enable() {
        //button.connect("button-press-event", forceLogout);
        this._indicator = new Indicator();
        Main.panel.addToStatusArea(this._uuid, this._indicator);
    }
    disable() {
        //button.disconnect("button-press-event", forceLogout);
        this._indicator.destroy();
        this._indicator = null;
    }
}

function init(meta) {
    return new Extension(meta.uuid);
}
