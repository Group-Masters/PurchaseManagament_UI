function KullaniciGetir() {
    var html = ``;
    var girisSirketId = $("#girisSirketId").val();
    Get(`Kullanici/KullaniciTamBilgilerBySirketId/${girisSirketId}`, (data) => {
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
            ${arr[i].id} ${arr[i].ad} ${arr[i].soyad}
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
                  <th scope="col">#</th>
                  <th scope="col">#</th>
                  <th scope="col">
                  <button class="btn btn-link position-absolute top-0 end-0">
                   <i class="bi bi-pencil-square text-light px-2 py-2 mx-2 mt-4 border border-light" onclick='KullaniciDuzenle(
                        ${arr[i].id},"${arr[i].birimId}","${arr[i].acikAdres}","${arr[i].ad}","${arr[i].soyad}","${arr[i].sifre}","${arr[i].telNo}","${arr[i].tcKimlikNo}","${arr[i].eposta}","${arr[i].aktifMi}","${arr[i].sirketId}"
                   )'></i>
                  </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Parola :</th>
                  <td>${arr[i].sifre}</td>
                </tr>
                <tr>
                  <th scope="row">Çalışan Şirketi :</th>
                  <td>${arr[i].sirketAd}</td>
                </tr>
                <tr>
                  <th scope="row">Birimi :</th>
                  <td>${arr[i].birimAd}</td>
                </tr>
                 <tr>
                  <th scope="row">Şirket Rolü :</th>
                  <td>${arr[i].rolAd}</td>
                </tr>
                <tr>
                  <th scope="row">Mail Adres :</th>
                  <td>${arr[i].eposta}</td>
                </tr>
                <tr>
                  <th scope="row">Tel No :</th>
                  <td colspan="2">${arr[i].telNo}</td>
                </tr>
                <tr>
                  <th scope="row">Tc Kimlik No :</th>
                  <td colspan="2">${arr[i].tcKimlikNo}</td>
                </tr>
                <tr>
                  <th scope="row">Aktiflik Durumu</th>
                  <td colspan="2">
                    <span style="color: ${arr[i].aktifMi ? 'green' : 'red'};">
                         ${arr[i].aktifMi ? 'Aktif' : 'Pasif'}
                     </span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Açık Adres :</th>
                  <td colspan="2">${arr[i].acikAdres}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`;

        }
        $("#divKullanici").html(html);

        $("#ara").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#divKullanici .accordion").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });

    });
}

function KullaniciGetirDeneme() {
    var html = ``;
    var girisSirketId = $("#girisSirketId").val();
    Get(`Kullanici/KullaniciTamBilgilerBySirketId/${girisSirketId}`, (data) => {
        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);

        html += `<table class="table align-middle mb-0 bg-white" style="border-radius:35px;">
  <thead class="bg-light">
    <tr>
      <th>Ad - Soyad</th>
      <th>Şirket - Birim</th>
      <th>Kimlik - Telefon</th>
      <th>Pozisyon</th>
      <th>Durum</th>
      <th>İşlemler</th>
    </tr>
  </thead>
  <tbody>`;

        for (var i = 0; i < arr.length; i++) {
            html += `
    <tr class="searchTable">
      <td>
        <div class="d-flex align-items-center">
          <h4 class="p-1">${arr[i].id}</h4>
          <img
              src="https://mdbootstrap.com/img/new/avatars/6.jpg"
              alt=""
              style="width: 45px; height: 45px"
              class="rounded-circle"
              />
          <div class="ms-3">
            <p class="fw-bold mb-1">${arr[i].ad} ${arr[i].soyad} <i type="button" class="bi bi-geo-alt-fill" title="${arr[i].acikAdres}"> </i></p>
            <p class="text-muted mb-0">${arr[i].eposta}</p>
          </div>
        </div>
      </td>
      <td>
        <p class="fw-normal mb-1">${arr[i].sirketAd}</p>
        <p class="text-muted mb-0">${arr[i].birimAd}</p>
      </td>
      <td>
        <p class="fw-normal mb-1">${arr[i].tcKimlikNo}</p>
        <p class="text-muted mb-0">${arr[i].telNo}</p>
      </td>
      <td>${arr[i].rolAd}</td>
      <td>
        <span class="badge p-2 text-white badge-success rounded-pill d-inline" style="color: ${arr[i].aktifMi ? 'green' : 'red'};">
                                                                              ${arr[i].aktifMi ? 'Aktif' : 'Pasif'}
        </span>
      </td>
      <td>
        <button type="button" class="btn btn-link btn-sm btn-rounded">
          <i class="bi bi-pencil-square text-primary px-2 py-2 mx-2 mt-4 border border-primary" onclick='KullaniciDuzenle(
                        ${arr[i].id},"${arr[i].birimId}","${arr[i].acikAdres}","${arr[i].ad}","${arr[i].soyad}","${arr[i].sifre}","${arr[i].telNo}","${arr[i].tcKimlikNo}","${arr[i].eposta}","${arr[i].aktifMi}","${arr[i].sirketId}"
                   )'></i>
        </button>
      </td>
    </tr>
  `;

        }

        html += `</tbody></table>`;

        $("#divKullaniciDeneme").html(html);

        

        $("#ara").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#divKullaniciDeneme .searchTable").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });

    });
}



let selectedId = 0;

function YeniKullanici() {
    selectedId = 0;
    $("#ad").val("");
    $("#soyad").val("");
    $("#mailAdress").val("");
    $("#parola").val("");
    $("#telNo").val("");
    $("#tcNo").val("");
    $("#acikAdres").val("");
    $("#staticBackdrop").modal("show");
}

function KullaniciKaydet() {
    var kullanici = {
        Id: selectedId,
        BirimId: $("#birimAd").val(),
        AcikAdres: $("#acikAdres").val(),
        Ad: $("#ad").val(),
        Soyad: $("#soyad").val(),
        Sifre: $("#parola").val(),
        TelNo: $("#telNo").val(),
        TcKimlikNo: $("#tcNo").val(),
        SirketId: $("#sirketAd").val(),
        Eposta: $("#mailAdress").val(),
        AktifMi: $("#aktifMi").val()
    };

    Post("Kullanici/Kaydet", kullanici, (data) => {
        KullaniciGetirDeneme();
        $("#staticBackdrop").modal("hide");
    });
}

function KullaniciDuzenle(id, birimId, acikAdres, ad, soyad, sifre, telNo, tcKimlikNo, aktifMi, eposta, sirketId) {
    selectedId = id;
    $("#birimAd").val(birimId);
    $("#sirketAd").val(sirketId);
    $("#acikAdres").val(acikAdres);
    $("#ad").val(ad);
    $("#soyad").val(soyad);
    $("#parola").val(sifre);
    $("#telNo").val(telNo);
    $("#tcNo").val(tcKimlikNo);
    $("#mailAdress").val(aktifMi);
    $("#aktifMi").val(eposta);
    $("#staticBackdrop").modal("show");
}

function TumBirimleriGetir() {
    Get("Birim/TumBirimler", (data) => {
        var birimdata = data;
        var dropdown = $("#birimAd");
        $.each(birimdata, function (index, birim) {
            dropdown.append($("<option>").val(birim.id).text(birim.ad));
        });
    });
}

function SirketleriGetir() {
    Get("Sirket/TumSirketler", (data) => {
        var sirketdata = data;
        var dropdown = $("#sirketAd");
        $.each(sirketdata, function (index, sirket) {
            dropdown.append($("<option>").val(sirket.id).text(sirket.ad));
        });
    });
}


$(document).ready(function () {
    // Sayfa yüklendiğinde mevcut şirket verilerini getir
    TumBirimleriGetir();
    TumSirketleriGetir();
    KullaniciGetir();
    KullaniciGetirDeneme();
    SirketleriGetir();
    // Select değişiklik olayını dinle
    $("#girisSirketId").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        KullaniciGetir();
        KullaniciGetirDeneme();
    });
});
