from typing import Optional, List
from pydantic import BaseModel, Field

from src.schemas.base_schema import BaseSchema
from src.schemas.materials import MaterialSchema

# Исходные данные
class InitFrame(BaseSchema):
    wall_height: float              # Высота этажа
    perimeter_exterior_wall: float  # Периметр внешних 
    floor_area: float               # Площадь пола (основания)
    length_internal_wall: float     # Длина внутренних стен
    thickness_internal_wall: int    # Толщина внутренних стен
    thickness_exterior_wall: int    # Толщина внешней стены
    floor_frame_thickness: int      # Толщина балок перекрытия (для формулы T_floor)

# Обшивка внешних стен
class ExternalWallCladding(BaseSchema):
    osb: int                                    # ОСБ - material_id
    steam_water_proofing: Optional[int] = None  # Паро-гидроизоляция - material_id
    wind_protection: Optional[int] = None       # Ветрозащита - material_id
    insulation: Optional[int] = None            # Утеплитель - material_id
    insulation_thickness: float                 # Толщина утеплителя внешней стены (T_ext_wall)

# Обшивка внутренних стен
class InternalWallCladding(BaseSchema):
    osb: Optional[int] = None   # ОСБ - material_id

# Общая модель проёмов
class Opening(BaseSchema):
    height: float   # Высота
    width: float    # Ширина
    quantity: int   # Количество

# Перекрытие (плита между этажами) (пол-потолок)
class FloorSlab(BaseSchema):
    thickness_floor_slab: float                 # Толщина перекрытия
    osb: Optional[int] = None                   # ОСБ - material_id
    steam_water_proofing: Optional[int] = None  # Паро-гидроизоляция - material_id
    wind_protection: Optional[int] = None       # Ветрозащита - material_id
    insulation: Optional[int] = None            # Утеплитель - material_id

# Конечная схема каркаса
class FrameSchema(BaseSchema):
    init_frame: InitFrame                                           # Исходные данные
    external_wall_cladding: ExternalWallCladding                    # Обшивка внешних стен
    internal_wall_cladding: Optional[InternalWallCladding] = None   # Обшивка внутренних стен
    windows: Optional[List[Opening]] = None                         # Оконные проемы []
    doorways: Optional[List[Opening]] = None                        # Дверные проемы []
    floor_slab: Optional[FloorSlab] = None                          # Перекрытие