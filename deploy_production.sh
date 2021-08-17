#!/usr/bin/env bash
rsync -avz --no-o --no-g --no-perms \
  --exclude .htaccess \
  --exclude deploy_production.sh \
  --exclude .git \
  --exclude .env \
  --exclude node_modules \
  . bufet:/var/www/bufet/data/www/bufet2.zapusq.ru/bufet