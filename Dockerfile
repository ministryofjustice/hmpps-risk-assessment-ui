FROM node:22-alpine AS base
LABEL maintainer="HMPPS Digital Studio <info@digital.justice.gov.uk>"

RUN apk add --no-cache tzdata curl

ENV TZ=Europe/London
RUN ln -snf "/usr/share/zoneinfo/$TZ" /etc/localtime && echo "$TZ" > /etc/timezone
RUN addgroup --gid 2000 --system appgroup && \
    adduser --uid 2000 --system appuser --ingroup appgroup

WORKDIR /app
RUN chown -R appuser:appgroup /app

FROM base AS build
ARG BUILD_NUMBER=1_0_0
ARG GIT_REF=not-available
ENV BUILD_NUMBER=${BUILD_NUMBER}
ENV GIT_REF=${GIT_REF}
COPY . .
RUN apk add --no-cache python3 build-base linux-headers
RUN rm -rf dist node_modules
RUN CYPRESS_INSTALL_BINARY=0 npm ci --no-audit --include=dev
RUN npm run build
RUN npm run record-build-info

FROM base AS development
COPY --from=build --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=build --chown=appuser:appgroup /app/build-info.json ./build-info.json
ENV NODE_ENV='development'

FROM base AS production
COPY --from=build --chown=appuser:appgroup /app/package.json /app/package-lock.json ./
COPY --from=build --chown=appuser:appgroup /app/build-info.json ./build-info.json
COPY --from=build --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=build --chown=appuser:appgroup /app/dist ./dist
COPY --from=build --chown=appuser:appgroup /app/app ./app
COPY --from=build --chown=appuser:appgroup /app/common ./common
COPY --from=build --chown=appuser:appgroup /app/server.js /app/start.js ./
RUN npm prune --no-audit --omit=dev
EXPOSE 3000 3001
ENV NODE_ENV='production'
USER 2000

CMD [ "npm", "start" ]
