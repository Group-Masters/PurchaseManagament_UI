﻿function Rapor() {
    var girisId = $("#birim").val();
    var html = ``;
    Get(`Report/GetByDepartment/${girisId}`, (data) => {
        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);
        html += `            <nav class="navbar bg-white mb-2">
              <button type="submit" class="btn btn-warning mr-3" title="PDF Oluştur" id="pdfOlustur" onclick="Pdf(${girisId})">
                    PDF Oluştur
                    <i class="bi bi-receipt text-black"></i>
              </button>
            </nav>`;
        for (var i = 0; i < arr.length; i++) {
            html += `<div class="secili accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header border border-black">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapse${arr[i].requestId}"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
            
          >
            ${arr[i].requestId} ${arr[i].requestby}
          </button>
        </h2>
        <div
          id="flush-collapse${arr[i].requestId}"
          class="accordion-collapse collapse"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">

            <table class="table">
              <thead class="position-relative">
                 <tr  style="background-color:#9e9494; color:#9e9494;">
                  <th scope="col" style="border:none;">·</th>
                  <th scope="col" style="border:none;">·</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                  <th scope="row">Fatura Id'si :</th>
                  <td>${arr[i].invoiceId === null ? 'Fatura Oluşmadı veya Ürün Stoktan Karşılandı' : arr[i].invoiceId}</td>
                </tr>
                <tr>
                  <th scope="row">Şirket-Departman Adı :</th>
                  <td>${arr[i].companydepartment}</td>
                </tr>
                 <tr>
                  <th scope="row">Tedarikçi Adı :</th>
                  <td>${arr[i].supplier}</td>
                </tr>
                <tr>
                  <th scope="row">Talep Edilen Ürün Adı :</th>
                  <td>${arr[i].product}</td>
                </tr>
                <tr>
                  <th scope="row">Ürün Adeti :</th>
                  <td>${arr[i].quantity}</td>
                </tr>
                <tr>
                  <th scope="row">Ödenen Fiyat:</th>
                  <td>${arr[i].prices}</td>
                </tr>
                <tr>
                  <th scope="row">Onaylayan Yetkili :</th>
                  <td>${arr[i].approvedEmployee}</td>
                </tr>
                <tr>
                  <th scope="row">Talep Oluşma Tarihi:</th>
                  <td>${arr[i].createDate}</td>
                </tr>
                <tr>
                  <th scope="row">Talep Onaylanma Tarihi :</th>
                  <td>${arr[i].supplyDate === null ? 'Talep daha onaylanmadı veya reddedildi' : arr[i].supplyDate}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`;

        }
        $("#divBirim").html(html);

        $("#ara").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#divBirim .accordion").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });

    });
}
function Pdf(girisId) {
    var pdf = {
        Id: girisId
    }
    Post(`PDF/GenerateReportToPDFByDepartman`, pdf, (data) => {

    });
}

function DepartmanlariGetir() {
    Get("Department/GetAll", (data) => {
        var getdata = data;
        var dropdown = $("#birim");
        $.each(getdata, function (index, get) {
            dropdown.append($("<option>").val(get.id).text(`${get.name}`));
        });
    });
}
$(document).ready(function () {
    // Sayfa yüklendiğinde mevcut şirket verilerini getir
    Rapor();
    DepartmanlariGetir();
    // Select değişiklik olayını dinle
    $("#girisSirketId").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        Rapor();
    });
    $("#birim").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        Rapor();
    });
});