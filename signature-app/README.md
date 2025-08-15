O Signature App é um aplicativo web para capturar assinaturas de forma simples e prática.
O usuário pode ampliar a área de assinatura para facilitar a escrita e, depois, reduzir para exibição.
É ideal para casos onde seja necessário coletar assinaturas, como em formulários de triagem na área da saúde.

Estrutura do Projeto
signature-app
├── src
│   ├── index.html               # Página HTML principal
│   ├── styles
│   │   └── main.css             # Estilos CSS do app
│   ├── scripts
│   │   ├── app.js               # Funções principais do app
│   │   └── signature.js         # Lógica de captura da assinatura
│   └── components
│       └── signature-modal.html # Estrutura HTML do modal de assinatura
├── package.json                 # Configuração do npm
├── README.md                    # Documentação do projeto
└── signature-capture.md         # Detalhes sobre a função de captura de assinatura

Funcionalidades

Captura de Assinatura: clique no campo para ampliar e assinar com mais facilidade.

Layout Responsivo: uso do Bootstrap para adaptação em diferentes telas.

Geração de PDF: suporte para gerar PDFs com a assinatura coletada.

Como Usar

Clique no campo de assinatura para ampliar.

Assine e clique em Confirmar para reduzir e exibir no formato final.

A assinatura será processada e preparada para inclusão no PDF.

Como Configurar

Clonar o repositório:

git clone <repository-url>


Acessar a pasta do projeto:

cd signature-app


Instalar dependências:

npm install


Abrir o arquivo src/index.html no navegador.

Contribuição

Sugestões e melhorias são bem-vindas!
Abra uma issue ou envie um pull request.

Licença

Licenciado sob MIT License. Veja o arquivo LICENSE para mais detalhes.