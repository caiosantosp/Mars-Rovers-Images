$('#button_buscar').on("click", receberOsDados);

var contadorDeClique;
function receberOsDados() {

    if(contadorDeClique > 0){
        $("#cards").html("");
    }

    let recebeODia = $('#dia_informado').val();
    let recebeOMes = $('#input_mes_informado').val();
    let recebeOAno = $('#ano_informado').val();

    consultarImagensDaNasa(recebeODia, recebeOMes, recebeOAno);
}

const consultarImagensDaNasa = async (dia, mes, ano) => {
    urlFinal = `https://mars-photos.herokuapp.com/api/v1/rovers/curiosity/photos?earth_date=${ano}-${mes}-${dia}&api_key=DEMO_KEY`;

    const dados = await fetch(urlFinal)
    const dadosDaNasa = await dados.json();

    validarDadosRecebidos(dadosDaNasa);

    contadorDeClique=+1;
}

function validarDadosRecebidos(dadosRecebidos) {
    for (i = 0; i < 90; i += 1) {
        let linkDaImagem = dadosRecebidos.photos[i].img_src;
        let nomeDaCamera = dadosRecebidos.photos[i].camera.full_name;
        let nomeDoRover = dadosRecebidos.photos[i].rover.name;
        let dataDePouso = dadosRecebidos.photos[i].rover.landing_date;
        let idDoRover = dadosRecebidos.photos[i].id;

        alteraHtmlComDados(linkDaImagem, nomeDaCamera, nomeDoRover, dataDePouso, idDoRover);
    }


}

function alteraHtmlComDados(linkDaImagem, nomeDaCamera, nomeDoRover, dataDePouso, idDoRover) {

    $("#cards").append(`
    <div class="col-md-4">
    <div class="card mb-4 shadow-sm">
        <img id="imagem_da_card" style="height: 12rem" class="card-img-top img-fluid" src='${linkDaImagem}' alt="Imagem">
        <div class="card-body">
            <div class="row">
                <div class="col-md-6">
                    <label>
                        <strong>Nome do Rover: </strong>
                        <p>${nomeDoRover}</p>
                    </label>
                </div>
                <div class="col-md-6">
                    <label>
                        <strong>ID: </strong>
                        <p>${idDoRover}</p>
                    </label>
                </div>
                <div class="col-md-6">
                    <label>
                        <strong>Câmera: </strong>
                        <p>${nomeDaCamera}</p>
                    </label>
                </div>
                <div class="col-md-6">
                    <label>
                        <strong>Data de pouso: </strong>
                        <p>${dataDePouso}</p>
                    </label>
                </div>
            </div>
        </div>
    </div>
</div>
    `);



}