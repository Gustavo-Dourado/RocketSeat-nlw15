let participantes = [
    { 
        nome: "Caio Dourado",
        email: "caio.dourado@yahoo.com.br",
        dataInscricao: new Date('04/28/2024 10:00'),
        dataCheckIn: new Date('02/05/2024 16:30') 
    },
    { 
        nome: "Gustavo Nascimento",
        email: "gusta.nascimento@gmail.com",
        dataInscricao: new Date('04/29/2024 11:15'), 
        dataCheckIn: new Date('05/02/2024 17:23') 
    },
    { 
        nome: "Fernanda Silva",
        email: "fernanda.silva@hotmail.com",
        dataInscricao: new Date('04/30/2024 09:45'), 
        dataCheckIn: null 
    },
    { 
        nome: "Lucas Oliveira",
        email: "lucas.oliveira@gmail.com",
        dataInscricao: new Date('04/30/2024 15:20'), 
        dataCheckIn: new Date('05/02/2024 09:30') 
    },
    { 
        nome: "Ana Santos",
        email: "ana.santos@yahoo.com",
        dataInscricao: new Date('05/01/2024 08:10'), 
        dataCheckIn: new Date('05/02/2024 12:45') 
    },
    { 
        nome: "Pedro Carvalho",
        email: "pedro.carvalho@gmail.com",
        dataInscricao: new Date('05/01/2024 13:55'), 
        dataCheckIn: null 
    },
    { 
        nome: "Juliana Lima",
        email: "juliana.lima@hotmail.com",
        dataInscricao: new Date('05/02/2024 10:30'), 
        dataCheckIn: new Date('05/02/2024 15:10') 
    },
    { 
        nome: "Rafael Souza",
        email: "rafael.souza@yahoo.com",
        dataInscricao: new Date('05/02/2024 12:20'), 
        dataCheckIn: null 
    },
    { 
        nome: "Mariana Oliveira",
        email: "mariana.oliveira@gmail.com",
        dataInscricao: new Date('05/02/2024 14:40'), 
        dataCheckIn: new Date('05/02/2024 17:50') 
    },
    { 
        nome: "Bruno Costa",
        email: "bruno.costa@gmail.com",
        dataInscricao: new Date('05/02/2024 17:00'), 
        dataCheckIn: new Date('05/02/2024 20:30') 
    }
];

const criarNovoParticipante = (participante) =>{

    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn);

    if(participante.dataCheckIn == null){

        dataCheckIn = `
        <button
            data-email="${participante.email}"
            onclick= "fazerCheckIn(event)"
        >
            Confirmar Check-In
        </button>
        `
    } 

    return `
    <tbody>
        <tr>
            <td>
                <strong>${participante.nome}</strong>
                <br>
                <small>${participante.email}</small>
            </td>
            <td>${dataInscricao}</td>
            <td>${dataCheckIn}</td>
        </tr>
    </tbody>
    `  
}

const atualizarLista = (participantes) =>{
    let output ="";
        for (let participante of participantes){
            output = output + criarNovoParticipante(participante)
        }

    let tbody = document.getElementById("dados-tabela");
    tbody.innerHTML = output;
}

atualizarLista(participantes);

const adicionarParticipante = (event) =>{
    event.preventDefault()

    const dadosFormulario = new FormData(event.target)

    const participante = {
        nome: dadosFormulario.get("nome"),
        email: dadosFormulario.get("e-mail"),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    //Verificar se o email já foi cadastrado
    const participanteExiste = participantes.find( (p) => p.email == participante.email)

    if(participanteExiste){
        alert("Email já cadastrado!")
        return
    }

    participantes = [participante, ...participantes];
    atualizarLista(participantes);

    //limpar o formulário
    event.target.querySelector('[name="nome"]').value ="";
    event.target.querySelector('[name="e-mail"]').value = "";
}

const fazerCheckIn = (event) =>{

    const mensagemConfirmacao = "Tem certeza que deseja realizar o check-in?"

    if(confirm(mensagemConfirmacao) == false){
        return;
    }

    
    //Encontrar o participante dentro da lista
    const participante = participantes.find((p) => p.email == event.target.dataset.email) //Eliminando as chaves e a palavra return
    //Atualizar o check-in do participante
    participante.dataCheckIn = new Date()

    //Atualizar a lista dos participantes
    atualizarLista(participantes)
}