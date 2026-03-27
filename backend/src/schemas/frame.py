from typing import Optional, List
from pydantic import BaseModel, Field

from src.schemas.base_schema import BaseSchema

# Исходные данные
class InitFrame(BaseSchema):
    wall_height: float          # Высота этажа
    ext_wall_perimeter: float   # Периметр внешних 
    floor_slab_area: float      # Площадь основания (перекрытия)
    int_wall_length: float      # Длина внутренних стен
    int_wall_thickness: int     # Толщина внутренних стен
    ext_wall_thickness: int     # Толщина внешней стены
    
# Обшивка внешних стен
class ExtWallCladding(BaseSchema):
    osb_id: int                                    # ОСБ - material_id
    steam_water_proofing_id: Optional[int] = None  # Паро-гидроизоляция - material_id
    wind_protection_id: Optional[int] = None       # Ветрозащита - material_id
    insulation_id: Optional[int] = None            # Утеплитель - material_id
    insulation_thickness: float                    # Толщина утеплителя внешней стены

# Обшивка внутренних стен
class IntWallCladding(BaseSchema):
    osb_id: Optional[int] = None    # ОСБ - material_id

# Общая модель проёмов
class Opening(BaseSchema):
    height: float   # Высота
    width: float    # Ширина
    quantity: int   # Количество

# Перекрытие (плита между этажами) (пол-потолок)
class FloorSlab(BaseSchema):
    thickness: float                                # Толщина перекрытия
    osb_id: Optional[int] = None                    # ОСБ - material_id
    steam_water_proofing_id: Optional[int] = None   # Паро-гидроизоляция - material_id
    wind_protection_id: Optional[int] = None        # Ветрозащита - material_id
    insulation_id: Optional[int] = None             # Утеплитель - material_id

# Конечная схема каркаса
class FrameSchema(BaseSchema):
    client_id: int
    address: str

    init_frame: InitFrame                                 # Исходные данные
    ext_wall_cladding: ExtWallCladding                    # Обшивка внешних стен
    int_wall_cladding: Optional[IntWallCladding] = None   # Обшивка внутренних стен

    windows: Optional[List[Opening]] = None               # Оконные проемы []
    ext_doorways: Optional[List[Opening]] = None          # Внешние дверные проемы []
    int_doorways: Optional[List[Opening]] = None          # Внутренние дверные проемы []

    floor_slab: Optional[FloorSlab] = None                # Перекрытие