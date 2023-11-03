function OnaylanmisTalepleriGetir() {
    var girisSirketId = $("#girisSirketId").val();
    var html = ``;
    Get(`Request/GetApprovedtByCompany/${girisSirketId}`, (data) => {
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
                  <th scope="col">·</th>
                  <th scope="col">
                  <span class="position-absolute top-0 end-0">
                  <button class="btn btn-link"  onclick='IdVer(
                        ${arr[i].id}
                   )'><a class="btn btn-light"> Teklif Ver</a></button>
                   <button class="btn btn-link"  onclick='TalepTeklifleriniGetir(
                        ${arr[i].id}
                   )'><a class="btn btn-light"> Teklifleri Gör</a></button>
                  </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Adet Bilgisi :</th>
                  <td>${arr[i].quantity}</td>
                </tr>
                <tr>
                  <th scope="row">Ürün Adı :</th>
                  <td>${arr[i].productName} / ${arr[i].measuringUnitName}</td>
                </tr>
                <tr>
                  <th scope="row">Onaylayan Birim Müdürü Ad-Soyad :</th>
                  <td>${arr[i].approvingEmployeeName} ${arr[i].approvingEmployeeSurname}</td>
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


function Kaydet() {
    var teklif = {
        Details: $("#aciklama").val(),
        OfferedPrice: $("#fiyat").val(),
        CurrencyId: $("#paraBirim").val(),
        RequestId: $("#gizliId").val(),
        SupplierId: $("#tad").val()
    };
    Post("Offer/Create", teklif, (data) => {
        $("#staticBackdrop").modal("hide");
    });
}


function IdVer(id) {
    $("#gizliId").val(id);
    $("#tad").val("");
    $("#fiyat").val("");
    $("#aciklama").val("");
    $("#paraBirim").val("");
    $("#staticBackdrop").modal("show");
    
}

function TalepTeklifleriniGetir(gizliId) {
    $("#staticBackdrop1").modal("show");
    Get(`Offer/GetByRequestId/${gizliId}`, (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover">` +
            `<thead class="text-light bg-black"><tr><th>Id</th><th>Tedarikci Adı</th><th>Fiyat Teklifi</th><th>Açıklama</th><th>Onay Durumu</th><th></th><th></th><th></th><th></th></tr></thead>`;

        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);
        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${arr[i].id}</td><td>${arr[i].supplierName}</td><td>${arr[i].offeredPrice} - ${arr[i].currencyName}</td>
            <td>${arr[i].details == null ? 'Açıklama Yok' : arr[i].details}</td>
            <td> <span style="color: ${arr[i].onayDurum === null ? 'gray' : arr[i].onayDurum ? 'green' : 'red'};">
                         ${arr[i].onayDurum === null ? 'Beklemede' : arr[i].onayDurum ? 'Onaya Gönderildi' : 'Reddedildi'}
            </span></td>`;
            if (arr[i].onayDurum===null) {
                html += `<td><i class="bi bi-trash text-danger px-2 py-2 mx-3 border border-danger " onclick='Sil(${arr[i].id})'></i></td><td><i class="bi bi-pencil-square text-primary px-2 py-2 mx-3 border border-primary" onclick='Duzenle(
                "${arr[i].id}","${arr[i].aciklama}","${arr[i].fiyatTeklif}","${arr[i].tedarikciAd}","${arr[i].saTalepId}"
            )'></i></td>`;
            }
            html += `
            <td>
            <i class="bi bi-arrow-up-square-fill text-success px-2 py-2 mx-3 border border-success" onclick='UstBirim(
                 "${arr[i].id}","${arr[i].aciklama}","${arr[i].fiyatTeklif}","${arr[i].tedarikciAd}","${arr[i].saTalepId}","${gizliId}")'></i>
            </td>
            <td>
            <i class="bi bi-x-square text-danger px-2 py-2 mx-3 border border-danger" onclick='Reddet(
                "${arr[i].id}","${arr[i].aciklama}","${arr[i].fiyatTeklif}","${arr[i].tedarikciAd}","${arr[i].saTalepId}","${gizliId}")'></i>
            </td>
            <td>
            `;
            html += `</tr>`
        }
        html += `</table></div>`;

        $("#divTalepTeklif").html(html);

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

function Sil(id) {
    Delete(`TedarikciTeklif/Sil?id=${id}`, (data) => {
        OnaylanmisTalepleriGetir();
    });
}

function Duzenle(id, aciklama, fiyatTeklif, tedarikciAd, saTalepId) {
    selectedId = id;
    $("#aciklama").val(aciklama);
    $("#fiyat").val(fiyatTeklif);
    $("#tad").val(tedarikciAd);
    $("#gizliId").val(saTalepId);
    $("#staticBackdrop1").modal("hide");
    $("#staticBackdrop").modal("show");
}

function Reddet(id, aciklama, fiyatTeklif, tedarikciAd, saTalepId,gizliId) {
    var teklif = {
        Id: id,
        Aciklama: aciklama,
        FiyatTeklif: fiyatTeklif,
        TedarikciAd: tedarikciAd,
        SATalepId: saTalepId,
        OnayDurum: 0

    };
    Post("TedarikciTeklif/Kaydet", teklif, (data) => {
        OnaylanmisTalepleriGetir();
        TalepTeklifleriniGetir(gizliId);
    });
}

function UstBirim(id, aciklama, fiyatTeklif, tedarikciAd, saTalepId,gizliId) {
    var teklif = {
        Id: id,
        Aciklama: aciklama,
        FiyatTeklif: fiyatTeklif,
        TedarikciAd: tedarikciAd,
        SATalepId: saTalepId,
        OnayDurum: 2

    };
    Post("TedarikciTeklif/Kaydet", teklif, (data) => {
        OnaylanmisTalepleriGetir();
        TalepTeklifleriniGetir(gizliId);
    });
}

function TumParaBirimleriGetir() {
    Get("Currency/GetAll", (data) => {
        var getdata = data;
        var dropdown = $("#paraBirim");
        $.each(getdata, function (index, para) {
            dropdown.append($("<option>").val(para.id).text(para.name));
        });
    });
}

function TumTedarikcileriGetir() {
    Get("Supplier/GetAll", (data) => {
        var getdata = data;
        var dropdown = $("#tad");
        $.each(getdata, function (index, sirket) {
            dropdown.append($("<option>").val(sirket.id).text(sirket.name));
        });
    });
}


$(document).ready(function () {
    // Sayfa yüklendiğinde mevcut şirket verilerini getir
    TumSirketleriGetir();
    OnaylanmisTalepleriGetir();
    TumParaBirimleriGetir();
    TumTedarikcileriGetir();
    // Select değişiklik olayını dinle
    $("#girisSirketId").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        OnaylanmisTalepleriGetir();
    });
});