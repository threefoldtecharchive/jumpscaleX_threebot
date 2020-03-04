import click
import os
os.environ["LC_ALL"]="C.UTF-8"
os.environ["LANG"]="C.UTF-8"

@click.group()
def cli():
    pass

@click.command()
def backup():
    if not os.environ.get("backup"):
        return
    AWS_ACCESS_KEY_ID = os.environ["AWS_ID"]
    AWS_SECRET_ACCESS_KEY = os.environ["AWS_SECRET"]
    HASH = os.environ["HASH"]
    BOT_FOLDER = os.environ["FOLDER"]
    command= f"bash backup.sh -a {AWS_ACCESS_KEY_ID} -s {AWS_SECRET_ACCESS_KEY} -p {HASH} -f {BOT_FOLDER} backup"
    os.system(command)


@click.command()
def restore():
    if not os.environ.get("restore"):
        return
    AWS_ACCESS_KEY_ID = os.environ["AWS_ID"]
    AWS_SECRET_ACCESS_KEY = os.environ["AWS_SECRET"]
    HASH = os.environ["HASH"]
    BOT_FOLDER = os.environ["FOLDER"]
    command = f"mkdir /tmp/sandbox/"
    os.system(command)
    command = f"bash backup.sh -a {AWS_ACCESS_KEY_ID} -s {AWS_SECRET_ACCESS_KEY} -p {HASH} -f {BOT_FOLDER} -d /tmp/sandbox restore"
    os.system(command)
    command = f"cp -r /tmp/sandbox/* /sandbox/"
    os.system(command)
    command = f"rm -rf /tmp/sandbox/"
    os.system(command)

if __name__ == '__main__':
    cli.add_command(backup)
    cli.add_command(restore)
    cli()