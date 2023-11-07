﻿function KullaniciGetir() {
    var html = ``;
    var giriskullaniciId = $("#kullaniciGizliId").val();
    Get(`Employee/GetById/${giriskullaniciId}`, (data) => {
        /*var arr = data;*/

        html += `
            <div class="row gutters-sm">
        <div class="col-md-4 mb-3">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex flex-column align-items-center text-center pb-3">
                        <img src="${data.gender === 0 ? 'https://cdn2.iconfinder.com/data/icons/business-filled-outline-style-1-set-1/256/7-512.png' : 'https://cdn2.iconfinder.com/data/icons/business-filled-outline-style-1-set-1/256/4-256.png'}" alt="Admin" class="rounded-circle" style="user-select:none;" width="150">
                        <div class="mt-3">
                            <h4>${data.name} ${data.surname}</h4>
                            <p class="text-secondary mb-1">
                            ${data.roles}
                            </p>
                            <p class="text-muted font-size-sm">${data.address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0">Ad-Soyad</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                            ${data.name} ${data.surname}
                        </div>
                    </div>
                     <hr>
                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0">Email</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                            ${data.username}
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0">Email</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                            ${data.email}
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0">Telefon Numarası</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                            ${data.phone}
                        </div>
                    </div>
                     <hr>
                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0">TC Numarası</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                            ${data.idNumber}
                        </div>
                    </div>
                     <hr>
                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0">Departman Adı</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                            ${data.departmentName}
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0">Adres Bilgisi</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                            ${data.address}
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0">Doğum Yılı</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                            ${data.birthYear}
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-sm-12">
                            <button class="btn btn-primary" onclick='KullaniciDuzenle(${data.id},"${data.username}","${data.address}","${data.phone}","${data.email}","${data.isActive}")'>
                            Profili Güncelle</button>
                            <button class="btn btn-primary" onclick='SifreGuncelleOpen()'>
                            Şifremi Güncelle</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
                    `;


        html += `</tbody></table>`;

        $("#profile").html(html);
    });
}

function KullaniciDuzenle(id, username, address, phone, email, isActive) {
    $("#idG").val(id);
    $("#kullaniciAdiG").val(username);
    $("#acikAdresG").val(address);
    $("#telNoG").val(phone);
    $("#mailAdressG").val(email);
    $("#aktifG").val(isActive);
    $("#staticBackdrop").modal("show");
}

function Guncelle() {
    var kullanici = {
        EmployeeId: $("#idG").val(),
        Username: $("#kullaniciAdiG").val(),
        Address: $("#acikAdresG").val(),
        Phone: $("#telNoG").val(),
        Email: $("#mailAdressG").val(),
        IsActive: $("#aktifG").val() === "true" ? true : false
    };
    Put("Employee/Update", kullanici, (data) => {
        KullaniciGetir();
        $("#staticBackdrop").modal("hide");
    });
}

function SifreGuncelleOpen() {
    $("#eskiSifre").val("");
    $("#yeniSifre").val("");
    $("#yeniSifreTekrar").val("");
    $("#staticBackdrop1").modal("show");
}
function SifreGuncelle() {
    var kullanici = {
        Password: $("#eskiSifre").val(),
        NewPassword: $("#yeniSifre").val(),
        RepeateNewPassword: $("#yeniSifreTekrar").val(),
    };
    Put("Employee/UpdatePassword", kullanici, (data) => {
        KullaniciGetir();
        $("#staticBackdrop1").modal("hide");
    });
}

$(document).ready(function () {
    KullaniciGetir();
});