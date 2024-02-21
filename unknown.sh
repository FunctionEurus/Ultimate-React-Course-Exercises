#!/bin/bash

# 获取当前目录下的所有文件夹
directories=$(find . -maxdepth 1 -type d)

# 遍历每个文件夹并执行 git init
for dir in $directories; do
  # 排除当前目录和上级目录
  if [ "$dir" != "." ] && [ "$dir" != ".." ]; then
    cd "$dir"
    echo "Initializing Git repository in $dir"
    git init
    cd ..
  fi
done
