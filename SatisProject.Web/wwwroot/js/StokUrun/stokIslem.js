function StokUrunleriGetir() {
    var girisSirketId = $("#girisSirketId").val();
    Get(`StockOperations/GetByCompany/${girisSirketId}`, (data) => {
        var html = `<div class="mx-4"><table class="table custom-table" style="border-collapse: separate;border-spacing: 0 5px;">
        <thead>
            <tr class="text-white" style="background-color:#9e9494;">
                <th scope="col">Id</th>
                <th scope="col">Ürün Verilen Kişi</th>
                <th scope="col">Ürün Adı</th>
                <th scope="col">Adet</th>
                <th scope="col">Oluşma Tarihi</th>
                <th scope="col">Güncelleme Tarihi</th>
                <th scope="col">İşlemler</th>
            </tr>
        </thead><tbody>`;

        var arr = data.sort((a, b) => b.id - a.id);

        for (var i = 0; i < arr.length; i++) {
            html += `<tr scope="row" class="arama">
                        <td>${i + 1}</td>
                        <td>${arr[i].receiverName} ${arr[i].receiverSurname}</td>                
                        <td>${arr[i].productName}
                        <small class="d-block">${arr[i].measuringUnit}</small>
                        </td>
                        <td>${arr[i].quantity}</td>
                        <td>${FormatDate(arr[i].createdDate)}</td>
                        <td>${(arr[i].modifiedDate && FormatDate(arr[i].modifiedDate)) ? FormatDate(arr[i].modifiedDate) : '---' }</td>`

            html += `
                <td>
             <button class="btn btn-warning" onclick='iade(
                 "${arr[i].id}","${arr[i].receivingEmployeeId}","${arr[i].companyStockId}"
            )'>İade Et</button>
            </td>`;
            `</tr>`;
        }
        html += `</tbody></table></div>`;

        $("#divStok").html(html);

        $(function () {
            $("#ara").keyup(function () {
                var deger = $(this).val().toLowerCase();
                $("#divStok .arama").filter(function () {
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