# Depositaí: Desafio de Poupança Personalizado 💰

Uma aplicação web interativa e responsiva para criar e acompanhar desafios de poupança personalizados, construída com as mais modernas tecnologias do ecossistema React, incluindo Next.js e TypeScript.

![Demonstração do App](https://depositai.vercel.app/)

## 📜 Sobre o Projeto

Depositaí nasceu da ideia de gamificar e visualizar o ato de poupar dinheiro. Inspirado em desafios populares de depósitos, o projeto oferece uma ferramenta digital onde o usuário não fica preso a uma regra fixa. Ele pode definir suas próprias metas—seja a quantidade de depósitos ou o valor de incremento—e acompanhar seu progresso de forma clara e motivadora.

O objetivo principal é fornecer uma experiência de usuário limpa e direta, com persistência de dados no lado do cliente, permitindo que o usuário retome seu desafio a qualquer momento.

## ✨ Funcionalidades Principais

- **Criação de Desafios Personalizados:** Defina a quantidade total de depósitos e o valor de incremento entre eles.
- **Visualização Interativa:** Uma grade visual com todos os depósitos, que mudam de cor ao serem marcados como concluídos.
- **Acompanhamento em Tempo Real:** Um painel de resumo que atualiza instantaneamente o total poupado, a quantidade de depósitos feitos e uma barra de progresso.
- **Persistência de Dados:** O progresso do desafio é salvo diretamente no navegador do usuário usando `localStorage`, permitindo que ele feche a página e continue de onde parou.
- **Design Responsivo:** A interface se adapta perfeitamente a dispositivos móveis e desktops.

## 🛠️ Arquitetura e Tecnologias Utilizadas

Este projeto foi construído com foco em boas práticas de desenvolvimento, escalabilidade e uma excelente experiência para o desenvolvedor.

### Tecnologias

| Tecnologia      | Descrição                                                                                                                              |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| **Next.js** | Framework React para produção, utilizado com o **App Router** para renderização no servidor, otimização de performance e SEO.              |
| **React** | Biblioteca principal para a construção da interface de usuário de forma componentizada.                                                  |
| **TypeScript** | Superset do JavaScript que adiciona tipagem estática, garantindo um código mais robusto, previsível e com menos bugs.                   |
| **Tailwind CSS**| Framework de CSS utility-first para estilização rápida, consistente e customizável diretamente no JSX.                                  |
| **React Hooks** | Utilização de `useState` para gerenciamento de estado local e `useEffect` para controle de efeitos colaterais (como a sincronização com `localStorage`). |
| **ESLint / Prettier** | Ferramentas para garantir a consistência do código, formatação automática e a adesão a boas práticas.                               |
| **Git & GitHub** | Para versionamento do código e gerenciamento do projeto (issues, pull requests).                                                        |
| **Vercel** | Plataforma de deploy e hospedagem contínua otimizada para Next.js, oferecendo um plano gratuito e integração direta com o GitHub. |

### Decisões Arquiteturais

-   **Componentização:** A interface foi dividida em componentes reutilizáveis e de responsabilidade única (`DepositBox`, `ProgressSummary`, `ChallengeSetup`), seguindo os princípios fundamentais do React para um código mais limpo e manutenível.

-   **Gerenciamento de Estado:** Para a escala deste projeto, o uso dos hooks nativos do React (`useState`, `useEffect`) foi a escolha ideal. Eles oferecem uma API simples e poderosa para controlar o estado da UI e os efeitos colaterais, como a persistência de dados, sem a necessidade de bibliotecas externas mais complexas (como Redux ou Zustand).

-   **Renderização Condicional:** A lógica principal da aplicação (`/src/app/page.tsx`) utiliza o estado para decidir qual interface renderizar: a tela de configuração para novos usuários ou a tela do desafio para usuários com um progresso salvo. Um estado de `isLoaded` foi implementado para evitar o "flash" de conteúdo (FOUC) durante a leitura inicial do `localStorage`.

-   **Estilização com Tailwind CSS:** A escolha pelo Tailwind CSS permitiu um desenvolvimento ágil e a co-localização dos estilos junto à estrutura dos componentes, facilitando a manutenção e a criação de um design system consistente.

## 🚀 Como Executar o Projeto Localmente

Siga os passos abaixo para ter uma cópia do projeto rodando na sua máquina.

**Pré-requisitos:**
-   Node.js (versão 18.x ou superior)
-   npm ou yarn

**Instalação:**

1.  Clone o repositório:
    ```bash
    git clone https://github.com/pedroso-dev/depositai.git
    ```
2.  Navegue até o diretório do projeto:
    ```bash
    cd depositai
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Execute o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
5.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

## 🔮 Próximos Passos (Roadmap)

Este projeto tem um grande potencial para novas funcionalidades. Algumas ideias para o futuro incluem:

-   [ ] **Implementação de Testes:** Adicionar testes unitários e de integração com Jest e React Testing Library para garantir a robustez e a manutenibilidade do código.
-   [ ] Botão para reiniciar ou apagar um desafio.
-   [ ] Implementar animação de conclusão para melhorar o feedback visual e celebrar a conquista do usuário.
-   [ ] Múltiplos temas (claro/escuro).
-   [ ] Animações para tornar a interação mais fluida.
-   [ ] Gráficos para visualizar o progresso de poupança ao longo do tempo.
-   [ ] Autenticação de usuários para salvar o progresso na nuvem e acessar de múltiplos dispositivos.
