import os
from datetime import timedelta
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
from passlib.context import CryptContext

load_dotenv()

class DatabaseConfig:
    DATABASE_URL = os.getenv('DATABASE_URL')

class SecurityConfig:
    secret_key: str = os.getenv('SECRET_KEY')
    algorithm: str = os.getenv('ALGORITHM')
    expires = timedelta(hours=2)
    expires_refresh = timedelta(days=7)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")