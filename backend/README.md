## Error

If above error occurs, change `POSTGRES_SERVER` in `backend/.env` to database container name and restart the backend container.

In my case, I changed `POSTGRES_SERVER` from `localhost:5432` to `naitei-journey-postgres-1:5432` and restarted the backend container.
