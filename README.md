# Projeto Lava Rápido

Bem-vindo ao repositório do projeto **Lava Rápido**, uma solução para o gerenciamento eficiente de um lava-rápido. O objetivo do sistema é simplificar as operações diárias, ajudando no controle de atendimentos, agendamentos, funcionários e clientes.

## Arquivos

Segue a estruturação dos arquivos do projeto, mantendo sempre o mesmo **padrão**:

### Backend

Neste diretório estão armazenados os arquivos referentes ao **backend**, desenvolvido com **Node.js** e utilizando **PostgreSQL** como banco de dados. A aplicação backend gerencia a lógica de negócios e a comunicação com o banco de dados.

### Frontend

O diretório **frontend** contém os arquivos do **client-side**, desenvolvido em **React** com a linguagem de programação **JavaScript**. A aplicação oferece uma interface de fácil uso para os colaboradores do lava-rápido, permitindo a interação com o sistema de maneira intuitiva.

### Diagrama UML

Abaixo, o diagrama UML descreve a arquitetura do projeto:

```mermaid
graph LR
A[Aplicação Web] --> B((BackEnd))
A --> C(Frontend)
B -- Node.js --> D{Banco de Dados PostgreSQL}
C -- React.js --> A
