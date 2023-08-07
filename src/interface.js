function toolbarFocus() {
    for (var activeTab of document.getElementsByClassName("activeTab")) {
        activeTab.classList.remove("activeTab");
    }
    document.getElementById("id_toolbox_tab").classList.add("activeTab");
    
    for (var activePane of document.getElementsByClassName("activePane")) {
        activePane.classList.remove("activePane");
    }

    let disable = !isSquare(puzzle);
    for (var square_only_button of document.getElementsByClassName("button square_only")){
        square_only_button.disabled = disable;
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

function checkForActive(mutationList) {
    mutationList.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class" && mutation.target.classList.contains("activeTab")) {
            toolbarUnfocus();
            return;
        }
    });
}

var tab_observers = [];

function insertToolbar(ext_base_url /* to be used for resources */ ) {
    let control_tabs_parent = document.getElementById("id_gridControlTabs");
    let control_tabs = control_tabs_parent.children;
    for (let i = 0; i < control_tabs.length; ++i) {
        var observer = new MutationObserver(checkForActive);
        // children are list items containing a single div for the tab.
        observer.observe(control_tabs[i].firstElementChild, {attributes: true});
        tab_observers.push(observer);
    };

    const toolbox_li = document.createElement("li");
    toolbox_li.id = "id_toolbox_li";
    const toolbox_tab = document.createElement("div");
    toolbox_tab.id = "id_toolbox_tab";
    toolbox_tab.classList.add("tab");
    toolbox_tab.setAttribute("data-tab", "toolbox");
    toolbox_tab.innerHTML = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="gridIcon">
        <path fill="currentColor" d="M225.351,201.379c-1.753,1.062-3.459,2.194-5.103,3.401c-0.582,0.432-1.18,0.862-1.753,1.312 c-2.036,1.606-4.005,3.287-5.854,5.123c-1.584,1.597-3.044,3.271-4.456,4.988c-0.398,0.504-0.782,1.018-1.177,1.512 c-1.039,1.354-2.025,2.75-2.96,4.173c-0.314,0.488-0.65,0.961-0.956,1.454c-1.07,1.743-2.088,3.527-3.002,5.365L88.366,116.987 c0.076-0.037,0.136-0.095,0.209-0.129c2.528-1.37,4.929-2.928,7.247-4.595c0.539-0.381,1.053-0.785,1.58-1.187 c2.297-1.758,4.515-3.614,6.575-5.672c2.042-2.042,3.893-4.258,5.638-6.554c0.483-0.633,0.941-1.279,1.404-1.929 c1.381-1.956,2.667-3.993,3.843-6.121c0.199-0.357,0.461-0.671,0.656-1.04l110.91,110.904 C226.049,200.875,225.719,201.158,225.351,201.379z"/>
        <path fill="currentColor" d="M69.58,29.569L43.058,3.052c4.37-1.063,8.848-1.602,13.412-1.602c15.071,0,29.243,5.869,39.901,16.523 c15.244,15.244,20.446,38.289,13.25,58.717c-0.092,0.257-0.205,0.504-0.318,0.75c-0.16,0.373-0.328,0.748-0.462,1.097 c-2.892,7.401-7.089,13.885-12.47,19.26c-4.979,4.974-10.821,8.94-17.368,11.788c-0.338,0.146-0.682,0.28-1.021,0.404l-0.845,0.328 c-6.643,2.617-13.643,3.945-20.804,3.945c-15.039,0-29.165-5.847-39.777-16.464C2.44,83.682-3.033,63.472,1.624,44.484 l26.529,26.522c1.078,1.082,2.59,1.667,4.083,1.57l32.124-1.708c2.748-0.147,4.939-2.344,5.083-5.081l1.717-32.129 C71.229,32.132,70.659,30.645,69.58,29.569z"/>
        </svg>Toolbox`;
    toolbox_tab.addEventListener("click", toolbarFocus);
    toolbox_li.appendChild(toolbox_tab);
    control_tabs_parent.appendChild(toolbox_li);
    
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
    document.getElementById("id_toolbox_li").remove();
    document.getElementById("id_toolbox_pane").remove();
    tab_observers.forEach(function(ob) { ob.disconnect(); });
    // clear the array
    tab_observers.length = 0; 
}

// Flag to indicate scripts have been installed.
window.interface_installed = 1;
