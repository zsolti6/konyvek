window.addEventListener("load", () => {
        get();
});

function get(){
        document.getElementById("focim").innerHTML = "Könyvek";
        document.getElementById("tartalom").innerHTML = "";
        fetch("http://localhost:5000/Konyv") // ??
        .then(function(datas) {
                return datas.json();
        })
        .then(function(datas) {
                datas.forEach(data => {
                        document.getElementById("tartalom").innerHTML += ujKartya(data);
                });
        })
}

function ujKartya(data){
        let kartya = 
        `<div class="card kartya" style="width: 18rem;">
                <div class="card-body">
                        <h5 class="card-title">Könyv neve: ${data.nev}</h5>
                        <p class="card-text">
                        Kiadás éve: ${data.kiadasEve}<br>
                        Értékelés: ${data.ertekeles}</p>
                        <img src="${data.kepneve}"/>
                        <br>
                        <a href="#" class="btn btn-primary" onclick="putKartyaSetup(${data.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                      </svg></a>
                        <a href="#" class="btn btn-primary" onclick="deleteKartya(${data.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                      </svg></a>
                </div>
        </div>`;

        return kartya;
}

function deleteKartya(id){
        fetch("http://localhost:5000/Konyv/" + id, {
                method: "DELETE",
                headers: {
                'Content-Type': 'application/json'
        }
        }).then(function() {
                location.reload()
        }).catch(error => {
                console.error('Hiba történt a kérés során:', error);
                alert('Hiba történt az adatok lekérése közben.');
        });
}

function putKartyaSetup(id){
        document.getElementById("focim").innerHTML = "Adatok módositása";
        fetch("http://localhost:5000/Konyv/" + id)
        .then(function(datas) {
                return datas.json();
        })
        .then(function(data) {
                document.getElementById('tartalom').innerHTML = 
                `<div class="form-group" id="adatok">
                        <label for="nev">Név:</label>
                        <input type="text" class="form-control" id="nev" value="${data.nev}" placeholder="Fairy Tail 12.">
                        <label for="kiadas">Kiadás éve:</label>
                        <input type="text" class="form-control" id="kiadas" value="${data.kiadasEve}" placeholder="2010">
                        <label for="ertekeles">Értékelés:</label>
                        <input type="number" class="form-control" id="ertekeles" value="${data.ertekeles}" placeholder="5">
                        <label for="kepneve">Kép neve:</label>
                        <input type="url" class="form-control" id="kepneve" value="${data.kepneve}" placeholder="https://s01.static.libri.hu/cover/32/c/10494950_4.jpg">
                        <input type="button" id="ujGomb" class="btn btn-primary" onclick="putKartya(${data.id})" value="Könyv módosítása">
                </div>`;
        }).catch(error => {
                console.error('Hiba történt a kérés során:', error);
                alert('Hiba történt az adatok lekérése közben.');
        });
}

function putKartya(id){
        if(hibasadat()){
                alert("Hiányzó adat!");
                return;
        }

        let bodyForPut = JSON.stringify({
                id: id,
                nev: document.getElementById("nev").value,
                kiadasEve: parseInt(document.getElementById("kiadas").value),
                ertekeles: parseInt(document.getElementById("ertekeles").value),
                kepneve: document.getElementById("kepneve").value
        });
        console.log(bodyForPut);
        fetch("http://localhost:5000/Konyv/" + id, {
                method: "PUT",
                body: bodyForPut,
                headers: {
                        'Content-Type': 'application/json'
                }
        }).then(function() {
                location.reload()
        }).catch(error => {
                console.error('Hiba történt a kérés során:', error);
                alert('Hiba történt az adatok lekérése közben.');
        });
}

function hibasadat(){
        console.log(helyeslink(document.getElementById("kepneve").value));
        return document.getElementById("nev").value == "" || 
        document.getElementById("kiadas").value == "" || 
        document.getElementById("ertekeles").value == "" || 
        document.getElementById("kepneve").value == "" ||
        //!helyeslink(document.getElementById("kepneve").value) || //nem jottem ra hogy mi a baj
        parseInt(document.getElementById("ertekeles").value) < 1 || 
        parseInt(document.getElementById("ertekeles").value) > 5 ||
        parseInt(document.getElementById("kiadas").value) > 2024;
}

function ujkonyvMenu(){
        document.getElementById('tartalom').innerHTML = 
                `<div class="form-group" id="adatok">
                        <label for="nev">Név:</label>
                        <input type="text" class="form-control" id="nev" placeholder="Fairy Tail 12.">
                        <label for="kiadas">Kiadás éve:</label>
                        <input type="text" class="form-control" id="kiadas" placeholder="2010">
                        <label for="ertekeles">Értékelés:</label>
                        <input type="number" class="form-control" id="ertekeles" placeholder="5">
                        <label for="kepneve">Kép neve:</label>
                        <input type="url" class="form-control" id="kepneve" placeholder="https://s01.static.libri.hu/cover/32/c/10494950_4.jpg">
                        <input type="button" id="ujGomb" class="btn btn-primary" onclick="ujkonyv()" value="Könyv hozzáadása">
                </div>`;
}

function ujkonyv(){
        if(hibasadat()){
                alert("Hiányzó adat!");
                return;
        }
        let adatok = JSON.stringify({
                nev: document.getElementById("nev").value,
                kiadasEve: parseInt(document.getElementById("kiadas").value),
                ertekeles: parseInt(document.getElementById("ertekeles").value),
                kepneve: document.getElementById("kepneve").value
        });

        fetch("http://localhost:5000/Konyv/",{
                method: "POST",
                body: adatok,
                headers: {
                        'Content-Type': 'application/json'
                },
        })
        .then((res) => {
        if(res) {
                return fetch("http://localhost:5000/Konyv/");
        }
        })
        .then((res) => res.json())
        .then((datas) => {
                location.reload();
                console.log(datas);
                for (const data of datas) {
                //document.getElementById("datas").innerHTML += data.name + " " + data.location + "<br>";
        }
        });
}

function helyeslink(url) {
        var eredmeny;
        var image = new Image();
        image.onload = function() {
                if (this.width > 0) {
                        eredmeny =  true;
                }
        }
        image.onerror = function() {
                eredmeny =  false;
        }
        image.src = url;
        return eredmeny;
}