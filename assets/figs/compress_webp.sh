#!/bin/bash

# 设定目标文件夹为脚本所在目录
TARGET_DIR="."
# 设定阈值 (800KB = 819200 bytes)
THRESHOLD=250200
# 设定目标大小 (设为780KB，预留约20KB余地确保不超标)
TARGET_SIZE=200000

echo "开始扫描当前文件夹中的 WebP 文件..."

# 遍历文件夹下所有的 webp 文件（包含子目录）
# 如果不想包含子目录，可以加上 -maxdepth 1
find "$TARGET_DIR" -type f -name "*.webp" | while read -r img; do
    # 获取文件大小
    filesize=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img")

    # 检查文件是否存在且大于阈值
    if [ -f "$img" ] && [ "$filesize" -gt "$THRESHOLD" ]; then
        echo "检测到超标文件: $img ($((filesize/1024)) KB)"
        
        # 使用 -size 参数精准控制目标字节数
        cwebp -size "$TARGET_SIZE" "$img" -o "$img" -quiet
        
        newsize=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img")
        echo "✨ 压缩完成: $((newsize/1024)) KB"
    else
        # 仅用于调试，如果文件太多可以注释掉下面这行
        echo "符合要求: $img"
    fi
done

echo "-----------------------"
echo "所有 800KB 以上的图片处理完毕！"