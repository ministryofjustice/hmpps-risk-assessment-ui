FROM node:22.13-bullseye-slim
LABEL maintainer="HMPPS Digital Studio <info@digital.justice.gov.uk>"
ARG BUILD_NUMBER
ARG GIT_REF

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y make python3 curl build-essential && \
    rm -rf /var/lib/apt/lists/*

ENV TZ=Europe/London
RUN ln -snf "/usr/share/zoneinfo/$TZ" /etc/localtime && echo "$TZ" > /etc/timezone

ENV BUILD_NUMBER ${BUILD_NUMBER:-1_0_0}
ENV GIT_REF ${GIT_REF:-dummy}

RUN addgroup --gid 2000 --system appgroup && \
    adduser --uid 2000 --system appuser --gid 2000

# Create app directory
RUN mkdir -p /app
WORKDIR /app
ADD . .

RUN CYPRESS_INSTALL_BINARY=0 npm ci --no-audit && \
    npm run build && \
    export BUILD_NUMBER=${BUILD_NUMBER} && \
    export GIT_REF=${GIT_REF} && \
    npm run record-build-info

ENV PORT=3000

EXPOSE 3000

RUN chown -R appuser:appgroup /app
ENV NODE_ENV='production'
USER 2000

CMD [ "npm", "start" ]
