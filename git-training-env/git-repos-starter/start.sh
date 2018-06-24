#!/usr/bin/env bash

if true; then

    #GITW="git wx l2gv1"
    GITW="git wx -"
else
    QUEST_SHARED_BIN_V_BUNDLE_ROOT=//il-nas-01/PD-Application/Application/bin/bundle/v0.1.1
    export QUEST_SHARED_BIN_V_BUNDLE_ROOT
   GITW="sh F:/views/g/QsystemTools/Qsystem/Qsys_tools/tools/GIT/GITW/tcsh_gate/gitw_dev_gate.sh"
fi

L2G="${GITW} l2g --watch"

######################################
#output dirs
#should be coordinate with git-server
source "$(dirname $0)/common.sh"

git init --bare $REMOTE

git clone $REMOTE $LOCAL1
git clone $REMOTE $LOCAL2

mkdir -p $OUT

echo "PWD=$(cygpath -m $PWD)"s
echo "LOCAL1=$LOCAL1"
echo "LOCAL2=$LOCAL2"
echo "REMOTE=$REMOTE"

$L2G --verbose -p $LOCAL1 -o $OUT/local1.png --watch &
$L2G -p $LOCAL2 -o $OUT/local2.png --watch &
$L2G -p $REMOTE -o $OUT/remote.png --watch &

#cp "$(dirname $0)/local-local-remote.png.html" local-local-remote.png.html

HTML="$(cygpath -m $PWD)/local-local-remote.png.html"
echo HTML=$HTML

#no need, we have our client
if false; then
	cmd.exe /C "start file://$HTML"
fi


(cd $LOCAL1; cmd.exe /C "start bash" ) &
(cd $LOCAL2; cmd.exe /C "start bash" ) &

