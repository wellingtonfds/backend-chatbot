## run migrations
echo "Run Migrations"
pnpm prisma migrate deploy

## start app
echo "Run APP"
yarn start:prod