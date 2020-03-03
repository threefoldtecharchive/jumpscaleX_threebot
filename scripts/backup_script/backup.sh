#!/bin/bash

set -e
set -x

HTTP="false"

function print_help() {
    echo "Usage: $0 -a <AWS_ACCESS_KEY_ID> -s <AWS_SECRET_KEY_ID> -p <PASSPHRASE> -d <Directory Path> [-u <DUPLICITY BACKEND> -f <s3 prefix> -i (use http)] <Action>"
    echo "    Action: must be one of backup/restore"
    echo "    AWS_ACCESS_KEY_ID: access key for the s3 backend bucket"
    echo "    AWS_ACCESS_SECRET_KEY: secret key for the s3 backend bucket"
    echo "    PASSPHRASE: password used to encrypt the backup"
    echo "    Directory Path: (optional) the directory path to backup/restore. default: /sandbox"
    echo "    Duplicity BACKEND: (otional) the backend which will be passed to duplicity. default: s3://s3.grid.tf/backups/duplicity"
    echo "
Example:
    $0 -a AKIAIOSFODNN7EXAMPLE -s wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY -p mypassword backup"
    echo "
Backends and their URL formats:
    s3://other.host[:port]/bucket_name[/prefix]
    s3+http://bucket_name[/prefix]
"
}

while getopts "ih?a:s:p:u:d:f:" opt; do
    case "$opt" in
    h|\?)
        print_help
        exit 0
        ;;
    s)  SECRET_KEY="$OPTARG"
        ;;
    a)  ACCESS_KEY="$OPTARG"
        ;;
    p)  PASSPHRASE="$OPTARG"
        ;;
    u)  BACKEND_URL="$OPTARG"
        ;;
    d)  DIRECTORY="$OPTARG"
        ;;
    i)  HTTP="true"
        ;;
    f)  PREFIX="$OPTARG"
        ;;
    esac
done


if [ -z "$PREFIX" ]; then PREFIX="";fi
if [ -z "$SECRET_KEY" ]; then echo "missing secret key argument -s";echo"";print_help;exit;fi
if [ -z "$ACCESS_KEY" ]; then echo "missing secret key argument -a";echo"";print_help;exit;fi
if [ -z "$PASSPHRASE" ]; then echo "missing secret key argument -p";echo"";print_help;exit;fi
if [ -z "$BACKEND_URL" ]; then BACKEND_URL="s3://s3.grid.tf/backups/duplicity/$PREFIX";fi
if [ -z "$DIRECTORY" ]; then DIRECTORY="/sandbox";fi


function backup() {
    # Required Parameters:
    #   $1 PASSPHRASE
    #   $2 AK
    #   $3 SK
    # Optional:
    #   $4 unencrypted connection (default: false)
    #   $5 Source Path (default: /sandbox)
    #   $6 Backend URL (default: s3://s3.grid.tf/backups/duplicity)

    if [ -z "$5" ]
    then SRC="/sandbox";
    else SRC="$5";
    fi

    if [ -z "$6" ]
    then DST="s3://s3.grid.tf/backups/duplicity";
    else DST="$6";
    fi

    if [ "$4" == "true" ]
    then
        env PASSPHRASE="$1" AWS_ACCESS_KEY_ID="$2" AWS_SECRET_ACCESS_KEY="$3"  \
        duplicity "$SRC" \
            --include "$SRC/cfg" \
            --include "$SRC/var" \
            --exclude "**" \
            "$DST" --s3-unencrypted-connection
    else
        env PASSPHRASE="$1" AWS_ACCESS_KEY_ID="$2" AWS_SECRET_ACCESS_KEY="$3"  \
        duplicity "$SRC" \
            --include "$SRC/cfg" \
            --include "$SRC/var" \
            --exclude "**" \
            "$DST"
    fi

}


function restore() {
    # Required Parameters:
    #   $1 PASSPHRASE
    #   $2 AK
    #   $3 SK
    # Optional:
    #   $4 unencrypted connection (default: false)
    #   $5 Destination Path (default: /sandbox)
    #   $6 Backend URL (default: s3://s3.grid.tf/backups/duplicity)

    if [ -z "$5" ]
    then DST="/sandbox";
    else DST="$5";
    fi

    if [ -z "$6" ]
    then SRC="s3://s3.grid.tf/backups/duplicity";
    else SRC="$6";
    fi

    if [ "$4" == "true" ]
    then
        env PASSPHRASE="$1" AWS_ACCESS_KEY_ID="$2" AWS_SECRET_ACCESS_KEY="$3"  \
        duplicity restore "$SRC" \
            --include "$DST/cfg" \
            --include "$DST/var" \
            --exclude "**" \
            "$DST" --s3-unencrypted-connection --allow-source-mismatch
    else
        env PASSPHRASE="$1" AWS_ACCESS_KEY_ID="$2" AWS_SECRET_ACCESS_KEY="$3"  \
        duplicity restore "$SRC" \
            --include "$DST/cfg" \
            --include "$DST/var" \
            --exclude "**" \
            "$DST" --allow-source-mismatch
    fi
}

if [ ${@: -1} == "backup" ]
then
    backup "$PASSPHRASE" "$ACCESS_KEY" "$SECRET_KEY" "$HTTP" "$DIRECTORY" "$BACKEND_URL"
elif [ ${@: -1} == "restore" ]
then
    restore "$PASSPHRASE" "$ACCESS_KEY" "$SECRET_KEY" "$HTTP" "$DIRECTORY" "$BACKEND_URL"
else
    echo "unsupported action $1"
    print_help
    exit
fi
