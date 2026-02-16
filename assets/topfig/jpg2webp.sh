#!/bin/bash

# 检查是否安装了 cwebp
if ! command -v cwebp &> /dev/null
then
    echo "错误：未找到 cwebp，请先安装 (brew install webp 或 apt install webp)"
    exit
fi

echo "开始批量压缩并转换图片..."

for file in *.[jJ][pP][gG]; do
    # 检查文件是否存在（防止没有 jpg 时报错）
    [ -e "$file" ] || continue
    
    # 获取文件名（不含后缀）
    filename="${file%.*}"
    
    # 执行转换
    # -size 500000: 尝试将目标文件大小限制在 500,000 bytes (约 488kB)
    # -q 80: 基础质量设为 80（如果 -size 无法达到，会以此为参考）
    cwebp -size 500000 -q 80 "$file" -o "${filename}.webp"
    
    echo "已完成: $file -> ${filename}.webp"
done

echo "全部转换完成！"