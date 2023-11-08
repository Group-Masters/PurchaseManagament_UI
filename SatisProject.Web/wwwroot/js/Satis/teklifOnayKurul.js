function OnaylanmisTalepleriGetir() {
    var girisSirketId = $("#girisSirketId").val();
    var html = ``;
    Get(`Offer/GetByChairman/${girisSirketId}`, (data) => {//Gerekli Controller Yok, Onaylayan Birim Müdür getirme işlemini düşün.
        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);
        for (var i = 0; i < arr.length; i++) {
            html += `<div class="secili accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header border border-black">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapse${arr[i].id}"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
            
          >
            ${arr[i].id} ${arr[i].requestEmployeeName} ${arr[i].requestEmployeeSurname}
            <span class="position-absolute top-25 end-50" style="color:  ${arr[i].status === 3 ? 'Blue' : arr[i].status === 1 ? 'Red' : arr[i].status === 4 ? 'Green' : 'Gray'};">
                ${arr[i].status === 3 ? 'Onay Bekliyor' : arr[i].status === 1 ? 'Reddedildi' : arr[i].status === 4 ? 'Onaylandı' : 'Geçersiz Durum'}
            </span>
          </button>
        </h2>
        <div
          id="flush-collapse${arr[i].id}"
          class="accordion-collapse collapse"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">

            <table class="table">
              <thead class="position-relative">
                 <tr class="bg-primary text-primary">
                  <th scope="col" style="border:none;">·</th>
                  <th class="position-absolute top-0 end-0" scope="col" style="top:-7px !important;border:none;">
                  <span class="">
                    <button class="btn btn-success" onclick='Onayla(
                 "${arr[i].id}")'>Onayla</button>
                  </span>
                  <span class="">
                    <button class="btn btn-danger" onclick='Reddet(
                 "${arr[i].id}")'>Reddet</button>
                  </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Tedarikçi Adı :</th>
                  <td>${arr[i].supplierName}</td>
                </tr>
                <tr>
                  <th scope="row">Ürün Adı :</th>
                  <td>${arr[i].productName}</td>
                </tr>
                <tr>
                  <th scope="row">Birim Bilgisi :</th>
                  <td>${arr[i].quantity} ${arr[i].measuringUnit}</td>
                </tr>
                <tr>
                  <th scope="row">Fiyat Teklifi :</th>
                  <td>${arr[i].offeredPrice} ${arr[i].currencyName}</td>
                </tr>
                <tr>
                  <th scope="row">Açıklama :</th>
                  <td>${arr[i].details}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`;

        }
        $("#divTeklif").html(html);

        $("#ara").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#divTeklif .accordion").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });

    });
}

function Reddet(id, approvingEmployeeId) {
    var teklif = {
        Id: id,
        Status: 5//Reddetme 1 Olmalı Fakat Api tarafında Status Enum'u içerisinde Hem Reddetme Hem YönetimRed kısmı var!!

    };
    Put("Offer/UpdateOfferState", teklif, (data) => {
        OnaylanmisTalepleriGetir();
    });
}


function Onayla(id, approvingEmployeeId) {
    var teklif = {
        Id: id,
        Status: 4 //Onay 2 Olmalı Fakat Api tarafında Status Enum'u içerisinde Hem Onay Hem YonetimOnay kısmı var!!

    };
    Put("Offer/UpdateOfferState", teklif, (data) => {
        OnaylanmisTalepleriGetir();
    });
}


$(document).ready(function () {
    // Sayfa yüklendiğinde mevcut şirket verilerini getir
    TumSirketleriGetir();
    OnaylanmisTalepleriGetir();
    // Select değişiklik olayını dinle
    $("#girisSirketId").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        OnaylanmisTalepleriGetir();
    });
});
