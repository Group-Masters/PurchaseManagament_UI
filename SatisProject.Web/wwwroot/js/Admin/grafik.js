function ChartTop() {
    var html = ``;
    Get(`Chart/GetMainChart`, (data) => {
        /*var arr = data;*/

        html += `
                <div class="row bg-white text-black m-0" id="index">
        <div class="col-lg-3 col-6">

            <div class="small-box bg-info fw-bold rounded-1">
                <div class="inner fw-bold p-2">
                    <h3 class="fw-bold">${data.employeeCount}</h3>
                    <p class="text-white">Çalışan Sayısı</p>
                </div>
                <div class="icon rounded-1 text-center" style="backdrop-filter: brightness(0.5);">
                    <i class="ion ion-bag"></i>
                    <a href="#" class="small-box-footer text-white">Daha Fazla... <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-6">

            <div class="small-box bg-success fw-bold rounded-1">
                <div class="inner fw-bold p-2">
                    <h3 class="fw-bold">${data.requestCount}</h3>
                    <p class="text-white">Toplam Talep Sayısı</p>
                </div>
                <div class="icon rounded-1 text-center" style="backdrop-filter: brightness(0.5);">
                    <i class="ion ion-stats-bars"></i>
                    <a href="#" class="small-box-footer text-white">Daha Fazla... <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-6">

            <div class="small-box bg-warning fw-bold rounded-1">
                <div class="inner fw-bold p-2">
                    <h3 class="fw-bold">${data.totalPrice} TRY</h3>
                    <p class="text-white">Toplam Harcama</p>
                </div>
                <div class="icon rounded-1 text-center" style="backdrop-filter: brightness(0.5);">
                    <i class="ion ion-person-add"></i>
                    <a href="#" class="small-box-footer text-white">Daha Fazla... <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-6">

            <div class="small-box bg-danger fw-bold rounded-1">
                <div class="inner fw-bold p-2">
                    <h3 class="fw-bold">${data.companyCount}</h3>
                    <p class="text-white">Şirket Sayısı</p>
                </div>
                <div class="icon rounded-1 text-center" style="backdrop-filter: brightness(0.5);">
                    <i class="ion ion-pie-graph"></i>
                    <a href="#" class="small-box-footer text-white">Daha Fazla...<i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
        </div>

    </div>
                    `;


        html += `</tbody></table>`;

        $("#chartTop").html(html);
    });
}



function createBarChartFromAPI() {
    const endpoint = "departments"; // API endpoint'i burada belirtiliyor
    const canvasId = "dynamicCanvasId"; // Dinamik canvas ID'si
    GetAndCreateChart(endpoint, "bar", (response, chartType, canvasId) => {
        const departmentData = response.departmentData; // API'den gelen departman verileri

        const departmentNames = departmentData.map(department => department.name);
        const departmentValues = departmentData.map(department => department.value);

        const chartData = {
            labels: departmentNames,
            datasetLabel: '# of Votes',
            datasetValues: departmentValues // API'den alınan departman değerleri burada
        };
        createChart(chartData, chartType, canvasId);
    }, canvasId);
}

$(document).ready(function () {
    ChartTop();
});