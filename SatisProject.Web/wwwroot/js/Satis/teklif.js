function OnaylanmisTalepleriGetir() {
    var girisSirketId = $("#girisSirketId").val();
    var html = ``;
    Get(`SatinAlmaTalep/OnaylanmisTalepler/${girisSirketId}`, (data) => {
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
            ${arr[i].id} ${arr[i].kullaniciAd} ${arr[i].soyad}
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
                  <td>${arr[i].adet}</td>
                </tr>
                <tr>
                  <th scope="row">Ürün Adı :</th>
                  <td>${arr[i].urunAd}</td>
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



let selectedId = 0;
function Kaydet() {
    var teklif = {
        Id: selectedId,
        Aciklama: $("#aciklama").val(),
        FiyatTeklif: $("#fiyat").val(),
        OnayDurum:null,
        SATalepId: $("#gizliId").val(),
        TedarikciAd: $("#tad").val()
    };
    Post("TedarikciTeklif/Kaydet", teklif, (data) => {
        $("#staticBackdrop").modal("hide");
    });
}


function IdVer(id) {
    selectedId = 0;
    $("#gizliId").val(id);
    $("#tad").val("");
    $("#fiyat").val("");
    $("#aciklama").val("");
    $("#staticBackdrop").modal("show");
    
}

function TalepTeklifleriniGetir(gizliId) {
    $("#staticBackdrop1").modal("show");
    Get(`TedarikciTeklif/TalebeGoreTeklif/${gizliId}`, (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover">` +
            `<thead class="text-light bg-black"><tr><th>Id</th><th>Tedarikci Adı</th><th>Fiyat Teklifi</th><th>Açıklama</th><th>Onay Durumu</th><th></th><th></th><th></th><th></th></tr></thead>`;

        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);
        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${arr[i].id}</td><td>${arr[i].tedarikciAd}</td><td>${arr[i].fiyatTeklif} ₺</td>
            <td>${arr[i].aciklama == null ? 'Açıklama Yok' : arr[i].aciklama}</td>
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