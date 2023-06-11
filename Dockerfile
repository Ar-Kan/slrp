FROM alpine

ENV PWD="/app"

# SLRP configuration environment variables
ENV SLRP_APP_STATE="$PWD/.slrp/data"
ENV SLRP_APP_SYNC="1m"
ENV SLRP_LOG_LEVEL="info"
ENV SLRP_LOG_FORMAT="pretty"
ENV SLRP_SERVER_ADDR="0.0.0.0:8089"
ENV SLRP_SERVER_READ_TIMEOUT="15s"
ENV SLRP_MITM_ADDR="0.0.0.0:8090"
ENV SLRP_MITM_READ_TIMEOUT="15s"
ENV SLRP_MITM_IDLE_TIMEOUT="15s"
ENV SLRP_MITM_WRITE_TIMEOUT="15s"
ENV SLRP_CHECKER_TIMEOUT="5s"
ENV SLRP_CHECKER_STRATEGY="simple"
ENV SLRP_HISTORY_LIMIT="1000"

WORKDIR $PWD
COPY slrp $PWD

RUN mkdir ./.slrp

EXPOSE 8089 8090

CMD ["./slrp"]
