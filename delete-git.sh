#!/bin/bash

# 定义函数递归删除子文件夹内的 .git 文件夹
function delete_git_folders {
    for folder in */.git; do
        if [ -d "$folder" ]; then
            echo "Deleting $folder"
            rm -rf "$folder"
        fi
    done
}

# 执行函数删除当前目录及其所有子目录内的 .git 文件夹
delete_git_folders
