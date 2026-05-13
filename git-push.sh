#!/bin/bash
# jubora git push - lock 파일 자동 정리 후 push
cd "$(dirname "$0")"
find .git -name "*.lock" -delete 2>/dev/null
find .git -name "*.lock.*" -delete 2>/dev/null
find .git -name "tmp_obj_*" -delete 2>/dev/null
git push origin main
