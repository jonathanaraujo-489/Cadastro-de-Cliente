# ETAPA 1: Usar uma "imagem base" oficial com um servidor web Nginx.
# A versão "alpine" é super leve e otimizada.
FROM nginx:stable-alpine

# ETAPA 2: Copiar os arquivos do nosso projeto para dentro da imagem.
# O "." significa "tudo que está na pasta atual do projeto".
# O destino "/usr/share/nginx/html" é a pasta padrão onde o Nginx procura por sites.
COPY . /usr/share/nginx/html

# ETAPA 3: Informar ao Docker que o container vai expor a porta 80.
# Esta é a porta padrão para tráfego web (HTTP).
EXPOSE 80