# Programação de Aplicativos em C# — material autoinstrucional

Site estático para uma **UC de Programação de Aplicativos em C#**, organizado em nove módulos. A área publicada foi desenhada para o aluno; as orientações de manutenção e publicação ficam somente neste `README.md`.

## Estrutura didática

0. Ambiente e Ferramentas
1. Lógica Estruturada em C#
2. Programação Orientada a Objetos
3. Windows Forms
4. UX e UI
5. Banco de Dados com C#, MySQL e Laragon
6. Qualidade do Código
7. Gestão da Qualidade
8. Projeto Integrador

Cada módulo contém **visão geral**, **teoria**, **prática guiada** e **avaliação**. O site também oferece progresso salvo no navegador, botão para copiar exemplos, navegação entre módulos, impressão/PDF e layout responsivo.

## Estrutura do repositório

```text
curso-csharp/
├── index.html
├── 404.html
├── .nojekyll
├── README.md
├── assets/
│   ├── css/style.css
│   └── js/app.js
├── modulo0-ambiente-ferramentas/
│   ├── index.html
│   ├── teoria.html
│   ├── pratica.html
│   └── avaliacao.html
├── modulo1-logica-estruturada/
├── modulo2-poo/
├── modulo3-windows-forms/
├── modulo4-ux-ui/
├── modulo5-banco-dados/
├── modulo6-qualidade-codigo/
├── modulo7-gestao-qualidade/
└── modulo8-projeto-integrador/
```

# Publicação no GitHub Pages

A publicação não precisa aparecer no portal dos alunos. Ela é responsabilidade de quem mantém o repositório.

## 1. Crie o repositório

Crie um repositório no GitHub, por exemplo `curso-csharp`. Para um site público, use um repositório compatível com as regras atuais do GitHub Pages do seu plano.

## 2. Envie o conteúdo

O `index.html` deve ficar na **raiz** do repositório.

Pelo Git:

```bash
git init -b main
git add .
git commit -m "docs: publica material da UC de Programação de Aplicativos"
git remote add origin https://github.com/SEU-USUARIO/curso-csharp.git
git push -u origin main
```

Para atualizar posteriormente:

```bash
git add .
git commit -m "docs: revisa conteúdo do módulo 3"
git push
```

## 3. Ative o GitHub Pages

No repositório:

1. Abra **Settings**.
2. Acesse **Pages**.
3. Em **Build and deployment**, escolha a publicação a partir de branch.
4. Selecione `main` e `/ (root)`.
5. Salve e aguarde a implantação.

O endereço normalmente seguirá o padrão:

```text
https://SEU-USUARIO.github.io/curso-csharp/
```

O arquivo `.nojekyll` já está incluído para manter o site como HTML estático pronto.

## 4. Teste localmente antes de publicar

É possível abrir `index.html` diretamente. Para testar em um servidor HTTP local, se houver Python instalado:

```bash
python -m http.server 8000
```

Depois abra `http://localhost:8000`.

## 5. Cuidados de manutenção

- Não publique gabaritos restritos no mesmo repositório público.
- Blocos de resposta presentes no HTML podem ser vistos pelo código-fonte da página.
- Não use nomes, e-mails ou dados reais de alunos nos exemplos.
- Revise versões, menus e telas das ferramentas antes de cada oferta da UC.
- Valide os roteiros em uma máquina equivalente à do laboratório.
- Mantenha o CSS e o JavaScript em `assets/` para evitar cópias divergentes.
- Em computadores compartilhados, use identidade Git local e não armazene credenciais.

## Referência de ambiente

O material usa C# moderno e recursos compatíveis com **.NET 6 ou superior**, com Windows Forms em Windows. A turma deve usar a versão LTS do .NET e a versão do Visual Studio homologada no laboratório.
