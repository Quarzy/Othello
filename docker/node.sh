# Dockerfileがあるフォルダ名
DOCKER_FOLDER="docker"

# Dockerイメージのタグ
DOCKER_TAG="node:10-slim"
# Dockerコンテナーの名前
DOCKER_NAME="typescript-practice"

# Dockerコンテナーのrootのホームディレクトリ
CONTAINER_ROOT_HOME="/root"

# AWS CLIの設定ファイルがあるディレクトリ
REPOSITORY_FOLDER="Typescript-Practice"

# シェルファイル名
SHELL_FILE="change-ecr-tag.sh"

# ECRのイメージタグ変更後にDockerイメージを残す場合はyを、残さない場合はnを設定する。
# 残すと、次回docker buildが短縮される
# 設定しない場合、ECRのイメージタグ変更後にターミナルで入力を求められる。
LEAVE_DOCKER_IMAGE=""

# Dockerfileを使わないのでコメントアウト
# echo ">>>> Docker Image Build"
# docker build -t ${DOCKER_TAG} ${DOCKER_FOLDER}/
echo ">>>> Docker Contaner Create"
# Dockerコンテナーが存在しない時だけ、docker create を実行する。
docker run --rm -it -v `pwd`:${CONTAINER_ROOT_HOME}/${REPOSITORY_FOLDER} --name ${DOCKER_NAME} ${DOCKER_TAG} /bin/bash -c "cd ${CONTAINER_ROOT_HOME}/${REPOSITORY_FOLDER}; /bin/bash"

while [ "${LEAVE_DOCKER_IMAGE}" != "y" ] && [ "${LEAVE_DOCKER_IMAGE}" != "n" ] && [ "${LEAVE_DOCKER_IMAGE}" != "Y" ] && [ "${LEAVE_DOCKER_IMAGE}" != "N" ]; do
  read -p "Dockerイメージを残しますか？(残すと次回実行がとても早くなります) (y/n) > " LEAVE_DOCKER_IMAGE
done
if [ "${LEAVE_DOCKER_IMAGE}" = "n" ] || [ "${LEAVE_DOCKER_IMAGE}" = "N" ]; then
  echo ">>>> Docker Image DELETE"
  docker rmi ${DOCKER_TAG}
fi
