import os
from pathlib import Path
from PIL import Image

def convert_jpg_to_webp():
    # 获取当前脚本所在的文件夹路径
    current_dir = Path(__file__).parent
    
    # 计数器
    converted_count = 0
    skipped_count = 0

    # 遍历文件夹下所有 jpg 和 jpeg 文件
    for file_path in current_dir.glob("*"):
        if file_path.suffix.lower() in [".jpg", ".jpeg"]:
            # 构造目标 webp 文件名
            target_path = file_path.with_suffix(".webp")

            # 检查目标文件是否已存在
            if target_path.exists():
                print(f"跳过: {target_path.name} 已存在")
                skipped_count += 1
                continue

            try:
                # 打开并转换图片
                with Image.open(file_path) as img:
                    # save 方法会自动根据后缀识别 webp 格式
                    # quality=80 是一个比较平衡的画质/体积比
                    img.save(target_path, "WEBP", quality=80)
                    print(f"成功: {file_path.name} -> {target_path.name}")
                    converted_count += 1
            except Exception as e:
                print(f"错误: 转换 {file_path.name} 时发生异常: {e}")

    print("-" * 30)
    print(f"处理完成！成功转换: {converted_count} 张，跳过: {skipped_count} 张。")

if __name__ == "__main__":
    convert_jpg_to_webp()