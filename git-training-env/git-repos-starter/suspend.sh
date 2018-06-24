#!/usr/bin/env bash

if true; then
    GITW="git wx l2gv1"
else
    export QUEST_SHARED_BIN_V_BUNDLE_ROOT=//il-nas-01/PD-Application/Application/bin/bundle/v0.1.1
   GITW="sh F:/views/g/QsystemTools/Qsystem/Qsys_tools/tools/GIT/GITW/tcsh_gate/gitw_dev_gate.sh"
fi


TOOLBOX="sh //il-nas-01/PD-Application/Application/bin/bundle_root/runners/script_runner.sh - tools/toolbox/toolbox_runner.sh -"

L2G="${GITW} l2g --watch"


######################################
#output dirs
#should be coordinate with git-server
source "$(dirname $0)/common.sh"


function killDir() {

    local DIR=$1

    #while [[ -e $DIR ]]; do
        echo "Killing $DIR"

        $TOOLBOX kill.in.path -p $DIR --force

        #rm -rf $DIR
    #done

}


killDir $LOCAL1
killDir $LOCAL2
killDir $REMOTE
