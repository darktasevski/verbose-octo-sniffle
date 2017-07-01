#!/bin/bash

if test "x${API_SERVER_PORT}x" == "xx"; then
    API_SERVER_PORT=8000
fi

if test "x${API_SERVER_HOST}x" == "xx"; then
    API_SERVER_HOST=localhost
fi

if test "x${API_SERVER_HTTPS}x" == "xx"; then
  API_SERVER_PROTO=http
  CERT=""
else
  API_SERVER_PROTO=https
  CERT="--cacert ../config/certificate.pem "
fi

API_SERVER_URL="/res"
SENSOR_TYPE=$1
RES_RT=$(python3 res_rt.py $SENSOR_TYPE)

echo $API_SERVER_HOST":"$API_SERVER_PORT $API_SERVER_URL
curl --noproxy "*" --no-buffer ${CERT} ${API_SERVER_PROTO}://${API_SERVER_HOST}:${API_SERVER_PORT}/api/oic${API_SERVER_URL} > res.txt
uuid=$(python3 parse_resource.py $RES_RT)

./oic-put "$RES_RT?di=$uuid" $2
