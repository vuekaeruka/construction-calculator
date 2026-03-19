from pydantic import BaseModel
from typing import Any

class BaseSchema(BaseModel):

    def clean_dict(self) -> dict:
        return {k: v for k, v in self.__dict__.items() if v is not None}
    
    def sa_clean(obj: Any) -> dict:
        if hasattr(obj, "__dict__"):
            return {k: v for k, v in obj.__dict__.items() if not k.startswith("_sa")}
        
    model_config = {
        "from_attributes": True
    }