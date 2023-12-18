function SayfalarıGetir() {
    Get("Page/GetAll", (data) => {
        if (data && data.length > 0) {
            var arr = data;
            var html = `
               
            `;

            for (var i = 0; i < arr.length; i++) {
                html += `

                    <li class="nav-item">
                        <a class="nav-link collapsed"
                            href="#"
                            data-toggle="collapse"
                            data-target="#collapsePages${i}"
                            aria-expanded="true"
                            aria-controls="collapsePages${i}">
                            <i class="bi bi-hand-index-fill"></i>
                            <span>${arr[i].pageName}</span>
                        </a>
                        <div id="collapsePages${i}"
                            class="collapse"
                            aria-labelledby="headingPages${i}"
                            data-parent="#accordionSidebar">
                            <div class="py-2 collapse-inner rounded" style="background-color: #edeaea;">
                                <h6 class="collapse-header">${arr[i].pageName} :</h6>`;

                for (var j = 0; j < arr[i].lowerPages.length; j++) {
                    html += `
                       <a class="collapse-item" href="${WEB_URI}/${arr[i].lowerPages[j].url}">${arr[i].lowerPages[j].pageName}</a>
                    `;
                }

                html += `</div>
                        </div>
                    </li>
                `;
            }

            $("#cekilecekVeri").html(html);
        }
    });
}



$(document).ready(function () {
    SayfalarıGetir();
});