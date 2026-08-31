#!/bin/bash
# 每天自动把计划笔记里的最新勾选状态同步到网站进度页。
# 由 ~/Library/LaunchAgents/com.jiaxiang.progress-sync.plist 每天 06:00 触发。
set -uo pipefail

REPO="/Users/jiaxiangtang/Downloads/Tangjackson.github.io"
LOG="$REPO/tools/sync_progress.log"
cd "$REPO" || exit 1

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG"; }

# 只保留最近 500 行日志
[ -f "$LOG" ] && tail -n 500 "$LOG" > "$LOG.tmp" && mv "$LOG.tmp" "$LOG"

BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "master" ]; then
  log "skip: 当前在 $BRANCH 分支，不是 master"
  exit 0
fi

if ! /usr/bin/python3 tools/build_progress.py >> "$LOG" 2>&1; then
  log "FAIL: build_progress.py 执行失败"
  exit 1
fi

if git diff --quiet -- progress-data.js; then
  log "no-op: 进度无变化"
  exit 0
fi

DONE=$(/usr/bin/python3 -c "
import json
s = open('progress-data.js', encoding='utf-8').read()
d = json.loads(s[s.index('{'):s.rindex(';')])
t = sum(x['total'] for x in d['tracks']); c = sum(x['done'] for x in d['tracks'])
print(f\"{c}/{t} ({round(c/t*100) if t else 0}%)\")
")

git add progress-data.js
git commit -q -m "Update progress: $DONE ($(date '+%Y-%m-%d'))" >> "$LOG" 2>&1

if git push -q origin master >> "$LOG" 2>&1; then
  log "OK: 已推送 $DONE"
else
  log "FAIL: push 失败（提交已在本地 master 上）"
  exit 1
fi
