<h2 align="center">
    <img alt="Proffy" title="#Proffy" src=".github/logo.png" width="350px" />
</h2>
  
<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Gabrielpdev/Proffy?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/Gabrielpdev/Proffy">

  	
  <a href="https://www.linkedin.com/in/gabriel-pereira-oliveira-78b1801ab/">
    <img alt="Made by Gabrielpdev" src="https://img.shields.io/badge/made%20by-Gabrielpdev-%2304D361">
  </a>
	
  
  <a href="https://github.com/Gabrielpdev/Proffy/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Gabrielpdev/Proffy">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
   <a href="https://github.com/Gabrielpdev/Proffy/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/Gabrielpdev/Proffy?style=social">
  </a>
</p>

<h2 align="center">
    <img alt="Proffy" title="#Proffy" src=".github/Proffy-responsivo.png" width="350px" />
</h2>


## 📝 Conteúdo
<p align="center">
<a href="#about">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#getting_started">Iniciando</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#built_using">Tecnologias Utilizadas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#roadmap">Metas de desenvolvimento</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#contribute">Como contribuir</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>


## 🧐 Sobre <a name = "about"></a>

Proffy é uma Aplicação feita durante a **NWL 2.0** oferecido pela [Rocketseat] :rocket:.<br/> 
A aplicação visa estabelecer um contato entre alunos e professores. O professor ao se cadastrar, informa a matéria que deseja dar aula, os dias disponíveis e horários.
Após isso os alunos podem encontrar esse professor buscando a matéria, dia e hora que batem com a do professor cadastrado.<br/> 


<span align="center">
	<h2>Desktop</h2>
	<img alt="Proffy" title="#Proffy" src=".github/proffy.gif" width="680px"  />
	<img alt="Proffy" title="#Proffy" src=".github/proffy-tablet.gif" height="300px" margin="10px" />
</span>

<span align="center">
	<h2>Mobile</h2>
	<img alt="Proffy" title="#Proffy" src=".github/mobile.gif" height="300px" />
</span>

## 🏁 Iniciando <a name = "getting_started"></a>

Instruções de como acessar as rotas e instalação.

### ⚒ Instalando <a name = "installing"></a>

```
# É necessário ter o docker na sua máquina

git clone https://github.com/Gabrielpdev/Proffy.git

# Go into the backend repository

$ cd Proffy
$ cd backend
yarn

# Configure seu .env baseado no .env.example
# Configure seu .ormconfig.json baseado no .ormconfig.example.json
$ yarn typeorm migration:run
$ yarn start
# server inicializado

# 💻 Iniciando com o Front-end
$ cd web
$ yarn
$ yarn start

# 📱 Iniciando com o Mobile

$ cd mobile
$ yarn
$ yarn start
```

## ⛏️ Tecnologias Utilizadas <a name = "built_using"></a>

As seguintes ferramentas foram usadas na construção do projeto:
- 🔵 [TypeScript][typescript]
- 🟢 [Node Js][nodejs]
- 🔴 [Redis][redis]
- ⚙ [TypeORM][typeorm]
- 🐘 [Postgres][postgres]
- 👄 [Handlebars][handlebars]
- 📷 [Expo Image Picker][image-picker]
- ⚛️ [React][reactjs]
- ⚛️ [React Native][reactNative]
- 🔼 [Expo][expo]
- 💅 [Styled-components][styled-components]

## 👨‍💼 Metas de desenvolvimento <a name = "roadmap"></a>

- Desenvolver o sistema de cadastro/login de usuário.
- Desenvolver o sistema de cadastro de professores.
- Desenvolver o sistema de filtro de professores por dia-materia-hora.
- Desenvolver o sistema de conexão entre alunos e professores.
- Desenvolver o sistema de alteração de dados do usuario.

## 🤔 Como contribuir <a name = "contribute"></a>

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Feito com ❤️ por Gabriel Pereira 👋🏽 [Entre em contato!](https://www.linkedin.com/in/gabriel-pereira-oliveira-78b1801ab/)

[expo]: https://expo.io/
[image-picker]: https://docs.expo.io/versions/latest/sdk/imagepicker/
[handlebars]: https://handlebarsjs.com/
[postgres]: https://www.postgresql.org/
[typeorm]: https://typeorm.io/#/
[nodejs]: https://nodejs.org/en/
[redis]: https://redis.io/
[typescript]: https://www.typescriptlang.org/
[reactjs]: https://reactjs.org
[reactNative]: https://reactnative.dev/
[rs]: https://rocketseat.com.br
[Rocketseat]:https://github.com/Rocketseat
[styled-components]:https://styled-components.com/


