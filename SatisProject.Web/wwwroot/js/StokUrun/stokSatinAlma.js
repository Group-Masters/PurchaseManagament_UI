function StokUrunleriGetir() {
    var girisSirketId = $("#girisSirketId").val();
    Get(`CompanyStock/GetAllByCompanyId/${girisSirketId}`, (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light" style="background-color:#9e9494;"><tr><th>Id</th><th>Ürün Adı</th><th>Adet</th></tr></thead>`;

        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);
        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${i+1}</td><td>${arr[i].productName} / ${arr[i].measuringUnitName}</td><td>${arr[i].quantity}</td>`;
           
            html += `</tr>`
        }
        html += `</table></div>`;

        $("#divDepo").html(html);

        $(function () {
            $("#ara").keyup(function () {
                var deger = $(this).val().toLowerCase();
                $("#liste #arama").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(deger) > -1);
                });
            });
        });
    });
}

$(document).ready(function () {
    // Sayfa yüklendiğinde mevcut şirket verilerini getir
    TumSirketleriGetir();
    StokUrunleriGetir();
    // Select değişiklik olayını dinle
    $("#girisSirketId").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        StokUrunleriGetir();
       
        
    });
});