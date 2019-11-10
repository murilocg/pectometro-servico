# passa-palavra-servico

## Requirements

- NodeJS versão mais atual
- Docker versão mais atual

## Comece a desenvolver

*Certifique-se que você possui os requisitos necessários descritos acima.

- Na raiz do projeto execute o seguinte comando para iniciar o postgres
    `docker-compose -f stack.yml up`
- Antes de iniciar a aplicação, instale as dependências com o comando
    `npm install`
- Agora apenas inicie com o commando
    `npm start`

Teste a aplicação acessando a url http://localhost:3000/users/1. Caso receba a mensagem
"Usuário não encontrado" a aplicação iniciou corretamente.