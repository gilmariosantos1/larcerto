const { Pessoa, Login, Pet, Localizacao, Doacao, Mensagem } = require('./models');
const bcrypt = require('bcryptjs');

async function seed() {
    console.log('Criando dados de teste Supreme...');
    
    const hashDoador = await bcrypt.hash('123456', 10);
    const hashAdotante = await bcrypt.hash('123456', 10);

    const p1 = await Pessoa.create({ Nome: 'Ana Silva', Telefone: '11999999999', Perfil: 'Doador' });
    await Login.create({ email: 'doador@teste.com', senha: hashDoador, idPessoa: p1.idPessoa });

    const p2 = await Pessoa.create({ Nome: 'Carlos Adotante', Telefone: '11888888888', Perfil: 'Adotante' });
    await Login.create({ email: 'adotante@teste.com', senha: hashAdotante, idPessoa: p2.idPessoa });

    const loc = await Localizacao.create({ Cidade: 'São Paulo', Estado: 'SP' });

    const pet = await Pet.create({
        Nome: 'Rex', Tipo: 'cao', Porte: 'G', Genero: 'Macho', Idade: '3 anos',
        Descricao: 'Cachorrão muito amigável.', Status: 'disponivel', 
        idDoador: p1.idPessoa, idLocal: loc.idLocal
    });

    const doacao = await Doacao.create({
        idPet: pet.idPet, idAdotante: p2.idPessoa, Status: 'pendente', DataSolicitacao: new Date()
    });

    await Mensagem.create({
        idDoacao: doacao.idDoacao, idRemetente: p2.idPessoa, Texto: 'Olá! Me apaixonei pelo Rex. Gostaria muito de adotá-lo!', DataHora: new Date()
    });

    console.log('Seed completo ✅');
    process.exit();
}

seed();
