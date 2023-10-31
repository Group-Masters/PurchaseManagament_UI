function OnaylanmisTalepleriGetir() {
    var girisSirketId = $("#girisSirketId").val();
    var html = ``;
    Get(`TedarikciTeklif/OnaylanmisTekliflerYonetim/${girisSirketId}`, (data) => {
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
            ${arr[i].id} ${arr[i].kullaniciAd} ${arr[i].kullaniciSoyad}
            <span class="position-absolute top-25 end-50" style="color:  ${arr[i].onayDurum === 2 ? 'Blue' : arr[i].onayDurum === 0 ? 'Red' : arr[i].onayDurum === 1 ? 'Green' : 'Gray'};">
                ${arr[i].onayDurum === 2 ? 'Onay Bekliyor' : arr[i].onayDurum === 0 ? 'Reddedildi' : arr[i].onayDurum === 1 ? 'Onaylandı' : 'Geçersiz Durum'}
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
                  <th scope="col">·</th>
                  <th class="position-absolute top-0 end-0" scope="col">
                  <span class="">
                    <i class="bi bi-check-square-fill text-success px-2 py-2 mx-3 border border-success" onclick='Onayla(
                 "${arr[i].id}","${arr[i].aciklama}","${arr[i].fiyatTeklif}","${arr[i].tedarikciAd}","${arr[i].saTalepId}")'></i>
                  </span>
                  <span class="">
                    <i class="bi bi-x-square text-danger px-2 py-2 mx-3 border border-danger" onclick='Reddet(
                "${arr[i].id}","${arr[i].aciklama}","${arr[i].fiyatTeklif}","${arr[i].tedarikciAd}","${arr[i].saTalepId}")'></i>
                  </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Tedarikçi Adı :</th>
                  <td>${arr[i].tedarikciAd}</td>
                </tr>
                <tr>
                  <th scope="row">Ürün Adı :</th>
                  <td>${arr[i].urunAd}</td>
                </tr>
                <tr>
                  <th scope="row">Adet Bilgisi :</th>
                  <td>${arr[i].adet}</td>
                </tr>
                <tr>
                  <th scope="row">Fiyat Teklifi :</th>
                  <td>${arr[i].fiyatTeklif} ₺</td>
                </tr>
                <tr>
                  <th scope="row">Açıklama :</th>
                  <td>${arr[i].aciklama}</td>
                </tr>
                <tr>
                  <th scope="row">Talep Eden Birim :</th>
                  <td>${arr[i].birimAd}</td>
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
function Onayla(id, aciklama, fiyatTeklif, tedarikciAd, saTalepId) {
    var teklif = {
        Id: id,
        Aciklama: aciklama,
        FiyatTeklif: fiyatTeklif,
        TedarikciAd: tedarikciAd,
        SATalepId: saTalepId,
        OnayDurum: 1

    };
    Post("TedarikciTeklif/Kaydet", teklif, (data) => {
        OnaylanmisTalepleriGetir();
    });
}

function Reddet(id, aciklama, fiyatTeklif, tedarikciAd, saTalepId) {
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
