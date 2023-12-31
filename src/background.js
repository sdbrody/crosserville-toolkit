function _insertToolkit(ext_base_url) {
    window.insertToolbar(ext_base_url);
    window.insertFillTools(ext_base_url);
}

function _removeToolkit() {
    window.removeToolbar();
    window.removeFillTools();
}

const crosserville = 'https://www.crosserville.com/builder'
chrome.action.onClicked.addListener(async (tab) => {

    if (!tab.url.startsWith(crosserville)) return;

    const ext_base_url = chrome.runtime.getURL("");

    await chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        func: () => {
            return window.interface_installed;
        },
        world: "MAIN"
    }).then(injectionResults => {
        if (!injectionResults[0].result) {
            chrome.scripting.executeScript({
                target: {
                    tabId: tab.id
                },
                files: ["src/interface.js", "src/flips.js", "src/fill_tools.js"],
                world: "MAIN"
            }).then(() => console.log("interface installed"));
        }
    });

    await chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        func: () => {
            return document.getElementById("id_toolbox_tab");
        },
        world: "MAIN"
    }).then(injectionResults => {
        if (injectionResults[0].result) {
            // Toolbar exists, so remove it
            chrome.scripting.removeCSS({
                files: ["src/toolbox.css"],
                target: {
                    tabId: tab.id
                },
            });
            chrome.scripting.executeScript({
                target: {
                    tabId: tab.id
                },
                func: _removeToolkit,
                world: "MAIN"
            }).then(() => console.log("toolkit removed"));
        } else {
            // Toolbar does not exist, add it
            chrome.scripting.insertCSS({
                files: ["src/toolbox.css"],
                target: {
                    tabId: tab.id
                },
            });
            chrome.scripting.executeScript({
                target: {
                    tabId: tab.id
                },
                func: _insertToolkit,
                args: [ext_base_url],
                world: "MAIN"
            }).then(() => console.log("toolkit inserted"));
        }
    });
});