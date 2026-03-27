from enum import StrEnum

class TokenType(StrEnum):
    ACCESS = 'access'
    REFRESH = 'refresh'

class CalcStatus(StrEnum):
    RELEVANT = 'Актуален'
    NOT_RELEVANT = 'Не актуален'
    CONTRACT_SIGNED = 'Заключен договор'

class Element(StrEnum):
    FRAME = 'Каркас'
    ROOF = 'Крыша'
    FOUNDATION = 'Фундамент'

class SubElement(StrEnum):
    EXTERNAL_WALL = 'Внешняя стена'
    INTERNAL_WALL = 'Внутренняя стена'
    FLOOR_SLAB = 'Перекрытие'

CALC_LIFETIME_DAYS = 10