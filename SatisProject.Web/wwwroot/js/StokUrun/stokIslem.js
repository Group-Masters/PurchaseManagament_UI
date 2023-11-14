function StokUrunleriGetir() {
    var girisSirketId = $("#girisSirketId").val();
    Get(`StockOperations/GetByCompany/${girisSirketId}`, (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light" style="background-color:#9e9494;"><tr><th>Id</th><th>Ürün Verilen Kişi</th><th>Adet</th><th>Ürün Adı</th></th></th><th></th></tr></thead>`;

        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);
        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${i + 1}</td><td>${arr[i].receiverName} ${arr[i].receiverSurname}</td><td>${arr[i].quantity}</td><td>${arr[i].productName}</td>`;
            html += `<td>
             <button class="btn btn-warning" onclick='iade(
                 "${arr[i].id}","${arr[i].receivingEmployeeId}","${arr[i].companyStockId}"
            )'>İade Et</button>
            </td>`;
            html += `</tr>`
        }
        html += `</table></div>`;

        $("#divStok").html(html);

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

function iade(id, receivingEmployeeId, companyStockId) {
    $("#id").val(id);
    $("#kullaniciId").val(receivingEmployeeId);
    $("#companyStockId").val(companyStockId);
    $("#adet").val("");
    $("#staticBackdrop").modal("show");
}

function Guncelle() {
    var stok = {
        Id: $("#id").val(),
        CompanyStockId: $("#companyStockId").val(),
        Quantity: $("#adet").val(),
        ReceivingEmployeeId: $("#kullaniciId").val()
    };
    Put("CompanyStock/ReturnStock", stok, (data) => {
        StokUrunleriGetir();
        $("#staticBackdrop").modal("hide");
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