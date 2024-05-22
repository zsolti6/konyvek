window.addEventListener("load", () => {
        get();
});

function get(){
        fetch("http://localhost:7017/Konyv") // ?? nem mukodik
        .then(function(datas) {
                return datas.json();
        })
        .then(function(datas) {
                console.log(datas);
        })
}
