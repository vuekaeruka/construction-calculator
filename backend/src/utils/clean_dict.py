from typing import Any, Dict

def clean_dict(data: Dict[str, Any]) -> Dict[str, Any]:
    return {
            k: v for k, v in data.items() 
            if v is not None and not k.startswith("_")
        }