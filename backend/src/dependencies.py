from typing import Annotated
from fastapi import Depends

from src.utils.unit_of_work import UnitOfWork
from src.services.auth import AuthService

UOWdep = Annotated[UnitOfWork, Depends(UnitOfWork)]
UserDep = Annotated[dict, Depends(AuthService().get_current_user)]