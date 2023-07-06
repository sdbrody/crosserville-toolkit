function toolbarFocus() {
    const activeTabs = document.getElementsByClassName("activeTab");
    for (let i = 0; i < activeTabs.length; i++) {
        activeTabs.item(i).classList.remove("activeTab");
    }
    document.getElementById("id_toolbox_tab").classList.add("activeTab");
    const activePanes = document.getElementsByClassName("activePane");
    for (let i = 0; i < activePanes.length; i++) {
        activePanes.item(i).classList.remove("activePane");
    }
    document.getElementById("id_toolbox_pane").classList.add("activePane");
}

function toolbarUnfocus() {
    const tb_tab = document.getElementById("id_toolbox_tab");
    if (tb_tab) {
        tb_tab.classList.remove("activeTab");
    }
    const tb_pane = document.getElementById("id_toolbox_pane");
    if (tb_pane) {
        tb_pane.classList.remove("activePane");
    }
}

function insertToolbar(ext_base_url /* to be used for resources */ ) {
    let control_tabs = document.getElementById("id_gridControlTabs");
    control_tabs.childNodes.forEach(function(c) {
        c.addEventListener("click", toolbarUnfocus);
    });

    const toolbox_li = document.createElement("li");
    const toolbox_tab = document.createElement("div");
    toolbox_tab.id = "id_toolbox_tab";
    toolbox_tab.classList.add("tab");
    toolbox_tab.setAttribute("data-tab", "toolbox");
    toolbox_tab.innerHTML = `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="gridIcon">
      <g>
        <path fill="currentColor" d="M 374.933 451.194 c 12.496 12.497 32.758 12.496 45.255 0 l 11.844 -11.844 l 11.844 -11.845 c 12.497 -12.496 12.497 -32.758 0 -45.255 l -43.428 -43.428 c -17.614 -0.019 -41.985 -12.287 -63.169 -33.47 c -20.9 -20.902 -33.119 -44.902 -33.458 -62.459 c -12.482 -8.75 -29.813 -7.559 -40.965 3.592 l -11.844 11.844 l -11.844 11.844 c -11.151 11.152 -12.343 28.482 -3.592 40.965 c 17.556 0.34 41.557 12.558 62.458 33.459 c 21.183 21.183 33.452 45.554 33.471 63.169 L 374.933 451.194 Z M 376.081 437.317 l 53.917 -53.917 c 1.822 -1.822 4.776 -1.822 6.6 0.001 c 1.821 1.821 1.822 4.776 0 6.599 l -53.917 53.917 c -1.823 1.822 -4.777 1.822 -6.6 0 C 374.258 442.094 374.258 439.14 376.081 437.317 Z"></path>
        <path fill="currentColor" d="M 241.76 251.552 l 2.475 -2.475 l 19.446 -19.445 l -25.456 -25.455 c 0 0 -3.89 -1.061 -7.425 0.354 c -3.182 2.475 -7.071 7.07 -7.071 7.07 l -97.934 -97.934 c 0 0 -15.543 -31.099 -21.737 -38 C 95.389 69.12 63.57 51.443 63.57 51.443 s -6.718 -0.354 -10.253 3.182 c -1.174 1.173 -1.952 1.951 -2.476 2.475 c -1.055 1.056 -1.061 1.061 -1.061 1.061 c -0.523 0.523 -1.302 1.302 -2.475 2.476 c -3.536 3.535 -3.182 10.253 -3.182 10.253 s 17.677 31.819 24.225 40.488 c 6.901 6.194 38 21.736 38 21.736 l 97.935 97.934 c 0 0 -4.596 3.891 -7.071 7.072 c -1.414 3.535 -0.354 7.424 -0.354 7.424 L 222.315 271 L 241.76 251.552 Z"></path>
      </g>
      </svg>Toolbox`;
    toolbox_tab.addEventListener("click", toolbarFocus);
    toolbox_li.appendChild(toolbox_tab);
    control_tabs.appendChild(toolbox_li);
    
    const toolbox_div = document.createElement("div");
    toolbox_div.classList.add("gridControlPane");
    toolbox_div.id = "id_toolbox_pane";
    
    fetch(ext_base_url + "res/pane.html")
        .then(response => response.text())
        .then(data => {
            toolbox_div.innerHTML = data;
            document.getElementsByClassName("gridControlPaneWrapper").item(0).appendChild(toolbox_div);
        }).catch(err => {
            // handle error
        });
}

function removeToolbar() {
    document.getElementById("id_toolbox_tab").remove();
    document.getElementById("id_toolbox_pane").remove();
}

window.interface_installed = 1;