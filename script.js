window.addEventListener("load", () => {
        get();
});

function get(){
        fetch("http://localhost:5000/Konyv") // ??
        .then(function(datas) {
                return datas.json();
        })
        .then(function(datas) {
                datas.forEach(data => {
                        document.getElementById("kartyak").innerHTML += ujKartya(data);
                });
        })
}

function ujKartya(data){
        let kartya = 
        `<div class="card kartya" style="width: 18rem;">
                <div class="card-body">
                        <h5 class="card-title">${data.nev}</h5>
                        <p class="card-text">
                        Kiadás éve: ${data.kiadasEve}<br>
                        Értékelés: ${data.ertekeles}</p>
                        <img src="${data.kepneve}"/>
                        <a href="#" class="btn btn-primary" onclick="putKartyaSetup(${data.id})">Módosítás</a>
                        <a href="#" class="btn btn-primary" onclick="deleteKartya(${data.id})">Törlés</a>
                </div>
        </div>`

        return kartya;
}