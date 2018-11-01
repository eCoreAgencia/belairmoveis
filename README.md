# VTEX Template: Original.io

Boilerplate de projeto Original.io para VTEX.

## Iniciando um novo projeto

Requisitos:

- Node.js
- NPM

## Instruções para iniciar um novo projeto

###### :warning::warning::warning: Veja bem, jovem... no caso de você estar criando um novo projeto, deve-se seguir, além destas, as instruções que aparecerão na sua tela assim que rodar `npm run start`. :warning::warning::warning:


#### 1. Inicie o Git Flow
Execute o comando `git flow init` e aceite as sugestões de nomenclatura de branches padrão.
A partir de agora, seu projeto tem o seguinte modelo de branches:

![alt Branches](https://leanpub.com/site_images/git-flow/git-workflow-release-cycle-4maintenance.png "Estrutura de versionamento de acordo com o Git Flow")

#### 2. `npm install` ou equivalente.

#### 3. Scripts

##### Start
Para desenvolvimento local, execute: `npm run start`.

##### Build
Para gerar os arquivos finais, execute: `npm run build`.

##### Deploy
Para publicar o template diretamente no portal da VTEX, rode  `npm run deploy`. Copie o cookie `VtexIdclientAuthCookie` do navegador referente à loja em questão.

*Obs: deve-se estar logado para obter este cookie.*

### Pug

##### Novas rotas
Todo arquivo `.pug` criado sob o diretório `src/pug/templates` cria uma nova rota html de mesmo nome.
Por exemplo: `src/pug/templates/produto.pug` criará a rota `localhost:8080/produto.html`.

1. *Para cada nova rota criada, o ambiente deve ser reiniciado, caso já esteja sendo exeutado.*
2. *Modificações nos arquivos Pug não estão sujeitas a _Hot Module Replacement_. Deve-se forçar o refresh da página a cada modificação dos arquivos.*

### Adicionando polyfills
Polyfills devem ser adicionados no arquivo `config/polyfills.js`, pois ele é importado antes de todo o código do projeto.

### Deploy
Todos os arquivos em `src/pug/templates`, `src/pug/subtemplates` e `src/pug/shelves`, serão compilados para pastas de mesmo nome. Após compilados, quando submetidos ao deploy, cada html será salvo na loja como seu respectivo tipo (ex.: shelf, subtemplate ou template).
Para ignorar um arquivo html na publicação, existem dois métodos:

* Criar um novo diretório, por exemplo, `src/pug/components`.
* Inserir um `_` na frente do nome do arquivo, por exemplo, `_busca-por-estampa.pug`.


### Troubleshooting

## Particularidades do projeto :pencil:
#### Tamanho das imagens
* Imagem Produto Principal - Xpx x Ypx
* Imagem Produto Thumb - Xpx x Ypx
* Imagem Produto Giga - Xpx x Ypx
* Imagem Produto Vitrine Grande - Xpx x Ypx
* Imagem Produto Vitrine Média - Xpx x Ypx
* Imagem Produto Vitrine Pequena - Xpx x Ypx
* Imagem Produto Zoom - Xpx x Ypx

![alt Original](https://originalmedia.vteximg.com.br/arquivos/rsz_logo-originaltx.png "Original.io")
