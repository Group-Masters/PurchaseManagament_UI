﻿
var BASE_API_URI = "https://localhost:7064";

function Get(action, success) {
    $.ajax({
        type: "GET",
        url: `${BASE_API_URI}/${action}`,
        //beforeSend: function (xhr) {
        //    xhr.setRequestHeader('Authorization', `Bearer ${TOKEN}`);
        //},
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            if (response.success) {
                success(response.data);
            }
            else {
                alert(response.message);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest + "-" + textStatus + "-" + errorThrown);
        }
    });
}

function Post(action, data, success, ask = true) {
    var confirmed = true;
    if (ask) {
        confirmed = confirm("İşlemi gerçekleştirmek istediğinize emin misiniz?");
    }
    if (confirmed) {
        $.ajax({
            type: "POST",
            url: `${BASE_API_URI}/${action}`,
            //beforeSend: function (xhr) {
            //    xhr.setRequestHeader('Authorization', `Bearer ${TOKEN}`);
            //},
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function (response) {
                if (response.success) {
                    success(response.data);
                }
                else {
                    alert(response.message);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest + "-" + textStatus + "-" + errorThrown);
            }
        });
    }
}

//function Post(action, data, success, ask = true) {
//    var confirmed = true;
//    if (ask) {
//        confirmed = confirm("İşlemi gerçekleştirmek istediğinize emin misiniz?");
//    }
//    if (confirmed) {
//        $.ajax({
//            type: "POST",
//            url: `${BASE_API_URI}/${action}`,
//            //beforeSend: function (xhr) {
//            //    xhr.setRequestHeader('Authorization', `Bearer ${TOKEN}`);
//            //},
//            dataType: "json",
//            contentType: "application/json; charset=utf-8",
//            data: JSON.stringify(data),
//            success: function (response) {
//                if (response.success) {
//                    success(response.data);
//                }
//                else {
//                    alert(response.errors);
//                }
//            },
//            error: function (xhr, status, error) {
//                var errorMessage = JSON.parse(xhr.responseText);
//                if (errorMessage && errorMessage.errors) {
//                    var errorString = errorMessage.errors.join(", ");
//                    alert(errorString);
//                } else {
//                    alert("An unknown error occurred.");
//                }
//            }
//        });
//    }
//}

function Delete(action, success, ask = true) {
    var confirmed = true;
    if (ask) {
        confirmed = confirm("Kaydı silmek istediğinizden emin misiniz?");
    }
    if (confirmed) {
        $.ajax({
            type: "DELETE",
            url: `${BASE_API_URI}/${action}`,
            //beforeSend: function (xhr) {
            //    xhr.setRequestHeader('Authorization', `Bearer ${TOKEN}`);
            //},
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response.success) {
                    success(response.data);
                }
                else {
                    alert(response.message);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest + "-" + textStatus + "-" + errorThrown);
            }
        });
    }
}

var girisSirketId = $("#girisSirketId").val();
function TumSirketleriGetir() {
    Get("Sirket/TumSirketler", (data) => {
        var sirketdata = data;
        var dropdown = $("#girisSirketId");
        $.each(sirketdata, function (index, sirket) {
            dropdown.append($("<option>").val(sirket.id).text(sirket.ad));
        });
    });
}
