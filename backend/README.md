# Backend da Aplicação

Bem-vindo ao backend da aplicação de hidroponia! Este projeto é responsável por fornecer a lógica e a API para controlar bombas e armazenar dados de sensores em um sistema de cultivo hidropônico.

## Configuração

Antes de executar o backend, é necessário configurar o ambiente de desenvolvimento. Siga as instruções abaixo:

1. Certifique-se de ter o Node.js instalado. Para obter o Node.js, visite: [https://nodejs.org](https://nodejs.org)

2. Navegue até a pasta `backend/`.

3. Execute o comando `npm install` para instalar as dependências necessárias.

4. Renomeie o arquivo `.env.example` para `.env`.

5. Abra o arquivo `.env` e configure as seguintes variáveis de ambiente:

   - `PORT`: Porta em que o servidor será executado (por exemplo, `8000`).
   - `DATABASE_URL`: URL de conexão com o banco de dados (por exemplo, `mongodb://localhost:27017/hidroponia`).
   - `MQTT_BROKER_URL`: URL do broker MQTT (por exemplo, `mqtt://localhost:1883`).
   - Outras variáveis de ambiente, se necessário.

## Executando o Backend

Após configurar o ambiente, você pode executar o backend. Siga as instruções abaixo:

1. Navegue até a pasta `backend/`.

2. Execute o comando `npm start` para iniciar o servidor backend.

3. O backend estará disponível no endereço: `http://localhost:<PORT>` (substitua `<PORT>` pela porta configurada no arquivo `.env`).

## Uso do Broker MQTT

Este projeto utiliza um broker MQTT para se comunicar com dispositivos e sensores. Certifique-se de configurar corretamente a URL do broker MQTT no arquivo `.env`.

Recomenda-se utilizar uma implementação de broker MQTT, como o Mosquitto (https://mosquitto.org/), e configurá-lo de acordo com as necessidades do seu sistema.

## Contribuição

Se você quiser contribuir com este projeto, fique à vontade para abrir problemas (issues) e enviar solicitações de pull (pull requests) no repositório do projeto.
